const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token');

    try {
        req.userData = jwt.verify(req.body.token, process.env.APP_KEY);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }


};