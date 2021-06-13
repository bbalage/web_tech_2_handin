const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');
const bookConverter = require('../util/bookConverter');

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

router.put('/', function (req, res) {
    const _id = req.body._id;
    const modifications = req.body;
    delete modifications._id;

    BookModel.findOneAndUpdate(
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
    const bookSendDto = bookConverter.convertBookToSendBookDto(book);
    res.json(bookSendDto);
}

async function findBooksByTitleAndSendThemInResponse(title, res) {
    const books = await BookModel.find({ title: { $regex: title } });
    bookSendDtos = bookConverter.convertBooksToSendBookDtos(books);
    res.json(bookSendDtos);
}

async function findAllBooksAndSendThemInResponse(res) {
    books = await BookModel.find().lean();
    bookSendDtos = bookConverter.convertBooksToSendBookDtos(books);
    res.json(bookSendDtos);
}

module.exports = router;