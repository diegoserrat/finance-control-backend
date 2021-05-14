const database = require('../models');

class CreditCardController {
    static async getAll( req, res ){
        try {
            const allCreditCards = await database.CreditCard.findAll({include: { association: 'user'}});
            return res.status(200).json(allCreditCards);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async getById( req, res) {
        const { id } = req.params;
        
        try {
            const creditCard = await database.CreditCard.findOne({ 
                where: { id: Number(id) },
                include: { association: 'user'} });
            return res.status(200).json(creditCard);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async create( req, res ) {
        const newCreditCards = req.body;
        try {
            const creditCard = await database.CreditCard.create( newCreditCards );
            return res.status(200).json(creditCard);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async update( req, res) {
        const { id } = req.params;
        const updatedCreditCard = req.body;
        try {
            await database.CreditCard.update( updatedCreditCard, { where: { id: Number(id) } });
            const creditCard = await database.CreditCard.findOne({ 
                where: { id: Number(id) },
                include: { association: 'user'} });
            return res.status(200).json(creditCard);
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async delete( req, res) {
        const { id } = req.params;
        try {
            await database.CreditCard.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ msg: 'CreditCard deleted' });
        } catch(err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = CreditCardController;