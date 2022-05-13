const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const gruposController = require('../controllers/grupos');

router.get('/', gruposController.getGrupos);
router.get('/mesa', gruposController.getGruposId);
router.post('/', gruposController.postGrupo);
router.patch('/', gruposController.patchGrupo);

module.exports = router;