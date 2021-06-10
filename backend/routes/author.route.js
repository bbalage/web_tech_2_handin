const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');

router.use(auth.checkIfAuthenticated, auth.convertErrorToUnauthorized);

const AuthorModel = require('../model/author');

router.get('/', function (req, res) {
    AuthorModel.find((err, authors) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        res.json(authors);
    });
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

module.exports = router