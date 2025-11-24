const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const key = process.env.SECRET;

function auth(req, res, next) {
    const authorization = req.header('Authorization');

    if (!authorization) {
        const error = new Error("No token");
        error.name = "UnauthorizedError";
        return next(error);
    }

    const parts = authorization.split(" ");
    const token = parts[1];

    try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch {
        const error = new Error("Invalid token");
        error.name = "TokenError";
        next(error);
    }
}

module.exports = auth;
