require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const fs = require("fs");
const Document = require("./models/document");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// allow CORS
app.use(cors());

// Settings
const folderPath = "../html/scan";
const pollInterval = 5000;

// connect to mlab db
mongoose.connect(
  `mongodb://${process.env.DATABASE_USERNAME}:${
    process.env.DATABASE_PASSWORD
  }@ds219040.mlab.com:19040/gql-scanneddocs`
);
mongoose.connection.once("open", () => {
  console.log("connected to DB");
});

let documentsData = [];
const documents = Document.find().then(res => {
  documentsData = res.map(doc => doc.name);
});
let folderItems = {};
setInterval(() => {
  fs.readdirSync(folderPath).forEach(file => {
    let path = `${folderPath}/${file}`;
    let lastModification = fs.statSync(path).mtimeMs;
    if (!folderItems[file]) {
      folderItems[file] = lastModification;
      if (documentsData.indexOf(file) === -1) {
        // add new PDF to DB
        let document = new Document({
          name: file,
          displayName: file.split(".pdf")[0],
          create_date: Date.now(),
          active: true
        });
        if (file.indexOf(".pdf") !== -1) {
          document.save();
        }
      }
    }
  });
}, pollInterval);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.post("/mail", function(req, res) {
  console.log(req.body);
  res.send(
    JSON.stringify({
      response: "email sent"
    })
  );

  const mailConfig = {
    host: "lava.metanet.ch",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD
    }
  };

  let transporter = nodemailer.createTransport(mailConfig);

  let mailOptions = {
    from: `"Scanner 🖨" <${process.env.EMAIL_NAME}>`,
    to: req.body.email,
    subject: `Dokument PDF "${req.body.displayName}"`,
    text: "Dokument PDF",
    attachments: [
      {
        filename: req.body.name,
        path: folderPath + "/" + req.body.name,
        contentType: "application/pdf"
      }
    ],
    html: `
    <div >
      Bitte nicht auf diese Mail antworten. PDF ist im Anhang <br/>
      Tags: ${req.body.tags}
    </div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error + "not working...");
    }
    console.log("Message sent: %s", info.messageId);
  });
});

app.listen(4000, () => {
  console.log("now listening on port 4000");
});
