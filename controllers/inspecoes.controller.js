const conexao = require('../config/db');

exports.criarInspecao = (req, res) => {
  const { cilindroId, inspetor, data, itens, obs, resultado } = req.body;

  const query = `
    INSERT INTO inspecoes (cilindro_id, inspetor, data_inspecao, itens_verificados, observacoes, resultado)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  conexao.query(query, [
    cilindroId,
    inspetor,
    data,
    JSON.stringify(itens),
    obs,
    resultado
  ], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao salvar inspeção');
    }
    res.send('Inspeção registrada com sucesso!');
  });
};

exports.listarInspecoes = (req, res) => {
  const query = `
    SELECT
      id,
      cilindro_id AS cilindroId,
      inspetor,
      data_inspecao AS data,
      itens_verificados AS itens,
      observacoes AS obs,
      resultado
    FROM inspecoes
    ORDER BY data_inspecao DESC, id DESC
  `;

  conexao.query(query, (err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao listar inspeções');
    }

    const dados = resultados.map((item) => ({
      ...item,
      itens: item.itens ? JSON.parse(item.itens) : []
    }));

    return res.json(dados);
  });
};
