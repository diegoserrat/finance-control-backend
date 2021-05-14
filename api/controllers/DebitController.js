const database = require('../models');

class DebitController {
    static async getAll( req, res ){
        try {
            const allDebits = await database.Debit.findAll({
                include: [
                    {association: 'creditCard'},
                    {association: 'debitType'} 
                ]
            });
            return res.status(200).json(allDebits);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async getById( req, res) {
        const { id } = req.params;
        
        try {
            const debits = await database.Debit.findOne({ 
                where: { id: Number(id) },
                include: [
                    {association: 'creditCard'},
                    {association: 'debitType'} 
                ],
            });
            return res.status(200).json(debits);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async getByIdCreditCard( req, res) {
        const { id } = req.params;
        
        try {
            const debits = await database.Debit.findAll({ 
                where: { credit_card_id: Number(id) },
                include: [
                    {association: 'creditCard'},
                    {association: 'debitType'} 
                ],
            });
            return res.status(200).json(debits);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async create( req, res ) {
        const newDebits = req.body;
        try {
            const debits = await database.Debit.create( newDebits );
            return res.status(200).json(debits);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async update( req, res) {
        const { id } = req.params;
        const updatedDebits = req.body;
        try {
            await database.Debit.update( updatedDebits, { where: { id: Number(id) } });
            const debits = await database.Debit.findOne({ 
                where: { credit_card_id: Number(id) },
                include: [
                    {association: 'creditCard'},
                    {association: 'debitType'} 
                ]
            });
            return res.status(200).json(debits);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async delete( req, res) {
        const { id } = req.params;
        try {
            await database.Debit.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ msg: 'DebitsType deleted' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = DebitController;