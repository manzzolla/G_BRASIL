// server.js

const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



const publicDirectory = path.join(__dirname);

// Dados simulados de alunos 
const alunos = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.php');
});

// Configura o middleware 'express.static' para servir arquivos estáticos a partir do diretório raiz do projeto.
app.use(express.static(publicDirectory));

// Rota para listar todos os alunos
app.get('/alunos', (req, res) => {
    res.json(alunos);
});

// Rota para criar um novo aluno
app.post('/alunos', (req, res) => {
    const novoAluno = req.body;
    alunos.push(novoAluno);
    res.json(novoAluno);
});

// Rota para excluir um aluno pelo ID
app.delete('/alunos/:id', (req, res) => {
    const alunoId = req.params.id;
    const index = alunos.findIndex((aluno) => aluno.id == alunoId);

    if (index !== -1) {
        const alunoExcluido = alunos.splice(index, 1)[0];
        res.json(alunoExcluido);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// Rota para editar um aluno pelo ID 
app.put('/alunos/:id', (req, res) => {
    const alunoId = req.params.id;
    const index = alunos.findIndex((aluno) => aluno.id == alunoId);

    if (index !== -1) {
        // Atualize o aluno com base nos dados em req.body
        // Exemplo: alunos[index] = req.body;
        res.json(alunos[index]);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API está rodando na porta ${PORT}`);
});

