# G_BRASIL
Repositório para aplicação web

Documentação da API da Escola
Visão Geral
Esta documentação descreve a API da Escola, que permite a gestão de alunos, professores e salas de aula.

URL Base da API: https://escola-db.onrender.com
A API oferece as seguintes funcionalidades:

Listar alunos
Adicionar um novo aluno
Obter detalhes de um aluno por ID
Atualizar os dados de um aluno por ID
Excluir um aluno por ID
Recursos
Alunos
Listar Alunos
Endpoint: /alunos
Método HTTP: GET
Descrição: Recupera a lista de todos os alunos na escola.
Adicionar Aluno
Endpoint: /alunos
Método HTTP: POST
Descrição: Adiciona um novo aluno à escola com os detalhes fornecidos no corpo da solicitação.
Exemplo de Corpo da Solicitação
json
Copy code
{
  "nome": "Nome do Aluno",
  "idade": 18,
  "nota_primeiro_semestre": 9.5,
  "nota_segundo_semestre": 8.8,
  "nome_professor": "Nome do Professor",
  "sala": "Sala 101"
}
Detalhes do Aluno
Endpoint: /alunos/:id
Método HTTP: GET
Descrição: Recupera os detalhes de um aluno com base no ID fornecido.
Atualizar Aluno
Endpoint: /alunos/:id
Método HTTP: PUT
Descrição: Atualiza os detalhes de um aluno com base no ID fornecido.
Exemplo de Corpo da Solicitação
json
Copy code
{
  "nome": "Novo Nome do Aluno",
  "idade": 19,
  "nota_primeiro_semestre": 9.7,
  "nota_segundo_semestre": 9.0,
  "nome_professor": "Novo Nome do Professor",
  "sala": "Sala 102"
}
Excluir Aluno
Endpoint: /alunos/:id
Método HTTP: DELETE
Descrição: Exclui um aluno com base no ID fornecido.
Configuração do Banco de Dados
Hospedagem do Banco de Dados: Render.com
Hostname: dpg-ckjjl99jrl0c73dfbakg-a
Porta: 5432
Nome do Banco de Dados: banco_de_dados_escola
Nome de Usuário do Banco de Dados: banco_de_dados_escola_user
Autenticação
A API não requer autenticação para as operações de leitura (GET), mas as operações de escrita (POST, PUT, DELETE) podem exigir autenticação e autorização, dependendo da implementação.

Erros
A API retornará os seguintes códigos de status HTTP em caso de erros:

200 OK: A solicitação foi bem-sucedida.
201 Created: Um novo recurso foi criado com sucesso.
204 No Content: A solicitação de exclusão foi bem-sucedida.
400 Bad Request: A solicitação contém dados inválidos ou faltantes.
404 Not Found: O recurso solicitado não foi encontrado.
500 Internal Server Error: Ocorreu um erro interno no servidor.
Exemplos
Aqui estão alguns exemplos de como usar a API da Escola com o Postman:

Listar todos os alunos:

Método HTTP: GET
URL: https://escola-db.onrender.com/alunos
Adicionar um novo aluno:

Método HTTP: POST
URL: https://escola-db.onrender.com/alunos
Corpo da Solicitação:
json
Copy code
{
  "nome": "Novo Aluno",
  "idade": 20,
  "nota_primeiro_semestre": 8.0,
  "nota_segundo_semestre": 7.5,
  "nome_professor": "Outro Professor",
  "sala": "Sala 103"
}
Obter detalhes de um aluno pelo ID:

Método HTTP: GET
URL: https://escola-db.onrender.com/alunos/:id
Substitua :id pelo ID do aluno desejado.

Atualizar os detalhes de um aluno pelo ID:

Método HTTP: PUT
URL: https://escola-db.onrender.com/alunos/:id
Corpo da Solicitação:
json
Copy code
{
  "nome": "Novo Nome do Aluno",
  "idade": 21,
  "nota_primeiro_semestre": 8.5,
  "nota_segundo_semestre": 8.0,
  "nome_professor": "Novo Professor",
  "sala": "Sala 104"
}
Excluir um aluno pelo ID:

Método HTTP: DELETE
URL: https://escola-db.onrender.com/alunos/:id
Substitua :id pelo ID do aluno que deseja excluir.

Considerações Finais
Esta documentação fornece uma visão geral da API da Escola, incluindo os recursos disponíveis, os endpoints, a configuração do banco de dados e exemplos de uso. Certifique-se de que a API esteja configurada corretamente e que você tenha acesso às informações de autenticação necessárias para usar a API de forma eficaz.
