const express = require('express');

const router = express.Router();

const auth = require('../util/auth');

router.use(auth.checkIfAuthenticated, auth.convertErrorToUnauthorized);

const AuthorModel = require('../model/author');

router.get('/', function (req, res) {
    AuthorModel.find((err, authors) => {
        if (err) throw err;
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
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

module.exports = router