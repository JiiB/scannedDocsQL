require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const fs = require('fs');
const Document = require('./models/document');


const app = express();

// allow CORS
app.use(cors());

// Settings
const folderPath = '../testData';
const pollInterval = 5000;

// connect to mlab db
mongoose.connect(`mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ds219040.mlab.com:19040/gql-scanneddocs`);
mongoose.connection.once('open', () => {
    console.log('connected to DB');
});

let documentsData = [];
const documents = Document.find().then(res => {
    documentsData = res.map(doc => doc.name);
});
let folderItems = {};
setInterval(() => {
    fs.readdirSync(folderPath)
        .forEach((file) => {
            let path = `${folderPath}/${file}`;
            let lastModification = fs.statSync(path).mtimeMs;
            if (!folderItems[file]) {
                folderItems[file] = lastModification;
                if (documentsData.indexOf(file) === -1) {
                    // add new PDF to DB
                    let document = new Document({
                        name: file,
                        displayName: file.split('.pdf')[0],
                        create_date: Date.now()
                    });
                    if(file.indexOf('.pdf') !== -1) {
                        document.save();
                    }
                }
            }
        });
}, pollInterval);




app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening on port 4000');
})