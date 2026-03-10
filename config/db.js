const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kgf@6590',
  database: 'sistema_inspecao'
});

conexao.connect(
  (err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

module.exports = conexao;
