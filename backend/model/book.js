const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String },
    dateOfPublish: { type: Date, default: Date.now },
    price: { type: Number },
    copiesCreated: { type: Number },
    copiesSold: { type: Number },
    description: { type: String },
    genres: [String],
    reviews: [
        {
            reviewer: { type: String },
            review: { type: String }
        }
    ],
    authors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    ]
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;