const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, 'secret');
        req.userData = decode;
        next();
    } catch (error) {
        return res.status(401).json({error: "Auth Failed"});
    }
}