const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + 'https://escola-db.onrender.com/alunos'));

// Rota para servir a página HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Middleware para permitir o uso de JSON no Express
app.use(express.json());

// Rota para obter a lista de alunos do servidor
app.get('/alunos', (req, res) => {
    // Coloque aqui a lógica para carregar a lista de alunos do servidor e enviar como resposta em JSON
    // Exemplo: res.json(listaDeAlunos);
});

// Rota para adicionar um aluno
app.post('/alunos', (req, res) => {
    // Coloque aqui a lógica para adicionar um aluno ao servidor e enviar o aluno criado como resposta em JSON
    // Exemplo: res.json(alunoCriado);
});

// Rota para atualizar um aluno
app.put('/alunos/:id', (req, res) => {
    // Coloque aqui a lógica para atualizar um aluno no servidor e enviar o aluno atualizado como resposta em JSON
    // Exemplo: res.json(alunoAtualizado);
});

// Rota para excluir um aluno
app.delete('/alunos/:id', (req, res) => {
    // Coloque aqui a lógica para excluir um aluno no servidor e enviar o aluno excluído como resposta em JSON
    // Exemplo: res.json(alunoExcluido);
});

app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
});
