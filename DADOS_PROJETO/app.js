// Obtém a lista de alunos do servidor e exibe-os na página
function carregarAlunos() {
    fetch('/alunos')
        .then((response) => response.json())
        .then((alunos) => {
            const listaAlunos = document.querySelector('#alunos-list ul');
            listaAlunos.innerHTML = '';

            alunos.forEach((aluno) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Nome: ${aluno.nome}, Idade: ${aluno.idade}, Nota 1º Semestre: ${aluno.nota_primeiro_semestre}, Nota 2º Semestre: ${aluno.nota_segundo_semestre}`;
                listaAlunos.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar alunos:', error);
        });
}

// Chama a função para carregar alunos quando a página carrega
window.addEventListener('load', carregarAlunos);


// Manipula o formulário de adicionar/editar aluno
document.querySelector('#aluno-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const alunoData = {
        nome: formData.get('nome'),
        idade: parseInt(formData.get('idade')),
        nota_primeiro_semestre: parseFloat(formData.get('nota_primeiro_semestre')),
        nota_segundo_semestre: parseFloat(formData.get('nota_segundo_semestre')),
        nome_professor: formData.get('nome_professor'),
        sala: formData.get('sala')
    };

    const alunoId = formData.get('alunoId'); 

    const url = alunoId ? `/alunos/${alunoId}` : '/alunos';

    fetch(url, {
        method: alunoId ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alunoData)
    })
        .then((response) => response.json())
        .then((aluno) => {
            console.log(`Aluno ${alunoId ? 'atualizado' : 'adicionado'} com sucesso:`, aluno);
            carregarAlunos();
        })
        .catch((error) => {
            console.error(`Erro ao ${alunoId ? 'atualizar' : 'adicionar'} aluno:`, error);
        });
});