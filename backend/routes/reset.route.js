const express = require('express');

const router = express.Router();

const auth = require('../util/auth');

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
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
}

module.exports = router