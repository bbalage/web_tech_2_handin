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

async function findBookByIdAndSendInResponse(_id, res) {
    book = await BookModel.findById(_id);
    const bookSendDto = convertBookToSendBookDto(book);
    return bookSendDto;
}

async function findBooksByTitleAndSendThemInResponse(title, res) {
    const books = await BookModel.find({ title: { $regex: title } });
    bookSendDtos = convertBooksToSendBookDtos(books);
    res.json(bookSendDtos);
}

async function findBookById(_id) {
    const book = await BookModel.findById(_id);
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
        const bookSendDto = convertBookToSendBookDto(book);
        bookSendDtos.push(bookSendDto);
    }
    return bookSendDtos;
}

function convertBookToSendBookDto(book) {
    const bookSendDto = book;
    bookSendDto.reviews = book.reviews.length;
    return bookSendDto;
}

module.exports = router;