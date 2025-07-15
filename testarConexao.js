const conexao = require('./config/db');

conexao.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Erro ao executar teste:', err);
    return;
  }
  console.log('Conexão MySQL funcionando!');
  process.exit();
});
