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

function findAllBooksAndSendThemInResponse(res) {
    BookModel.find((err, books) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        res.json(books);
    });
}

module.exports = router;