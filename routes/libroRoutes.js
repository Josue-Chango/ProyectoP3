const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/", libroController.obtenerLibros);
router.get("/buscar", libroController.buscarLibros);
router.get("/disponibles", libroController.obtenerLibrosDisponibles);
router.get("/:id", (req, res) => {
  const libro = libroController.obtenerLibroPorId(req.params.id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ mensaje: "Libro no encontrado" });
  }
});
router.post("/", libroController.agregarLibro);
router.put("/:id", libroController.actualizarLibro);
router.delete("/:id", libroController.eliminarLibro);

module.exports = router;