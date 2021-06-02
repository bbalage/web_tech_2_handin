const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phoneNumber: {type: String}
});

const AuthorModel = mongoose.model('authors', AuthorSchema);

module.exports = AuthorModel;