const inspecoesService = require('../services/inspecoes.service');

exports.criarInspecao = async (req, res) => {
  const { cilindroId, inspetor, data, itens, obs, resultado } = req.body;

  try {
    await inspecoesService.criarInspecao({
      cilindroId,
      inspetor,
      data,
      itens,
      obs,
      resultado
    });

    return res.send('Inspeção registrada com sucesso!');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao salvar inspeção');
  }
};

exports.listarInspecoes = async (req, res) => {
  try {
    const dados = await inspecoesService.listarInspecoes(req.query);
    return res.json(dados);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao listar inspeções');
  }
};
