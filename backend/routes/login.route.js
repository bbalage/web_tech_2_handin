const AdminModel = require('../model/admin');

express = require('express');
fs = require('fs');
jwt = require('jsonwebtoken');

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/jwtRS256.key');

const router = express.Router()

const bearerExpirationTimeSeconds = 7200;

router.post('/', async function (req, res) {
    const email = req.body.email;

    if (await validateEmailAndPassword(email, req.body.password)) {
        const adminId = await findUserIdForEmail(email);
        console.log("Admin id: " + adminId);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: bearerExpirationTimeSeconds,
            subject: adminId
        });

        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: bearerExpirationTimeSeconds
        })
    }
    else {
        res.sendStatus(401);
    }
});

async function validateEmailAndPassword(email, password) {
    const admin = await AdminModel.findOne({ email: email });
    if (!admin) {
        return false;
    }
    return validatePasswordForAdmin(admin, password);
}

function validatePasswordForAdmin(admin, password) {
    return admin.password === password;
}

async function findUserIdForEmail(email) {
    const admin = await AdminModel.findOne({ email: email });
    return admin._id.toString();
}

module.exports = router;