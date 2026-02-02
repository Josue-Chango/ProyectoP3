// routes/libroRoutes.js
const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/", libroController.obtenerLibros);
router.get("/buscar", libroController.buscarLibros);

module.exports = router;