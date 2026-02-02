// models/prestamo.js
class Prestamo {
  constructor(usuario, libro) {
    this.usuario = usuario;
    this.libro = libro;
    this.fecha = new Date();
  }
}
module.exports = Prestamo;