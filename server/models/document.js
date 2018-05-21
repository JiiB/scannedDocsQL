const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: String,
    displayName: String,
    create_date: String,
    active: Boolean
});

module.exports = mongoose.model('Document', documentSchema);