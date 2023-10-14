// Função para listar todos os alunos na tabela
async function listarAlunos() {
  try {
    const response = await axios.get('/alunos');
    const alunos = response.data;

    const tabela = document.getElementById('alunos-table');
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

    alunos.forEach((aluno) => {
      const newRow = tabela.insertRow(-1);
      newRow.innerHTML = `<td>${aluno.id}</td><td>${aluno.nome}</td><td>${aluno.idade}</td><td>${aluno.nota_primeiro_semestre}</td><td>${aluno.nota_segundo_semestre}</td><td>${aluno.nome_professor}</td><td>${aluno.sala}</td><td><button onclick="editarAluno(${aluno.id})">Editar</button><button onclick="excluirAluno(${aluno.id})">Excluir</button></td>`;
    });
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
  }
}

// Função para adicionar um aluno
async function adicionarAluno(aluno) {
  try {
    const response = await axios.post('/alunos', aluno);

    if (response.status === 201) {
      listarAlunos(); // Atualiza a tabela após a adição
    }
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
  }
}

// Função para editar um aluno
async function editarAluno(id) {
  // Implemente a lógica para preencher o formulário de edição com os dados do aluno selecionado
  // e permitir a edição. Após a edição, envie os dados atualizados para a API.
}

// Função para excluir um aluno
async function excluirAluno(id) {
  try {
    const response = await axios.delete(`/alunos/${id}`);

    if (response.status === 200) {
      listarAlunos(); // Atualiza a tabela após a exclusão
    }
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
  }
}

// Função para adicionar um aluno quando o formulário é enviado
document.getElementById('add-aluno-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade').value);
  const nota_primeiro_semestre = parseFloat(document.getElementById('nota1').value);
  const nota_segundo_semestre = parseFloat(document.getElementById('nota2').value);
  const nome_professor = document.getElementById('professor').value;
  const sala = document.getElementById('sala').value;

  const novoAluno = {
    nome,
    idade,
    nota_primeiro_semestre,
    nota_segundo_semestre,
    nome_professor,
    sala,
  };

  adicionarAluno(novoAluno);
});

// Carrega a lista de alunos quando a página é carregada
listarAlunos();
