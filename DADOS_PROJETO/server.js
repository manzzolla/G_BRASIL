const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Defina as rotas da API aqui
// Exemplo: app.get('/alunos', (req, res) => { /* Lógica para listar alunos */ });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API está rodando na porta ${PORT}`);
});