const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://banco_de_dados_escola_user:OT3KvnLC880SWkCIWPwiftUYvJpUVS9h@dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com/banco_de_dados_escola',
  ssl: {
    rejectUnauthorized: false
  }
});

const alunosTable = document.getElementById('alunos-table');
const addAlunoForm = document.getElementById('add-aluno-form');

// Função para listar alunos
async function listarAlunos() {
  const response = await fetch('https://escola-db.onrender.com/alunos');
  const alunos = await response.json();

  // Preencher a tabela
  const tbody = alunosTable.querySelector('tbody');
  tbody.innerHTML = '';

  alunos.forEach((aluno) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.nota_primeiro_semestre}</td>
      <td>${aluno.nota_segundo_semestre}</td>
      <td>${aluno.nome_professor}</td>
      <td>${aluno.sala}</td>
      <td>
        <button class="editar-aluno" data-id="${aluno.id}">Editar</button>
        <button class="excluir-aluno" data-id="${aluno.id}">Excluir</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Evento de envio do formulário para adicionar aluno
addAlunoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const nota1 = document.getElementById('nota1').value;
  const nota2 = document.getElementById('nota2').value;
  const professor = document.getElementById('professor').value;
  const sala = document.getElementById('sala').value;

  // Faça uma solicitação POST para adicionar o aluno
  const response = await fetch('https://escola-db.onrender.com/alunos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      idade,
      nota_primeiro_semestre: nota1,
      nota_segundo_semestre: nota2,
      nome_professor: professor,
      sala,
    }),
  });

  // Limpe o formulário após a adição do aluno
  addAlunoForm.reset();

  // Atualize a tabela
  listarAlunos();
});

// Carregue a lista de alunos no início
listarAlunos();