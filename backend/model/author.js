const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});

const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = AuthorModel;