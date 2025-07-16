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
  const { inspetor, resultado, inicio, fim } = req.query;

  let query = 'SELECT * FROM inspecoes WHERE 1=1';
  const params = [];

  if (inspetor) {
    query += ' AND inspetor LIKE ?';
    params.push('%' + inspetor + '%');
  }

  if (resultado) {
    query += ' AND resultado = ?';
    params.push(resultado);
  }

  if (inicio) {
    query += ' AND data_inspecao >= ?';
    params.push(inicio + ' 00:00:00');
  }

  if (fim) {
    query += ' AND data_inspecao <= ?';
    params.push(fim + ' 23:59:59');
  }

  query += ' ORDER BY data_inspecao DESC';

  conexao.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao buscar inspeções com filtros:', err);
      return res.status(500).send('Erro ao buscar inspeções');
    }
    res.json(results);
  });
});

const PORT = 3000;
app.use(express.static('public'));
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});
