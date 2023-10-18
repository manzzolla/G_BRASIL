// server.js

const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = require('pg');

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'banco_de_dados_escola_user',
  host: 'dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com',
  database: 'banco_de_dados_escola',
  password: 'OT3KvnLC880SWkCIWPwiftUYvJpUVS9h',
  port: 5432,
});

const publicDirectory = path.join(__dirname);

// Dados simulados de alunos 
const alunos = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Configura o middleware 'express.static' para servir arquivos estáticos a partir do diretório raiz do projeto.
app.use(express.static(publicDirectory));

// Rota para listar todos os alunos
app.get('/alunos', (req, res) => {
    pool.query('SELECT * FROM alunos', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao buscar alunos do banco de dados' });
        } else {
            res.json(results.rows);
        }
    });
});

// Rota para criar um novo aluno
app.post('/alunos', (req, res) => {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala } = req.body;
    
    const query = 'INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala];
    
    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao criar um novo aluno no banco de dados' });
        } else {
            res.json(result.rows[0]);
        }
    });
});

// Rota para excluir um aluno pelo ID
app.delete('/alunos/:id', (req, res) => {
    const alunoId = req.params.id;
    
    const query = 'DELETE FROM alunos WHERE id = $1 RETURNING *';
    const values = [alunoId];
    
    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao excluir o aluno do banco de dados' });
        } else if (result.rows.length === 0) {
            res.status(404).json({ message: 'Aluno não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    });
});
});

// Rota para editar um aluno pelo ID 
app.put('/alunos/:id', (req, res) => {
    const alunoId = req.params.id;
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala } = req.body;
    
    const query = 'UPDATE alunos SET nome = $1, idade = $2, nota_primeiro_semestre = $3, nota_segundo_semestre = $4, nome_professor = $5, sala = $6 WHERE id = $7 RETURNING *';
    const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala, alunoId];
    
    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao atualizar o aluno no banco de dados' });
        } else if (result.rows.length === 0) {
            res.status(404).json({ message: 'Aluno não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API está rodando na porta ${PORT}`);
});

