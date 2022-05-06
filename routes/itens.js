const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const itensController = require('../controllers/itens');

router.get('/ativos', itensController.getItensAtivos);
router.post('/', itensController.postItem);
router.patch('/', itensController.patchItem);

module.exports = router;