const Libro = require('../models/libro');
const { guardarEnArchivo, leerDesdeArchivo } = require('../services/fileService');

let libros = [];

const cargarLibros = () => {
  const lineas = leerDesdeArchivo('libros.txt');
  libros = lineas.map(linea => {
    const [id, titulo, autor, genero, disponible] = linea.split('|');
    return new Libro(parseInt(id), titulo, autor, genero, disponible === 'true');
  });
};

const guardarLibros = () => {
  guardarEnArchivo('libros.txt', libros);
};

exports.obtenerLibros = (req, res) => {
  cargarLibros();
  res.json(libros);
};

exports.buscarLibros = (req, res) => {
  cargarLibros();
  const q = req.query.q?.toLowerCase() || "";
  const resultados = libros.filter(l =>
    l.titulo.toLowerCase().includes(q) ||
    l.autor.toLowerCase().includes(q) ||
    l.genero.toLowerCase().includes(q)
  );
  res.json(resultados);
};

exports.agregarLibro = (req, res) => {
  cargarLibros();
  const { titulo, autor, genero } = req.body;
  const nuevoId = libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1;
  const nuevoLibro = new Libro(nuevoId, titulo, autor, genero, true);
  libros.push(nuevoLibro);
  guardarLibros();
  res.json(nuevoLibro);
};

exports.obtenerLibrosDisponibles = (req, res) => {
  cargarLibros();
  const disponibles = libros.filter(l => l.disponible);
  res.json(disponibles);
};

exports.obtenerLibroPorId = (id) => {
  cargarLibros();
  return libros.find(l => l.id === parseInt(id));
};

exports.actualizarLibro = (req, res) => {
  cargarLibros();
  const { id } = req.params;
  const { titulo, autor, genero, disponible } = req.body;
  const index = libros.findIndex(l => l.id === parseInt(id));
  if (index !== -1) {
    libros[index] = new Libro(parseInt(id), titulo, autor, genero, disponible);
    guardarLibros();
    res.json(libros[index]);
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' });
  }
};

exports.eliminarLibro = (req, res) => {
  cargarLibros();
  const { id } = req.params;
  const index = libros.findIndex(l => l.id === parseInt(id));
  if (index !== -1) {
    libros.splice(index, 1);
    guardarLibros();
    res.json({ mensaje: 'Libro eliminado' });
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' });
  }
};

cargarLibros();