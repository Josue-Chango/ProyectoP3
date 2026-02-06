const fs = require('fs');
const path = require('path');

const guardarEnArchivo = (archivo, datos) => {
  const contenido = datos.map(item => {
    if (item.libro) {
      return `${item.id || ''}|${item.usuario}|${item.libro.id}|${item.fecha.toISOString()}`;
    }
    if (item.disponible !== undefined) {
      return `${item.id}|${item.titulo}|${item.autor}|${item.genero}|${item.disponible}`;
    }
    return `${item.id}|${item.nombre}|${item.email}`;
  }).join('\n');
  fs.writeFileSync(path.join(__dirname, '..', archivo), contenido, 'utf8');
};

const leerDesdeArchivo = (archivo) => {
  try {
    const contenido = fs.readFileSync(path.join(__dirname, '..', archivo), 'utf8');
    if (!contenido.trim()) return [];
    return contenido.split('\n').map(linea => linea.trim()).filter(linea => linea);
  } catch (error) {
    return [];
  }
};

module.exports = { guardarEnArchivo, leerDesdeArchivo };