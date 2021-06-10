const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');

const AdminModel = require('../model/admin');

router.all('/', function (req, res) {
    addDefaultAdmin(req, res);
})

function addDefaultAdmin(req, res) {
    const newAdminObject = {
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin'
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

module.exports = router