// Exemplo de dados iniciais (pode ser carregado a partir da API)
let alunos = [];

// Função para adicionar um aluno
function adicionarAluno() {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const nota1 = document.getElementById("nota1").value;
  const nota2 = document.getElementById("nota2").value;
  const professor = document.getElementById("professor").value;
  const sala = document.getElementById("sala").value;

  // Valide os dados aqui, certificando-se de que não sejam nulos, vazios, etc.

  const novoAluno = {
    nome,
    idade,
    nota1,
    nota2,
    professor,
    sala,
  };

  // Adicione o novo aluno à lista
  alunos.push(novoAluno);

  // Limpe os campos de entrada
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("professor").value = "";
  document.getElementById("sala").value = "";

  // Atualize a tabela
  listarAlunos();
}

// Função para listar os alunos na tabela
function listarAlunos() {
  const tabela = document.getElementById("alunos-table");
  const tbody = tabela.querySelector("tbody");

  // Limpe a tabela
  tbody.innerHTML = "";

  // Preencha a tabela com os dados dos alunos
  alunos.forEach((aluno, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.nota1}</td>
      <td>${aluno.nota2}</td>
      <td>${aluno.professor}</td>
      <td>${aluno.sala}</td>
      <td><button onclick="excluirAluno(${index})">Excluir</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Função para excluir um aluno
function excluirAluno(index) {
  alunos.splice(index, 1);
  listarAlunos();
}

// Liste os alunos iniciais (se necessário)
listarAlunos();

// Adicione um ouvinte de evento para o formulário de adicionar aluno
const form = document.getElementById("add-aluno-form");
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio do formulário
  adicionarAluno();
});
