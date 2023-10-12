const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'banco_de_dados_escola_user', // Altere para o seu nome de usuário
  host: 'postgres://banco_de_dados_escola_user:OT3KvnLC880SWkCIWPwiftUYvJpUVS9h@dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com/banco_de_dados_escola', // Altere para o host do seu banco de dados
  database: 'banco_de_dados_escola', // Nome do banco de dados
  password: 'OT3KvnLC880SWkCIWPwiftUYvJpUVS9h', // Altere para a sua senha
  port: 5432 // Porta padrão do PostgreSQL
});

// Rota para adicionar um novo aluno
app.post('/alunos', (req, res) => {
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
  const sql = 'INSERT INTO alunos (ID, nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [ID, nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala];
  pool.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Aluno adicionado com sucesso' });
  });
});

// Rota para listar todos os alunos
app.get('/alunos', (req, res) => {
  const sql = 'SELECT * FROM alunos';
  pool.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ alunos: result.rows });
  });
});

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
