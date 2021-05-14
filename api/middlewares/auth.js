const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization;
    console.log('primeiro ' +token);

    if(!authorization) {
        res.status(401).json({message: "Access denied!" })
    } else {
        let newToken = authorization.split(" ")[1];
        jwt.verify(newToken, authConfig.secret, 
            (err, decoded) => {
                if(err) {
                    res.status(401).json({message: "Access denied!"});
                } else {
                    next();
                }
            })
    }
}