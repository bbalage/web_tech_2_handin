const express = require('express');

const router = express.Router();

const auth = require('../util/auth');

router.use(
    auth.checkIfAuthenticated,
    auth.convertErrorToUnauthorized
);

const AdminModel = require('../model/admin');

router.get('/', function (req, res) {
    AdminModel.find((err, admins) => {
        if (err) throw err;
        res.json(admins);
    });
})

router.get('/self', function (req, res) {
    const adminId = auth.extractAdminId(req);
    console.log("adminId: " + adminId);
    AdminModel.findById(adminId, 'name email', (err, admin) => {
        if (err) {
            throw err;
        }
        else {
            res.json(admin);
        }
    });
})

module.exports = router