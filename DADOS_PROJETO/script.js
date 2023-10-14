const axios = require('axios');

// Função para carregar a lista de alunos
async function listarAlunos() {
  try {
    const response = await axios.get('/alunos'); // Rota para listar alunos
    const alunos = response.data;

    // Limpa a tabela de alunos
    const tabela = document.getElementById("alunos-table");
    tabela.innerHTML = '';

    // Preenche a tabela com os dados dos alunos
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
        <td>
          <button onclick="editarAluno(${aluno.id})">Editar</button>
          <button onclick="excluirAluno(${aluno.id})">Excluir</button>
        </td>
      `;
    });
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
  }
}

// Função para adicionar um novo aluno
async function adicionarAluno() {
  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade').value);
  const nota_primeiro_semestre = parseFloat(document.getElementById('nota1').value);
  const nota_segundo_semestre = parseFloat(document.getElementById('nota2').value);
  const nome_professor = document.getElementById('professor').value;
  const sala = document.getElementById('sala').value;

  try {
    const response = await axios.post('/alunos', {
      nome,
      idade,
      nota_primeiro_semestre,
      nota_segundo_semestre,
      nome_professor,
      sala,
    });

    // Limpa os campos de entrada
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('nota1').value = '';
    document.getElementById('nota2').value = '';
    document.getElementById('professor').value = '';
    document.getElementById('sala').value = '';

    listarAlunos(); // Atualiza a tabela após adicionar um aluno
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
  }
}

// Função para editar um aluno
async function editarAluno(id) {
  // Implemente a função de edição conforme necessário
}

// Função para excluir um aluno
async function excluirAluno(id) {
  if (confirm('Tem certeza de que deseja excluir este aluno?')) {
    try {
      await axios.delete(`/alunos/${id}`);
      listarAlunos(); // Atualiza a tabela após excluir um aluno
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    }
  }
}

// Carrega a lista de alunos ao iniciar a página
listarAlunos();
