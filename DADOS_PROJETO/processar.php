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

// Exemplo de inserção de dados
$query = "INSERT INTO Alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, sala)
          VALUES ('João', 25, 8.5, 9.2, 'Professor A', 'Sala 101')";
$result = pg_query($connection, $query);
if (!$result) {
    echo "Falha ao inserir os dados: " . pg_last_error();
}

// Exemplo de seleção de dados
$query = "SELECT * FROM Alunos";
$result = pg_query($connection, $query);
if (!$result) {
    echo "Falha ao selecionar os dados: " . pg_last_error();
} else {
    while ($row = pg_fetch_assoc($result)) {
        echo "ID: " . $row['id'] . "<br>";
        echo "Nome: " . $row['nome'] . "<br>";
        echo "Idade: " . $row['idade'] . "<br>";
        echo "Nota 1º Semestre: " . $row['nota_primeiro_semestre'] . "<br>";
        echo "Nota 2º Semestre: " . $row['nota_segundo_semestre'] . "<br>";
        echo "Nome do Professor: " . $row['nome_professor'] . "<br>";
        echo "Sala: " . $row['sala'] . "<br><br>";
    }
}

// Fechar a conexão com o banco de dados
pg_close($connection);
?>
