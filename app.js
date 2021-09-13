const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mesas = require('./routes/mesas');
const itens = require('./routes/itens');
const grupos = require('./routes/grupos');
const pedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requrested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/mesas', mesas);
app.use('/itens', itens);
app.use('/grupos', grupos);
app.use('/pedidos', pedidos);

app.use((req, res, next) => {
    const erro = new Error("Não encontrado")
    erro.status = 404
    next(erro)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
});
module.exports = app;