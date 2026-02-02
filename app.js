const express = require("express");
const app = express();
const libroRoutes = require("./routes/libroRoutes");
const prestamoRoutes = require("./routes/prestamoRoutes");

app.use(express.json());

// Servir frontend (HTML, CSS, JS desde carpeta public)
app.use(express.static("public"));

// API
app.use("/api/libros", libroRoutes);
app.use("/api/prestamos", prestamoRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});