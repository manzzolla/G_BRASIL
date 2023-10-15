import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


// Define a rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://banco_de_dados_escola_user:OT3KvnLC880SWkCIWPwiftUYvJpUVS9h@dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com/banco_de_dados_escola',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/alunos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM alunos');
    const alunos = result.rows;
    client.release();
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos no banco de dados:', error);
    res.status(500).json({ error: 'Erro ao buscar alunos no banco de dados' });
  }
});

app.post('/alunos', async (req, res) => {
  try {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala } = req.body;
    const query = 'INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala];

    const client = await pool.connect();
    const result = await client.query(query, values);
    const novoAluno = result.rows[0];
    client.release();
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
    res.status(500).json({ error: 'Erro ao adicionar aluno' });
  }
});

app.get('/alunos/:id', async (req, res) => {
  try {
    const alunoId = req.params.id;
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM alunos WHERE id = $1', [alunoId]);
    const aluno = result.rows[0];
    client.release();
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar aluno por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar aluno por ID' });
  }
});

app.put('/alunos/:id', async (req, res) => {
  try {
    const alunoId = req.params.id;
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala } = req.body;
    const query = 'UPDATE alunos SET nome = $1, idade = $2, nota_primeiro_semestre = $3, nota_segundo_semestre = $4, nome_professor = $5, sala = $6 WHERE id = $7 RETURNING *';
    const values = [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala, alunoId];

    const client = await pool.connect();
    const result = await client.query(query, values);
    const alunoAtualizado = result.rows[0];
    client.release();
    if (alunoAtualizado) {
      res.json(alunoAtualizado);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

app.delete('/alunos/:id', async (req, res) => {
  try {
    const alunoId = req.params.id;
    const client = await pool.connect();
    const result = await client.query('DELETE FROM alunos WHERE id = $1 RETURNING *', [alunoId]);
    const alunoRemovido = result.rows[0];
    client.release();
    if (alunoRemovido) {
      res.json(alunoRemovido);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    res.status(500).json({ error: 'Erro ao excluir aluno' });
  }
});

app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
