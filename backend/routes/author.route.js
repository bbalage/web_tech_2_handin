const express = require('express')
const router = express.Router()
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

router.get('/hello', function (req, res) {
    res.send('Hello!');
})

router.post('/', function (req, res) {
    console.log("Request body: "+req.body);
    newAuthor = new AuthorModel(req.body);
    newAuthor.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
})

module.exports = router