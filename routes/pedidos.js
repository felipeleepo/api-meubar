const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const pedidosController = require('../controllers/pedidos');

router.get('/grupo/:id_grupo', pedidosController.getPedidos);
router.get('/mesa/:id_mesa', pedidosController.getPedidosMesa);
router.post('/', pedidosController.postPedido);
router.patch('/', pedidosController.patchPedido);

module.exports = router;