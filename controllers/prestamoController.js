// controllers/prestamoController.js
const prestamos = [];
const libros = require("./libroController").libros;

exports.listarPrestamos = (req, res) => res.json(prestamos);

exports.reservarLibro = (req, res) => {
  const { usuario, idLibro } = req.body;
  let libro = libros.find(l => l.id === idLibro && l.disponible);
  if (libro) {
    libro.disponible = false;
    prestamos.push({ usuario, libro, fecha: new Date() });
    res.json({ mensaje: `Reserva exitosa: ${libro.titulo}` });
  } else {
    res.status(400).json({ mensaje: "El libro no está disponible." });
  }
};

exports.devolverLibro = (req, res) => {
  const { usuario, idLibro } = req.body;
  let index = prestamos.findIndex(p => p.usuario === usuario && p.libro.id === idLibro);
  if (index !== -1) {
    prestamos[index].libro.disponible = true;
    prestamos.splice(index, 1);
    res.json({ mensaje: "Devolución exitosa" });
  } else {
    res.status(404).json({ mensaje: "Préstamo no encontrado" });
  }
};