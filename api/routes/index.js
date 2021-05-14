const bodyParser = require('body-parser');

const users = require('./usersRoute');
const DebitsType = require('./debitsTypeRoute');
const Debit = require('./debitsRoute');
const CreditCard = require('./creditCardsRoute');
const authentication = require('./authRoute');

module.exports = app => {
    app.use(
        bodyParser.json(),
        authentication,
        users,
        DebitsType,
        Debit,
        CreditCard);
    
    app.get('/', (req, res) => {
        res.send('olá');
    });
    
}