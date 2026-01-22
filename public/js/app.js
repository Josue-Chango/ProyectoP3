// let libros = [
//   { id: 1, titulo: "1984", autor: "George Orwell", genero: "Ficción", disponible: true },
//   { id: 2, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Infantil", disponible: true }
// ];


// let prestamos = [];

// let contenedor = document.getElementById("listaLibros");
// let busqueda = document.getElementById("busqueda");

// // function mostrarLibros(lista) {
// //   contenedor.innerHTML = "";

// //   lista.forEach(function(libro) {
// //     let div = document.createElement("div");
// //     div.className = "libro";

// //     div.innerHTML = `
// //       <h3>${libro.titulo}</h3>
// //       <p>Autor: ${libro.autor}</p>
// //       <p>Estado: ${libro.disponible ? "Disponible" : "Prestado"}</p>
// //     `;

// //     contenedor.appendChild(div);
// //   });
// // }
// function mostrarLibros() {
//   let contenedor = document.getElementById("listaLibros");
//   contenedor.innerHTML = "";
//   libros.forEach(libro => {
//     let item = document.createElement("li");
//     item.textContent = `${libro.titulo} - ${libro.autor} (${libro.disponible ? "Disponible" : "Prestado"})`;
//     contenedor.appendChild(item);
//   });
// }

// function recordarDevolucion(usuario, libro) {
//   setTimeout(() => {
//     alert(`Recordatorio: ${usuario}, debe devolver el libro "${libro.titulo}" mañana.`);
//   }, 5000); // Simulación de 5 segundos
// }



// busqueda.addEventListener("input", function() {
//   let texto = busqueda.value.toLowerCase();

//   let filtrados = libros.filter(function(libro) {
//     return libro.titulo.toLowerCase().includes(texto);
//   });

//   mostrarLibros(filtrados);
// });

// function cargarLibros() {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve(libros);
//     }, 1000);
//   });
// }

// function reservarLibro(idUsuario, idLibro) {
//   let libro = libros.find(l => l.id === idLibro && l.disponible);
//   if (libro) {
//     libro.disponible = false;
//     prestamos.push({ usuario: idUsuario, libro: libro, fecha: new Date() });
//     alert(`Reserva exitosa: ${libro.titulo}`);
//   } else {
//     alert("El libro no está disponible.");
//   }
// }

// function buscarLibros(criterio, valor) {
//   return libros.filter(libro => libro[criterio].toLowerCase().includes(valor.toLowerCase()));
// }



// async function iniciar() {
//   let datos = await cargarLibros();
//   mostrarLibros(datos);
// }

// iniciar();



let libros = [
  { id: 1, titulo: "1984", autor: "George Orwell", genero: "Ficción", disponible: true },
  { id: 2, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Infantil", disponible: true },
  { id: 3, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Realismo Mágico", disponible: true },
  { id: 4, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Clásico", disponible: true }
];

let prestamos = [];
let notificaciones = [];

const CONFIG = Object.freeze({
  tiempoReserva: 2000,
  tiempoRecordatorio: 5000
});


class Prestamo {
  constructor(usuario, libro) {
    this.usuario = usuario;
    this.libro = libro;
    this.fecha = new Date();
  }
}


function mostrarLibros() {
  renderLibros(libros);
}

function mostrarPrestamos() {
  let lista = document.getElementById("listaPrestamos");
  lista.innerHTML = "";
  prestamos.forEach(p => {
    let item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.textContent = `${p.libro.titulo} prestado a ${p.usuario}`;

    let btn = document.createElement("button");
    btn.className = "btn btn-sm btn-outline-success";
    btn.textContent = "Devolver";
    btn.onclick = () => devolverLibro(p.usuario, p.libro.id);
    item.appendChild(btn);

    lista.appendChild(item);
  });
}

function reservarLibro(usuario, idLibro) {
  let libro = libros.find(l => l.id === idLibro && l.disponible);
  if (libro) {
    libro.disponible = false;
    prestamos.push(new Prestamo(usuario, libro));
    agregarNotificacion(`Reserva exitosa: ${libro.titulo}`);
    mostrarLibros();
    mostrarPrestamos();
    recordarDevolucion(usuario, libro);
  } else {
    agregarNotificacion("El libro no está disponible.");
  }
}

async function devolverLibro(usuario, idLibro) {
  return new Promise(resolve => {
    setTimeout(() => {
      let index = prestamos.findIndex(p => p.usuario === usuario && p.libro.id === idLibro);
      if (index !== -1) {
        prestamos[index].libro.disponible = true;
        agregarNotificacion(`Devolución exitosa: ${prestamos[index].libro.titulo}`);
        prestamos.splice(index, 1);
        mostrarLibros();
        mostrarPrestamos();
        resolve();
      }
    }, CONFIG.tiempoReserva); // Simula tiempo de espera
  });
}

function buscar() {
  let valor = document.getElementById("busqueda").value.toLowerCase();
  let resultados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(valor) ||
    libro.autor.toLowerCase().includes(valor) ||
    libro.genero.toLowerCase().includes(valor)
  );

  renderLibros(resultados);
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
      btn.className = "btn btn-sm btn-outline-primary";
      btn.textContent = "Reservar";
      btn.onclick = () => reservarLibro("Usuario1", libro.id);
      item.appendChild(btn);
    }

    lista.appendChild(item);
  });
}



function recordarDevolucion(usuario, libro) {
  setTimeout(() => {
    agregarNotificacion(`Recordatorio: ${usuario}, debe devolver el libro "${libro.titulo}" pronto.`);
  }, CONFIG.tiempoRecordatorio); // Simulación de 5 segundos
}

function agregarNotificacion(mensaje) {
  notificaciones.push(mensaje);
  let lista = document.getElementById("listaNotificaciones");
  let item = document.createElement("li");
  item.className = "list-group-item";
  item.textContent = mensaje;
  lista.appendChild(item);
}

function obtenerTitulosDisponibles() {
  return libros
    .filter(l => l.disponible)
    .map(l => l.titulo);
}

function contarPrestamos() {
  return prestamos.reduce((total) => total + 1, 0);
}

(function iniciarSistema() {
  agregarNotificacion("Sistema de Biblioteca iniciado");
  mostrarLibros();
  mostrarPrestamos();
})();


mostrarLibros();
mostrarPrestamos();