const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');

router.use(auth.checkIfAuthenticated, auth.convertErrorToUnauthorized);

const AuthorModel = require('../model/author');

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
})

router.get('/hello-world', function (req, res) {
    res.send('Hello World!');
})

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
        { _id: _id }, modifications, { upsert: false, useFindAndModify: true, new: true },
        (err, data) => {
            if (err) {
                errorHandling.defaultErrorHandling(err, res);
            }
            else {
                res.json(data);
            }
        })
});

function findAuthorByIdAndSendInResponse(_id, res) {
    AuthorModel.findById(_id, (err, author) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        res.json(author);
    });
}

function findAllAuthorsAndSendThemInResponse(res) {
    AuthorModel.find((err, authors) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        res.json(authors);
    });
}

function findAuthorsByNameAndSendThemInResponse(name, res) {
    AuthorModel.find({ name: { $regex: name } }, (err, authors) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        res.json(authors);
    });
}

module.exports = router