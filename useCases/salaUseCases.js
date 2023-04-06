const { pool } = require("../config");
const Sala = require("../entities/sala");

const getsalasDB = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM salas ORDER BY codigo");
    return rows.map(
      (sala) =>
        new Sala(
          sala.codigo,
          sala.numero,
          sala.descricao,
          sala.capacidade,
          sala.predio
        )
    );
  } catch (err) {
    throw "Erro : " + err;
  }
};

const addsalaDB = async (body) => {
  try {
    const { numero, descricao, capacidade, predio } = body;
    const results = await pool.query(
      `INSERT INTO salas (numero, descricao, capacidade,predio) 
        values ($1, $2, $3,$4) returning codigo, numero, descricao, capacidade,predio`,
      [numero, descricao, capacidade, predio]
    );
    const sala = results.rows[0];
    return new Sala(
      sala.codigo,
      sala.numero,
      sala.descricao,
      sala.capacidade,
      sala.predio
    );
  } catch (err) {
    throw "Erro ao inserir o sala: " + err;
  }
};

const updatesalaDB = async (body) => {
  try {
    const { codigo, numero, descricao, capacidade, predio } = body;
    const results = await pool.query(
      `UPDATE salas SET numero=$1, descricao=$2, capacidade=$3,predio=$4
        where codigo=$5 returning codigo, numero, descricao, capacidade`,
      [numero, descricao, capacidade, predio, codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const sala = results.rows[0];
    return new Sala(
      sala.codigo,
      sala.numero,
      sala.descricao,
      sala.capacidade,
      sala.predio
    );
  } catch (err) {
    throw "Erro ao alterar o sala: " + err;
  }
};

const deletesalaDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM salas WHERE codigo = $1`, [
      codigo,
    ]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Sala removido com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover o prédio: " + err;
  }
};

const getsalaPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(`SELECT * FROM salas WHERE codigo = $1`, [
      codigo,
    ]);
    if (results.rowCount == 0) {
      throw "Nenhum registro encontrado com o código: " + codigo;
    } else {
      const sala = results.rows[0];
      return new Sala(
        sala.codigo,
        sala.numero,
        sala.descricao,
        sala.capacidade,
        sala.predio
      );
    }
  } catch (err) {
    throw "Erro ao recuperar a Sala: " + err;
  }
};

const getsalaPorPredioDB = async (codigo) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM salas where predio = $1 ORDER BY codigo `,
      [codigo]
    );
    if (rows.rowCount == 0) {
      throw "Nenhum registro encontrado com o código: " + codigo;
    } else {
      return rows.map(
        (sala) =>
          new Sala(
            sala.codigo,
            sala.numero,
            sala.descricao,
            sala.capacidade,
            sala.predio
          )
      );
    }
  } catch (err) {
    throw "Erro ao recuperar a Sala: " + err;
  }
};

module.exports = {
  getsalasDB,
  addsalaDB,
  deletesalaDB,
  getsalaPorCodigoDB,
  getsalaPorPredioDB,
  updatesalaDB,
};
