//  Roteador para manipular recursos de alunos

const express = require('express');
const router = express.Router();
const axios = require('axios');
const alunosController = require('../controllers/alunosController');

// Rota para criar um novo aluno
router.post('/', alunosController.criarAluno);

// Rota para listar todos os alunos
router.get('/', alunosController.listarAlunos);

// Rota para obter um aluno por ID
router.get('/:id', alunosController.obterAlunoPorID);

// Rota para atualizar um aluno por ID
router.put('/:id', alunosController.atualizarAluno);

// Rota para deletar um aluno por ID
router.delete('/:id', alunosController.deletarAluno);

module.exports = router;
