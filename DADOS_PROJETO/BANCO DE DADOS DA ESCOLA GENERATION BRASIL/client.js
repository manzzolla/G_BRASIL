// C�digo do lado do cliente (client.js)

// Fun��o para criar um novo aluno
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

// Fun��o para listar alunos
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

// Fun��o para excluir um aluno
function excluirAluno(id) {
    fetch(`https://escola-db.onrender.com/alunos/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            console.log(`Aluno com ID ${id} exclu�do.`);
            listarAlunos();
        })
        .catch((error) => {
            console.error(`Erro ao excluir aluno com ID ${id}:`, error);
        }
        );
}

// Fun��o para editar um aluno 
function editarAluno(id) {
    // Aqui voc� pode implementar a l�gica para editar um aluno
    // Pode ser atrav�s de um formul�rio de edi��o ou outra interface
    console.log(`Editar aluno com ID ${id}`);
}

// Chame a fun��o listarAlunos para carregar a lista inicial
app.get('https://escola-db.onrender.com/alunos', (req, res) => {
    // Suponha que 'alunos' � um array de objetos JSON
    const alunos = [
        { nome: 'Alice', idade: 20 },
        { nome: 'Bob', idade: 22 },
        // Outros alunos...
    ];

    // Responder com a lista de alunos em formato JSON
    res.json(alunos);
});
