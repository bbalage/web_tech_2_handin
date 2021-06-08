express = require('express');
fs = require('fs');
jwt = require('jsonwebtoken');

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/jwtRS256.key');

const router = express.Router()

const bearerExpirationTimeSeconds = '7200';

router.post('/', function (req, res) {
    const email = req.body.email;

    if (validateEmailAndPassword(email, req.body.password)) {
        const userId = findUserIdForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: bearerExpirationTimeSeconds,
            subject: userId
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

function validateEmailAndPassword(email, password) {
    if (email === 'email' && password === 'password') {
        return true;
    }
    return false;
}

function findUserIdForEmail(email) {
    return '1234567890';
}

module.exports = router;