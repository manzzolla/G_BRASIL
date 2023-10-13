// Modelo de dados para alunos

// alunoModel.js

class Aluno {
    constructor(id, nome, idade, notaPrimeiroSemestre, notaSegundoSemestre, nomeProfessor, numeroSala) {
      this.id = id;
      this.nome = nome;
      this.idade = idade;
      this.notaPrimeiroSemestre = notaPrimeiroSemestre;
      this.notaSegundoSemestre = notaSegundoSemestre;
      this.nomeProfessor = nomeProfessor;
      this.numeroSala = numeroSala;
    }
  }
  
  module.exports = Aluno;