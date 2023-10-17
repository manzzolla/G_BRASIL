<?php
// Configurações do banco de dados
$host = "dpg-ckjjl99jrl0c73dfbakg-a.oregon-postgres.render.com"; // Host do banco de dados no Render
$port = "5432"; // Porta padrão do PostgreSQL
$dbname = "banco_de_dados_escola"; // Nome do seu banco de dados
$user = "banco_de_dados_escola_user"; // Nome de usuário do banco de dados
$password = "OT3KvnLC880SWkCIWPwiftUYvJpUVS9h"; // Senha do banco de dados

// Conecta ao banco de dados
$connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$connection) {
    die("Falha na conexão com o banco de dados: " . pg_last_error());
}

// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receba os dados do formulário e valide-os
    $nome = pg_escape_string($connection, $_POST['nome']);
    $idade = (int)$_POST['idade'];
    $nota_primeiro_semestre = (float)$_POST['nota_primeiro_semestre'];
    $nota_segundo_semestre = (float)$_POST['nota_segundo_semestre'];
    $nome_professor = pg_escape_string($connection, $_POST['nome_professor']);
    $sala = pg_escape_string($connection, $_POST['sala']);

    // Insira os dados na tabela (substitua 'sua_tabela' pelo nome real da tabela)
    $query = "INSERT INTO Alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala)
              VALUES ('$nome', $idade, $nota_primeiro_semestre, $nota_segundo_semestre, '$nome_professor', '$sala')";
    
    $result = pg_query($connection, $query);

    if ($result) {
        echo "Dados inseridos com sucesso.";
    } else {
        echo "Erro ao inserir dados: " . pg_last_error();
    }
}

// Feche a conexão com o banco de dados
pg_close($connection);
?>
