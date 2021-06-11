const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');

router.use(auth.checkIfAuthenticated, auth.convertErrorToUnauthorized);

const BookModel = require('../model/book');

router.post('/', function (req, res) {
    const newBook = new BookModel(req.body);
    newBook.save(function (err, data) {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        else {
            res.json(data);
        }
    });
});

router.get('/', function (req, res) {
    const _id = req.query._id;
    if (_id) {
        findBookByIdAndSendInResponse(_id, res);
        return;
    }
    const title = req.query.title;
    if (title) {
        findBooksByTitleAndSendThemInResponse(title, res);
        return;
    }
    findAllBooksAndSendThemInResponse(res);
});

function findBookByIdAndSendInResponse(_id, res) {
    res.send("Done");
}

function findBooksByTitleAndSendThemInResponse(title, res) {
    res.send("Done");
}

async function findBookById(_id) {
    book = await BookModel.findById(_id);
    return book;
}

async function findAllBooksAndSendThemInResponse(res) {
    books = await BookModel.find().lean();
    bookSendDtos = convertBooksToSendBookDtos(books);
    res.json(bookSendDtos);
}

function convertBooksToSendBookDtos(books) {
    bookSendDtos = [];
    for (const book of books) {
        const bookSendDto = book;
        bookSendDto.reviews = book.reviews.length;
        bookSendDtos.push(bookSendDto);
    }
    return bookSendDtos;
}

module.exports = router;