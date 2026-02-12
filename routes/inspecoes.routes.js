const express = require('express');
const router = express.Router();
const controller = require('../controllers/inspecoes.controller');

router.post('/', controller.criarInspecao);
router.get('/', controller.listarInspecoes);

console.log(controller);

module.exports = router;

