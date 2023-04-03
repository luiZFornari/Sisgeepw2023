const { Router } = require('express');

const prediosController = require('../controllers/prediosController');

const rotas = new Router();

rotas.route('/predios')
     .get(prediosController.getPredios)

module.exports = rotas;