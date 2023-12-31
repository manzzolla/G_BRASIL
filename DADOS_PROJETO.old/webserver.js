const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Pool } = require('pg');
const alunosRoutes = require('./routes/alunos'); // Importe as rotas dos alunos


// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'banco_de_dados_escola_user',
  host: 'dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com',
  database: 'banco_de_dados_escola',
  password: 'OT3KvnLC880SWkCIWPwiftUYvJpUVS9h',
  port: 5432,
});

// Use as rotas dos alunos
app.use('/routes/alunos', alunosRoutes);

// Inicie o servidor na porta 3000
const server = app.listen(3000, () => {
  console.log('Servidor Node.js rodando na porta 3000');
});


// Trate o encerramento do servidor e da conexão com o banco de dados
process.on('SIGINT', () => {
  console.log('Encerrando o servidor...');
  server.close(() => {
    console.log('Servidor encerrado.');
    pool.end((err) => {
      if (err) {
        console.error('Erro ao encerrar a conexão com o banco de dados:', err);
      } else {
        console.log('Conexão com o banco de dados encerrada.');
      }
    });
  });
});
