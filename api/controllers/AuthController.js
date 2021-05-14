const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

class AuthController {
    
    //login
    static signIn(req, res) {
        const { email, password } = req.body;

        database.Users.findOne({ where: { email }})
            .then( user => {
                if(!user){
                    res.status(404).json({msg: "not found" })
                } else {
                    if(bcrypt.compareSync(password, user.password)){
                        const token = jwt.sign({user}, authConfig.secret, {
                            expiresIn: authConfig.expiresIn
                        });

                        res.json({ user, token });
                    } else {
                        res.status(401).json({msg: "Unauthorized"})
                    }
                }
            }).catch(err => {
                res.status(500).json(err);
            })
    }

    //register
    static signUp( req, res ) {
        const password = bcrypt.hashSync(req.body.password, 
            Number.parseInt(authConfig.rounds));

        database.Users.create({
            name: req.body.name,
            email: req.body.email,
            password
        }).then( user => {
            const token = jwt.sign({ user}, authConfig.secret, { expiresIn: authConfig.expiresIn });
            res.json({
                user,
                token
            })
        }).catch(err => {
            res.status(500).json(err);
        })
    }


}

module.exports = AuthController;