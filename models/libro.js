// models/libro.js
class Libro {
  constructor(id, titulo, autor, genero, disponible = true) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.disponible = disponible;
  }
}
module.exports = Libro;