const express = require('express');
const app = express();
const conexao = require('./config/db');

app.use(express.json()); // habilita JSON no body

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rota para registrar inspeção
app.post('/api/inspecao', (req, res) => {
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
  ], (err, results) => {
    if (err) {
      console.error('Erro ao registrar inspeção:', err);
      return res.status(500).send('Erro ao salvar inspeção');
    }
    res.send('Inspeção registrada com sucesso!');
  });
});

// Rota para listar todas as inspeções
app.get('/api/inspecoes', (req, res) => {
  conexao.query('SELECT * FROM inspecoes ORDER BY data_inspecao DESC', (err, results) => {
    if (err) {
      console.error('Erro ao buscar inspeções:', err);
      return res.status(500).send('Erro ao buscar inspeções');
    }
    res.json(results);
  });
});

const PORT = 3000;
app.use(express.static('public'));
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
