const database = require('../models');

class DebitTypeController {
    static async getAll( req, res ){
        try {
            const allDebitsType = await database.DebitType.findAll();
            return res.status(200).json(allDebitsType);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async getById( req, res) {
        const { id } = req.params;
        
        try {
            const debitsType = await database.DebitType.findOne({ where: { id: Number(id) } });
            return res.status(200).json(debitsType);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async create( req, res ) {
        const newDebitsType = req.body;
        try {
            const debitsType = await database.DebitType.create( newDebitsType );
            return res.status(200).json(debitsType);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async update( req, res) {
        const { id } = req.params;
        const updatedDebitsType = req.body;
        try {
            await database.DebitType.update( updatedDebitsType, { where: { id: Number(id) } });
            const debitsType = await database.DebitType.findOne({ where: { id: Number(id) } });
            return res.status(200).json(debitsType);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async delete( req, res) {
        const { id } = req.params;
        try {
            await database.DebitType.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ msg: 'DebitsType deleted' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = DebitTypeController;