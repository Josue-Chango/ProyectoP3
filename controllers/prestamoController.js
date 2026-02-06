const Prestamo = require('../models/prestamo');
const { guardarEnArchivo, leerDesdeArchivo } = require('../services/fileService');
const libroController = require('./libroController');
const usuarioController = require('./usuarioController');

let prestamos = [];
let nextId = 1;

const cargarPrestamos = () => {
  const lineas = leerDesdeArchivo('prestamos.txt');
  prestamos = lineas.map(linea => {
    const [id, usuario, idLibro, fecha] = linea.split('|');
    const libro = libroController.obtenerLibroPorId(idLibro);
    if (!libro) return null;
    if (nextId <= parseInt(id)) nextId = parseInt(id) + 1;
    return { id: parseInt(id), usuario, libro, fecha: new Date(fecha) };
  }).filter(p => p !== null);
};

const guardarPrestamos = () => {
  guardarEnArchivo('prestamos.txt', prestamos);
};

exports.listarPrestamos = (req, res) => {
  cargarPrestamos();
  res.json(prestamos);
};

exports.obtenerPrestamosPorUsuario = (nombreUsuario) => {
  cargarPrestamos();
  return prestamos.filter(p => p.usuario.toLowerCase() === nombreUsuario.toLowerCase());
};

exports.contarLibrosPrestadosAUsuario = (nombreUsuario) => {
  cargarPrestamos();
  return prestamos.filter(p => p.usuario.toLowerCase() === nombreUsuario.toLowerCase()).length;
};

exports.reservarLibro = (req, res) => {
  cargarPrestamos();
  const { usuario, idLibro } = req.body;
  
  const libro = libroController.obtenerLibroPorId(idLibro);
  if (!libro || !libro.disponible) {
    return res.status(400).json({ mensaje: "El libro no está disponible." });
  }
  
  const librosPrestados = exports.contarLibrosPrestadosAUsuario(usuario);
  if (librosPrestados >= 3) {
    return res.status(400).json({ mensaje: `El usuario ${usuario} ya tiene el máximo de 3 libros prestados.` });
  }
  
  const nuevoPrestamo = { id: nextId++, usuario, libro, fecha: new Date() };
  prestamos.push(nuevoPrestamo);
  guardarPrestamos();
  
  const lineas = leerDesdeArchivo('libros.txt');
  const nuevasLineas = lineas.map(linea => {
    const [id, titulo, autor, genero, disponible] = linea.split('|');
    if (parseInt(id) === parseInt(idLibro)) {
      return `${id}|${titulo}|${autor}|${genero}|false`;
    }
    return linea;
  });
  require('fs').writeFileSync('libros.txt', nuevasLineas.join('\n'), 'utf8');
  
  res.json({ mensaje: `Préstamo exitoso: "${libro.titulo}" prestado a ${usuario}` });
};

exports.devolverLibro = (req, res) => {
  cargarPrestamos();
  const { usuario, idLibro } = req.body;
  
  const index = prestamos.findIndex(p => p.usuario.toLowerCase() === usuario.toLowerCase() && p.libro.id === parseInt(idLibro));
  if (index === -1) {
    return res.status(404).json({ mensaje: "Préstamo no encontrado" });
  }
  
  const libro = prestamos[index].libro;
  prestamos.splice(index, 1);
  guardarPrestamos();
  
  const lineas = leerDesdeArchivo('libros.txt');
  const nuevasLineas = lineas.map(linea => {
    const [id, titulo, autor, genero, disponible] = linea.split('|');
    if (parseInt(id) === parseInt(idLibro)) {
      return `${id}|${titulo}|${autor}|${genero}|true`;
    }
    return linea;
  });
  require('fs').writeFileSync('libros.txt', nuevasLineas.join('\n'), 'utf8');
  
  res.json({ mensaje: `Devolución exitosa: "${libro.titulo}" devuelto por ${usuario}` });
};

cargarPrestamos();