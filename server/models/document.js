const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: String,
    displayName: String,
    create_date: String
});

module.exports = mongoose.model('Document', documentSchema);
