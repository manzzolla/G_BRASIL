// server.js

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Dados simulados de alunos (você deve substituir isso por sua lógica de banco de dados)
const alunos = [];

// Rota para listar todos os alunos
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Rota para criar um novo aluno
app.post('/alunos', (req, res) => {
  const novoAluno = req.body;
  alunos.push(novoAluno);
  res.json(novoAluno);
});

// Rota para excluir um aluno pelo ID
app.delete('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const index = alunos.findIndex((aluno) => aluno.id == alunoId);

  if (index !== -1) {
    const alunoExcluido = alunos.splice(index, 1)[0];
    res.json(alunoExcluido);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Rota para editar um aluno pelo ID (você pode implementar isso)
app.put('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const index = alunos.findIndex((aluno) => aluno.id == alunoId);

  if (index !== -1) {
    // Atualize o aluno com base nos dados em req.body
    // Exemplo: alunos[index] = req.body;
    res.json(alunos[index]);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API está rodando na porta ${PORT}`);
});
