const Usuario = require('../models/usuario');
const { guardarEnArchivo, leerDesdeArchivo } = require('../services/fileService');

let usuarios = [];

const cargarUsuarios = () => {
  const lineas = leerDesdeArchivo('usuarios.txt');
  usuarios = lineas.map(linea => {
    const [id, nombre, email] = linea.split('|');
    return new Usuario(parseInt(id), nombre, email);
  });
};

const guardarUsuarios = () => {
  guardarEnArchivo('usuarios.txt', usuarios);
};

exports.obtenerUsuarios = (req, res) => {
  cargarUsuarios();
  res.json(usuarios);
};

exports.obtenerUsuarioPorId = (id) => {
  cargarUsuarios();
  return usuarios.find(u => u.id === parseInt(id));
};

exports.obtenerUsuarioPorNombre = (nombre) => {
  cargarUsuarios();
  return usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
};

exports.agregarUsuario = (req, res) => {
  cargarUsuarios();
  const { nombre, email } = req.body;
  const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const nuevoUsuario = new Usuario(nuevoId, nombre, email);
  usuarios.push(nuevoUsuario);
  guardarUsuarios();
  res.json(nuevoUsuario);
};

exports.actualizarUsuario = (req, res) => {
  cargarUsuarios();
  const { id } = req.params;
  const { nombre, email } = req.body;
  const index = usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    usuarios[index] = new Usuario(parseInt(id), nombre, email);
    guardarUsuarios();
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

exports.eliminarUsuario = (req, res) => {
  cargarUsuarios();
  const { id } = req.params;
  const index = usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    usuarios.splice(index, 1);
    guardarUsuarios();
    res.json({ mensaje: 'Usuario eliminado' });
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

cargarUsuarios();