const database = require('../models');

class UserController {
    
    static async getAll( req, res ){
        try {
            const allUsers = await database.Users.findAll();
            return res.status(200).json(allUsers);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async getById( req, res) {
        const { id } = req.params;
        
        try {
            const user = await database.Users.findOne({ where: { id: Number(id) } });
            return res.status(200).json(user);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async create( req, res ) {
        const newUser = req.body;
        try {
            const user = await database.Users.create( newUser );
            return res.status(200).json(user);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async update( req, res) {
        const { id } = req.params;
        const updatedUser = req.body;
        try {
            await database.Users.update( updatedUser, { where: { id: Number(id) } });
            const user = await database.Users.findOne({ where: { id: Number(id) } });
            return res.status(200).json(user);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async delete( req, res) {
        const { id } = req.params;
        try {
            await database.Users.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ msg: 'User deleted' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = UserController;