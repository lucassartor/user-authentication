const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        req.userData = jwt.verify(req.body.token, "secret");
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
    //TODO: Transformar essa chave (secret) em um .ENV


};