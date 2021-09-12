const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).send({
        mensagem: "GET mesas."
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "POST mesas."
    });
});

module.exports = router;