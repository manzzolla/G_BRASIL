// Lógica de controle para recursos de alunos

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'banco_de_dados_escola_user',
  host: 'dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com',
  database: 'banco_de_dados_escola',
  password: 'OT3KvnLC880SWkCIWPwiftUYvJpUVS9h',
  port: 5432,
});

const { Pool } = require('pg');

// Função para criar um novo aluno
const criarAluno = async (req, res) => {
  try {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
    const sql = 'INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala];
    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para listar todos os alunos
const listarAlunos = async (req, res) => {
  try {
    const sql = 'SELECT * FROM alunos';
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para obter um aluno por ID
const obterAlunoPorID = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM alunos WHERE id = $1';
    const result = await pool.query(sql, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para atualizar um aluno por ID
const atualizarAluno = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
    const sql = 'UPDATE alunos SET nome = $1, idade = $2, nota_primeiro_semestre = $3, nota_segundo_semestre = $4, nome_professor = $5, numero_sala = $6 WHERE id = $7 RETURNING *';
    const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala, id];
    const result = await pool.query(sql, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para deletar um aluno por ID
const deletarAluno = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'DELETE FROM alunos WHERE id = $1 RETURNING *';
    const result = await pool.query(sql, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.json({ message: 'Aluno deletado com sucesso' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarAluno,
  listarAlunos,
  obterAlunoPorID,
  atualizarAluno,
  deletarAluno
};
