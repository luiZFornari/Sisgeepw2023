const { pool } = require('../config');
const Predio = require('../entities/predio')

const getPrediosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM predios ORDER BY codigo');
        return rows.map((predio) => new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPredioDB = async (body) => {
    try {   
        const { nome, descricao, sigla } = body; 
        const results = await pool.query(`INSERT INTO predios (nome, descricao, sigla) 
        values ($1, $2, $3) returning codigo, nome, descricao, sigla`,
        [nome, descricao, sigla]);
        const predio = results.rows[0];
        return new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla);
    } catch (err) {
        throw "Erro ao inserir o prédio: " + err;
    }    
}

module.exports = {getPrediosDB }