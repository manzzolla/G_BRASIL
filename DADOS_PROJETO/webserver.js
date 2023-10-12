const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'banco_de_dados_escola_user', // Altere para o seu nome de usuário
  host: 'dpg-ckjjl99jrl0c73dfbakg-a', // Altere para o host do seu banco de dados
  database: 'banco_de_dados_escola', // Nome do banco de dados
  password: 'OT3KvnLC880SWkCIWPwiftUYvJpUVS9h', // Altere para a sua senha
  port: 5432 // Porta padrão do PostgreSQL
});

// Rota para criar um novo aluno
app.post('/alunos', (req, res) => {
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
  const sql = 'INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala];
  pool.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json(result.rows[0]);
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
    res.json(result.rows);
  });
});

// Rota para obter um aluno por ID
app.get('/alunos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM alunos WHERE id = $1';
  pool.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
    res.json(result.rows[0]);
  });
});

// Rota para atualizar um aluno por ID
app.put('/alunos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
  const sql = 'UPDATE alunos SET nome = $1, idade = $2, nota_primeiro_semestre = $3, nota_segundo_semestre = $4, nome_professor = $5, numero_sala = $6 WHERE id = $7 RETURNING *';
  const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala, id];
  pool.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
    res.json(result.rows[0]);
  });
});

// Rota para deletar um aluno por ID
app.delete('/alunos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM alunos WHERE id = $1 RETURNING *';
  pool.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }
    res.json({ message: 'Aluno deletado com sucesso' });
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