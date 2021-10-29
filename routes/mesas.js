const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const mesasController = require('../controllers/mesas');
const pedidosController = require('../controllers/pedidos');

router.get('/visualizar', mesasController.getMesas);
router.get('/atendimento', mesasController.getMesasEmAtendimento);
router.get('/visualizar/:id_mesa', pedidosController.getPedidosMesa);
router.post('/', mesasController.postMesa);
router.patch('/', mesasController.patchMesa);

module.exports = router;