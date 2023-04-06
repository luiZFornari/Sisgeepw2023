const {
  getsalasDB,
  addsalaDB,
  updatesalaDB,
  deletesalaDB,
  getsalaPorCodigoDB,
  getsalaPorPredioDB,
} = require("../useCases/salaUseCases");

const getsalas = async (request, response) => {
  await getsalasDB()
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao consultar o sala: " + err,
      })
    );
};

const addsala = async (request, response) => {
  await addsalaDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Sala criado",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const updatesala = async (request, response) => {
  await updatesalaDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Sala alterado",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const deletesala = async (request, response) => {
  await deletesalaDB(parseInt(request.params.codigo))
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const getsalaPorCodigo = async (request, response) => {
  await getsalaPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const getsalaPorPredio = async (request, response) => {
  await getsalaPorPredioDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

module.exports = {
  getsalas,
  addsala,
  updatesala,
  deletesala,
  getsalaPorCodigo,
  getsalaPorPredio,
};
