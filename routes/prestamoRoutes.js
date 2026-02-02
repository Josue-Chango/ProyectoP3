// routes/prestamoRoutes.js
const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");

router.get("/", prestamoController.listarPrestamos);
router.post("/reservar", prestamoController.reservarLibro);
router.post("/devolver", prestamoController.devolverLibro);

module.exports = router;