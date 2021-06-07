const expressJwt = require('express-jwt');
const fs = require('fs');

const RSA_PUBLIC_KEY = fs.readFileSync('./keys/jwtRS256.key.pub');

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
});

function convertErrorToUnauthorized(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
};

const auth = {
    checkIfAuthenticated: checkIfAuthenticated,
    convertErrorToUnauthorized: convertErrorToUnauthorized
}

module.exports = auth;