const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    create_date: String
});

module.exports = mongoose.model('User', userSchema);
