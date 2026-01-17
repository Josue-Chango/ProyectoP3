let libros = [
  { titulo: "El Hobbit", autor: "Tolkien", disponible: true },
  { titulo: "Cien años de soledad", autor: "García Márquez", disponible: false },
  { titulo: "Breves respuestas", autor: "Stephen Hawking", disponible: true }
];

let contenedor = document.getElementById("listaLibros");
let busqueda = document.getElementById("busqueda");

function mostrarLibros(lista) {
  contenedor.innerHTML = "";

  lista.forEach(function(libro) {
    let div = document.createElement("div");
    div.className = "libro";

    div.innerHTML = `
      <h3>${libro.titulo}</h3>
      <p>Autor: ${libro.autor}</p>
      <p>Estado: ${libro.disponible ? "Disponible" : "Prestado"}</p>
    `;

    contenedor.appendChild(div);
  });
}

busqueda.addEventListener("input", function() {
  let texto = busqueda.value.toLowerCase();

  let filtrados = libros.filter(function(libro) {
    return libro.titulo.toLowerCase().includes(texto);
  });

  mostrarLibros(filtrados);
});

function cargarLibros() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(libros);
    }, 1000);
  });
}

async function iniciar() {
  let datos = await cargarLibros();
  mostrarLibros(datos);
}

iniciar();
