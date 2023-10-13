// Configuração do banco de dados

const { Pool } = require('pg');

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'banco_de_dados_escola_user',
  host: 'dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com',
  database: 'banco_de_dados_escola',
  password: 'OT3KvnLC880SWkCIWPwiftUYvJpUVS9h',
  port: 5432,
});

module.exports = pool;






