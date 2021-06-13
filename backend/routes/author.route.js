const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');
const authorConverter = require('../util/authorConverter');
const bookConverter = require('../util/bookConverter');

router.use(auth.checkIfAuthenticated, auth.convertErrorToUnauthorized);

const AuthorModel = require('../model/author');
const BookModel = require('../model/book');

router.post('/', function (req, res) {
    newAuthor = new AuthorModel(req.body);
    newAuthor.save(function (err, data) {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        else {
            res.json(data);
        }
    });
});

router.put('/', function (req, res) {
    const _id = req.body._id;
    const modifications = req.body;
    delete modifications._id;

    AuthorModel.findOneAndUpdate(
        { _id: _id }, modifications, { upsert: false, useFindAndModify: false, new: true },
        (err, data) => {
            if (err) {
                errorHandling.defaultErrorHandling(err, res);
            }
            else {
                res.json(data);
            }
        })
});

router.put('/add-book', async function (req, res) {
    const bookId = req.body.bookId;
    const authorId = req.body.authorId;

    const author = await findAuthorById(authorId);
    const book = await findBookById(bookId);

    if (!author) {
        res.status(404).json({ message: "No author by that id" });
        return;
    }

    if (!book) {
        res.status(404).json({ message: "No book by that id" });
        return;
    }

    if (author.books.includes(bookId)) {
        res.status(400).json({ message: "That book is already associated with the author." });
        return;
    }

    author.books.push(bookId);

    AuthorModel.findOneAndUpdate(
        { _id: author._id }, { books: author.books }, { upsert: false, useFindAndModify: false, new: true },
        (err, data) => {
            if (err) {
                errorHandling.defaultErrorHandling(err, res);
            }
            else {
                res.json(data);
            }
        });
});

router.get('/get-books', async function (req, res) {
    const authorId = req.query._id;
    if (!authorId) {
        res.status(400).send("No author id provided.");
        return;
    }
    author = await AuthorModel.findById(authorId);

    books = [];
    for (const bookId of author.books) {
        const book = await BookModel.findById(bookId).lean();
        books.push(book);
    }
    bookSendDtos = bookConverter.convertBooksToSendBookDtos(books);
    res.json(bookSendDtos);
});

router.get('/', function (req, res) {
    const _id = req.query._id;
    if (_id) {
        findAuthorByIdAndSendInResponse(_id, res);
        return;
    }
    const name = req.query.name;
    if (name) {
        findAuthorsByNameAndSendThemInResponse(name, res);
        return;
    }
    findAllAuthorsAndSendThemInResponse(res);
});

async function findAuthorByIdAndSendInResponse(_id, res) {
    author = await AuthorModel.findById(_id).lean();
    authorSendDto = authorConverter.convertAuthorToSendAuthorDto(author);
    res.json(authorSendDto);
}

async function findAuthorsByNameAndSendThemInResponse(name, res) {
    const authors = await AuthorModel.find({ name: { $regex: name } });
    authorSendDtos = authorConverter.convertAuthorsToSendAuthorDtos(authors);
    res.json(authorSendDtos);
}

async function findAllAuthorsAndSendThemInResponse(res) {
    authors = await AuthorModel.find().lean();
    authorSendDtos = authorConverter.convertAuthorsToSendAuthorDtos(authors);
    res.json(authorSendDtos);
}

async function findAuthorById(_id) {
    author = await AuthorModel.findById(_id);
    return author;
}

async function findBookById(_id) {
    book = await BookModel.findById(_id);
    return book;
}

module.exports = router