const express = require("express");
const app = express();
const libroRoutes = require("./routes/libroRoutes");
const prestamoRoutes = require("./routes/prestamoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(express.json());

app.use(express.static("public"));

app.use("/api/libros", libroRoutes);
app.use("/api/prestamos", prestamoRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});