// Função para criar um novo aluno
function criarAluno() {
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const professor = document.getElementById('professor').value;
    const sala = document.getElementById('sala').value;

    const aluno = {
        nome,
        idade,
        nota_primeiro_semestre: nota1,
        nota_segundo_semestre: nota2,
        nome_professor: professor,
        sala,
    };

    fetch('https://escola-db.onrender.com/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno),
    })
        .then((response) => response.json())
        .then((novoAluno) => {
            console.log('Novo aluno adicionado:', novoAluno);
            document.getElementById('nome').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('nota1').value = '';
            document.getElementById('nota2').value = '';
            document.getElementById('professor').value = '';
            document.getElementById('sala').value = '';
            listarAlunos();
        })
        .catch((error) => {
            console.error('Erro ao adicionar aluno:', error);
        });
}

// Função para listar alunos
function listarAlunos() {
    fetch('https://escola-db.onrender.com/alunos')
        .then((response) => response.json())
        .then((alunos) => {
            const tabela = document.getElementById('alunos-table');
            const tbody = tabela.querySelector('tbody');
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
    fetch(`https://escola-db.onrender.com/alunos/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            console.log(`Aluno com ID ${id} excluído.`);
            listarAlunos();
        })
        .catch((error) => {
            console.error(`Erro ao excluir aluno com ID ${id}:`, error);
        }
    );
}

// Função para editar um aluno
function editarAluno(id) {
    // Aqui você deve implementar a lógica para permitir a edição do aluno.
    // Isso pode envolver a exibição de um formulário de edição preenchido com os detalhes do aluno.
    // Você pode definir uma função separada para lidar com a edição do aluno.
    console.log(`Editar aluno com ID ${id}`);
}

// Chame a função listarAlunos para carregar a lista inicial quando a página for carregada
listarAlunos();
