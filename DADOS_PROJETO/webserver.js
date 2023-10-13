const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Pool } = require('pg');
const alunosRoutes = require('./routes/alunos'); // Importe as rotas dos alunos

app.use(bodyParser.json());

// Configurar a conexão com o banco de dados PostgreSQL
const pool = require('./config/databaseConfig');

// Use as rotas dos alunos
app.use('/alunos', alunosRoutes);

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



