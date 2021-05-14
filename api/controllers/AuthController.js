const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

class AuthController {
    
    static signIn(req, res) {
        const { email, password } = req.body;

        database.Users.findOne({ where: { email }})
            .then( user => {
                if(!user){
                    res.status(404).json({msg: "not found" })
                } else {
                    if(bcrypt.compareSync(password, user.password)){
                        const token = jwt.sign({user}, authConfig.secret, { expiresIn: authConfig.expiresIn });
                        res.json({ user, token });
                    } else {
                        res.status(401).json({msg: "Unauthorized"})
                    }
                }
            }).catch(err => {
                res.status(500).json(err);
            })
    }

    static signUp( req, res ) {
        const { name, email, password } = req.body;
        const passwordCrypt = bcrypt.hashSync(password, 
            Number.parseInt(authConfig.rounds));

        database.Users.create({ name, email, password: passwordCrypt})
            .then( user => {
                const token = jwt.sign({ user}, authConfig.secret, { expiresIn: authConfig.expiresIn });
                res.json({ user, token })
            }).catch(err => {
                res.status(500).json(err);
            })
    }
}

module.exports = AuthController;