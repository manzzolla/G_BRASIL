const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());




// Função para criar um novo aluno
function criarAluno() {
  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade').value);
  const nota1 = parseFloat(document.getElementById('nota1').value);
  const nota2 = parseFloat(document.getElementById('nota2').value);
  const professor = document.getElementById('professor').value;
  const sala = document.getElementById('sala').value;

  // Crie um objeto com os dados do aluno
  const aluno = {
    nome,
    idade,
    nota_primeiro_semestre: nota1,
    nota_segundo_semestre: nota2,
    nome_professor: professor,
    sala,
  };

  // Faça uma solicitação POST para a API para adicionar o aluno
  fetch('sua_url_da_api/alunos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aluno),
  })
    .then((response) => response.json())
    .then((novoAluno) => {
      // Aqui você pode atualizar a tabela ou fazer o que desejar com o novo aluno
      console.log('Novo aluno adicionado:', novoAluno);
      // Limpe os campos do formulário após adicionar o aluno
      document.getElementById('nome').value = '';
      document.getElementById('idade').value = '';
      document.getElementById('nota1').value = '';
      document.getElementById('nota2').value = '';
      document.getElementById('professor').value = '';
      document.getElementById('sala').value = '';
      // Chame a função para listar os alunos novamente
      listarAlunos();
    })
    .catch((error) => {
      console.error('Erro ao adicionar aluno:', error);
    });
}

// Função para listar alunos
function listarAlunos() {
  // Faça uma solicitação GET para a API para obter a lista de alunos
  fetch('sua_url_da_api/alunos')
    .then((response) => response.json())
    .then((alunos) => {
      // Aqui você pode preencher a tabela com os alunos
      const tabela = document.getElementById('alunos-table');
      const tbody = tabela.querySelector('tbody');
      tbody.innerHTML = ''; // Limpa os dados anteriores

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
            <button onclick="editarAluno(${aluno.id})">Editar</button>
            <button onclick="excluirAluno(${aluno.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Erro ao listar alunos:', error);
    });
}

// Função para excluir um aluno
function excluirAluno(id) {
  // Faça uma solicitação DELETE para a API para excluir o aluno com o ID especificado
  fetch(`sua_url_da_api/alunos/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      console.log(`Aluno com ID ${id} excluído.`);
      // Atualize a lista de alunos após a exclusão
      listarAlunos();
    })
    .catch((error) => {
      console.error(`Erro ao excluir aluno com ID ${id}:`, error);
    });
}

// Chame a função para listar alunos ao carregar a página
listarAlunos();

app.listen(3000, () => {
  console.log('API está rodando na porta 3000');
});