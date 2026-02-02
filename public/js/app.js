// Mostrar libros disponibles
async function mostrarLibros() {
  let res = await fetch("/api/libros");
  let data = await res.json();
  renderLibros(data);
}

function renderLibros(listaLibros) {
  let lista = document.getElementById("listaLibros");
  lista.innerHTML = "";
  listaLibros.forEach(libro => {
    let item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.textContent = `${libro.titulo} - ${libro.autor} (${libro.disponible ? "Disponible" : "Prestado"})`;

    if (libro.disponible) {
      let btn = document.createElement("button");
      btn.className = "btn btn-sm btn-outline-primary ms-2";
      btn.textContent = "Reservar";
      btn.onclick = () => reservarLibro("Usuario1", libro.id, () => {
        agregarNotificacion(`Libro "${libro.titulo}" ha sido reservado`);
      });
      item.appendChild(btn);
    }

    lista.appendChild(item);
  });
}

// Mostrar préstamos
async function mostrarPrestamos() {
  let res = await fetch("/api/prestamos");
  let data = await res.json();
  let lista = document.getElementById("listaPrestamos");
  lista.innerHTML = "";
  data.forEach(p => {
    let item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.textContent = `${p.libro.titulo} prestado a ${p.usuario}`;

    let btn = document.createElement("button");
    btn.className = "btn btn-sm btn-outline-success ms-2";
    btn.textContent = "Devolver";
    btn.onclick = () => devolverLibro(p.usuario, p.libro.id, () => {
      agregarNotificacion(`Libro "${p.libro.titulo}" ha sido devuelto`);
    });
    item.appendChild(btn);

    lista.appendChild(item);
  });
}

// Reservar libro con callback y setTimeout
async function reservarLibro(usuario, idLibro, callback) {
  let res = await fetch("/api/prestamos/reservar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, idLibro })
  });
  let data = await res.json();

  Swal.fire({
    icon: "success",
    title: "Reserva exitosa",
    text: data.mensaje,
    timer: 2000,
    showConfirmButton: false
  });

  mostrarLibros();
  mostrarPrestamos();

  // Simulación asincrónica con setTimeout
  setTimeout(() => {
    callback(); // ejecuta la notificación
  }, 1500);
}

// Devolver libro con callback y setTimeout
async function devolverLibro(usuario, idLibro, callback) {
  let res = await fetch("/api/prestamos/devolver", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, idLibro })
  });
  let data = await res.json();

  Swal.fire({
    icon: "success",
    title: "Devolución exitosa",
    text: data.mensaje,
    timer: 2000,
    showConfirmButton: false
  });

  mostrarLibros();
  mostrarPrestamos();

  // Simulación asincrónica con setTimeout
  setTimeout(() => {
    callback(); // ejecuta la notificación
  }, 1500);
}

// Buscar libros
async function buscar() {
  let valor = document.getElementById("busqueda").value;
  let res = await fetch(`/api/libros/buscar?q=${valor}`);
  let data = await res.json();
  renderLibros(data);
}

// Notificaciones
function agregarNotificacion(mensaje) {
  let lista = document.getElementById("listaNotificaciones");
  let item = document.createElement("li");
  item.className = "list-group-item";
  item.textContent = mensaje;
  lista.appendChild(item);
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  agregarNotificacion("Sistema de Biblioteca iniciado");
  mostrarLibros();
  mostrarPrestamos();
});