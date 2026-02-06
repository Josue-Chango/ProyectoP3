const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");

router.get("/", prestamoController.listarPrestamos);
router.get("/usuario/:nombre", (req, res) => {
  const prestamos = prestamoController.obtenerPrestamosPorUsuario(req.params.nombre);
  res.json(prestamos);
});
router.post("/reservar", prestamoController.reservarLibro);
router.post("/devolver", prestamoController.devolverLibro);

module.exports = router;