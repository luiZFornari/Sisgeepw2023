const { Router } = require("express");

const prediosController = require("../controllers/prediosController");
const salasController = require("../controllers/salasController");
const equipamentosController = require ("../controllers/equipamentosController")

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

  rotas.route("/salas")
  .get(salasController.getSalas)
  .post(salasController.addSala)
  .put(salasController.updateSala)

rotas.route('/salas/:codigo')
  .get(salasController.getSalaPorCodigo)
  .delete(salasController.deleteSala)

  rotas.route("/equipamentos/sala/:codigosala")
  .get(equipamentosController.getEquipamentosPorSala)
  

  rotas.route("/equipamentos")
  .post(equipamentosController.addEquipamento)
  .put(equipamentosController.updateEquipamento)

rotas.route('/equipamentos/:codigo')
  .get(equipamentosController.getEquipamentoPorCodigo)
  .delete(equipamentosController.deleteEquipamento)





module.exports = rotas;
