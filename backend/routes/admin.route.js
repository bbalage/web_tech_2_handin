const express = require('express');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');

router.use(
    auth.checkIfAuthenticated,
    auth.convertErrorToUnauthorized
);

const AdminModel = require('../model/admin');

router.get('/', function (req, res) {
    AdminModel.find((err, admins) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        res.json(admins);
    });
})

router.get('/self', function (req, res) {
    const adminId = auth.extractAdminId(req);
    AdminModel.findById(adminId, 'name email', (err, admin) => {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        else {
            res.json(admin);
        }
    });
})

module.exports = router