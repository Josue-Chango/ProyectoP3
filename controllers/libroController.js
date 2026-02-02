// controllers/libroController.js
let libros = [
  { id: 1, titulo: "1984", autor: "George Orwell", genero: "Ficción", disponible: true },
  { id: 2, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Infantil", disponible: true },
  { id: 3, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Realismo Mágico", disponible: true },
  { id: 4, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Clásico", disponible: true }
];

exports.obtenerLibros = (req, res) => res.json(libros);

exports.buscarLibros = (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const resultados = libros.filter(l =>
    l.titulo.toLowerCase().includes(q) ||
    l.autor.toLowerCase().includes(q) ||
    l.genero.toLowerCase().includes(q)
  );
  res.json(resultados);
};

exports.libros = libros; // exportar para usar en préstamos