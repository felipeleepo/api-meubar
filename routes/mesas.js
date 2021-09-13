const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const mesasController = require('../controllers/mesas');

router.get('/', mesasController.getMesas);
router.post('/', mesasController.postMesa);
router.patch('/', mesasController.patchMesa);

module.exports = router;