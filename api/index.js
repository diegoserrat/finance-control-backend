const express = require('express');
const routes = require('./routes');

const app  = express();

routes(app);

const port = 5000;

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));

module.exports = app;