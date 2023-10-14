const axios = require('axios');

// Função para carregar a lista de alunos
async function listarAlunos() {
  try {
    const response = await axios.get('/api/alunos'); // Rota para listar alunos
    if (!response.ok) {
      throw new Error('Erro ao listar alunos');
    }
    const alunos = await response.json();
    const tabela = document.getElementById('alunos-table');
    tabela.innerHTML = ''; // Limpa a tabela

    alunos.forEach((aluno) => {
      const row = tabela.insertRow();
      row.innerHTML = `
        <td>${aluno.id}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.nota_primeiro_semestre}</td>
        <td>${aluno.nota_segundo_semestre}</td>
        <td>${aluno.nome_professor}</td>
        <td>${aluno.sala}</td>
        <td><button onclick="excluirAluno(${aluno.id})">Excluir</button></td>
      `;
    });
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
  }
}

// Função para adicionar um novo aluno
async function adicionarAluno() {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const nota1 = document.getElementById('nota1').value;
  const nota2 = document.getElementById('nota2').value;
  const professor = document.getElementById('professor').value;
  const sala = document.getElementById('sala').value;

  const novoAluno = {
    nome,
    idade,
    nota_primeiro_semestre: nota1,
    nota_segundo_semestre: nota2,
    nome_professor: professor,
    sala,
  };

  try {
    const response = await fetch('/api/alunos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoAluno),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar aluno');
    }

    listarAlunos(); // Atualiza a lista de alunos após a adição
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
  }
}

// Função para excluir um aluno
async function excluirAluno(id) {
  try {
    const response = await fetch(`/api/alunos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir aluno');
    }

    listarAlunos(); // Atualiza a lista de alunos após a exclusão
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
  }
}

// Carrega a lista de alunos ao iniciar a página
listarAlunos();
