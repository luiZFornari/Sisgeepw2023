const { Router } = require("express");

const prediosController = require("../controllers/prediosController");
const salasController = require("../controllers/salasController");

const rotas = new Router();

rotas
  .route("/predios")
  .get(prediosController.getPredios)
  .post(prediosController.addPredio)
  .put(prediosController.updatePredio);

rotas
  .route("/predios/:codigo")
  .get(prediosController.getPredioPorCodigo)
  .delete(prediosController.deletePredio);

rotas
  .route("/salas")
  .get(salasController.getsalas)
  .post(salasController.addsala)
  .put(salasController.updatesala);

rotas
  .route("/salas/:codigo")
  .get(salasController.getsalaPorCodigo)
  .delete(salasController.deletesala);

rotas.route("/predios/sala/:codigo").get(salasController.getsalaPorPredio);

module.exports = rotas;
