const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

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
    else {
        console.log("Error was not unauthorized.");
    }
};

function extractAdminId(req) {
    console.log("extractAdminId");
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    const adminId = jwt.verify(
        token,
        RSA_PUBLIC_KEY,
        { algorithms: ['RS256'] },
        (err, decodedToken) => {
            if (err) {
                throw err;
            }
            else {
                return decodedToken.sub;
            }
        });
    return adminId;
};

const auth = {
    checkIfAuthenticated: checkIfAuthenticated,
    convertErrorToUnauthorized: convertErrorToUnauthorized,
    extractAdminId: extractAdminId
}

module.exports = auth;