const conexao = require('../config/db');

function executarQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    conexao.query(sql, params, (err, resultados) => {
      if (err) {
        return reject(err);
      }
      return resolve(resultados);
    });
  });
}

exports.criarInspecao = async ({ cilindroId, inspetor, data, itens, obs, resultado }) => {
  const query = `
    INSERT INTO inspecoes (cilindro_id, inspetor, data_inspecao, itens_verificados, observacoes, resultado)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await executarQuery(query, [
    cilindroId,
    inspetor,
    data,
    JSON.stringify(itens),
    obs,
    resultado
  ]);
};

exports.listarInspecoes = async ({ inspetor, resultado, cilindro_id: cilindroIdQuery, cilindroId, inicio }) => {
  const filtros = [];
  const valores = [];

  if (inspetor) {
    filtros.push('inspetor = ?');
    valores.push(inspetor);
  }

  if (resultado) {
    filtros.push('resultado = ?');
    valores.push(resultado);
  }

  if (cilindroIdQuery || cilindroId) {
    filtros.push('cilindro_id = ?');
    valores.push(cilindroIdQuery || cilindroId);
  }

  if (inicio) {
    filtros.push('data_inspecao >= ?');
    valores.push(`${inicio} 00:00:00`);
  }

  let query = `
    SELECT
      id,
      cilindro_id AS cilindroId,
      inspetor,
      data_inspecao AS data,
      itens_verificados AS itens,
      observacoes AS obs,
      resultado
    FROM inspecoes
  `;

  if (filtros.length > 0) {
    query += ` WHERE ${filtros.join(' AND ')}`;
  }

  query += ' ORDER BY data_inspecao DESC, id DESC';

  const resultados = await executarQuery(query, valores);

  return resultados.map((item) => ({
    ...item,
    itens: item.itens ? JSON.parse(item.itens) : []
  }));
};
