const express = require('express');
const crypto = require('crypto-js');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');
const AuthorModel = require('../model/author');
const BookModel = require('../model/book');
const AdminModel = require('../model/admin');

router.all('/', function (req, res) {
    console.log("RESETING");
    clearDatabase();
    addDefaultAdmin(req, res);
})

function addDefaultAdmin(req, res) {
    const hashedPassword = crypto.SHA256("admin");
    const newAdminObject = {
        name: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword
    };
    const newAdminModel = new AdminModel(newAdminObject);
    newAdminModel.save(function (err, data) {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        else {
            res.json(data);
        }
    });
}

function clearDatabase() {
    AdminModel.deleteMany({}, function (err) {
        console.log("Deleted admins.");
    });
    AuthorModel.deleteMany({}, function (err) {
        console.log("Deleted authors.");
    })
    BookModel.deleteMany({}, function (err) {
        console.log("Deleted books.");
    })
}

module.exports = router