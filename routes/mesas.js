const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const mesasController = require('../controllers/mesas');

router.get('/', mesasController.getMesas);
router.get('/1', mesasController.getMesasEmAtendimento);
router.post('/', mesasController.postMesa);
router.patch('/', mesasController.patchMesa);

module.exports = router;