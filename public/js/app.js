let libros = [];
let usuarios = [];
let prestamos = [];

/* ======================
   CARGAR DATOS
====================== */

async function cargarDatos() {
  const [librosRes, usuariosRes, prestamosRes] = await Promise.all([
    fetch('/api/libros/disponibles'),
    fetch('/api/usuarios'),
    fetch('/api/prestamos')
  ]);

  libros = await librosRes.json();
  usuarios = await usuariosRes.json();
  prestamos = await prestamosRes.json();

  actualizarInterfaz();
}

function actualizarInterfaz() {
  actualizarListaLibros();
  actualizarListaUsuarios();
  actualizarSelects();
  actualizarTablaPrestamos();
}

/* ======================
   LIBROS
====================== */

function actualizarListaLibros() {
  const lista = document.getElementById("listaLibros");
  lista.innerHTML = "";

  if (libros.length === 0) {
    lista.innerHTML = `<div class="list-group-item text-muted text-center">
      No hay libros disponibles
    </div>`;
    return;
  }

  libros.forEach(libro => {
    lista.innerHTML += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${libro.titulo}</strong><br>
          <small>${libro.autor} - ${libro.genero}</small>
        </div>

        <div>
          <button class="btn btn-warning btn-sm"
            onclick="editarLibro(${libro.id})">Editar</button>

          <button class="btn btn-danger btn-sm"
            onclick="eliminarLibro(${libro.id})">Eliminar</button>
        </div>
      </div>
    `;
  });
}

/* ======================
   AGREGAR LIBRO
====================== */

async function agregarLibro(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const genero = document.getElementById("genero").value.trim();

  if (!titulo || !autor || !genero) {
    Swal.fire("Error","Complete todos los campos","error");
    return;
  }

  if (libros.some(l => l.titulo.toLowerCase() === titulo.toLowerCase())) {
    Swal.fire("Error","Libro repetido","error");
    return;
  }

  const res = await fetch("/api/libros",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({titulo,autor,genero})
  });

  const data = await res.json();

  if(res.ok){
    Swal.fire("Éxito","Libro agregado","success");
    document.getElementById("formAgregarLibro").reset();
    agregarNotificacion(`Libro agregado: ${titulo}`);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   EDITAR LIBRO
====================== */

async function editarLibro(id){
  const libro = libros.find(l=>l.id===id);

  const {value} = await Swal.fire({
    title:"Editar Libro",
    html:`
      <input id="t" class="swal2-input" value="${libro.titulo}">
      <input id="a" class="swal2-input" value="${libro.autor}">
      <input id="g" class="swal2-input" value="${libro.genero}">
    `,
    preConfirm:()=>({
      titulo:document.getElementById("t").value,
      autor:document.getElementById("a").value,
      genero:document.getElementById("g").value
    }),
    showCancelButton:true
  });

  if(!value) return;

  const res = await fetch(`/api/libros/${id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(value)
  });

  const data = await res.json();

  if(res.ok){
    Swal.fire("Actualizado",data.mensaje,"success");
    agregarNotificacion(`Libro editado: ${value.titulo}`);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   ELIMINAR LIBRO
====================== */

async function eliminarLibro(id){
  const libro = libros.find(l=>l.id===id);

  const c = await Swal.fire({
    title:"Eliminar libro?",
    icon:"warning",
    showCancelButton:true
  });

  if(!c.isConfirmed) return;

  const res = await fetch(`/api/libros/${id}`,{
    method:"DELETE"
  });

  const data = await res.json();

  if(res.ok){
    Swal.fire("Eliminado",data.mensaje,"success");
    agregarNotificacion(`Libro eliminado: ${libro.titulo}`);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   USUARIOS
====================== */

function actualizarListaUsuarios(){
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML="";

  usuarios.forEach(u=>{
    const cant = prestamos.filter(p=>p.usuario===u.nombre).length;

    lista.innerHTML+=`
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${u.nombre}</strong><br>
          <small>${u.email}</small>
        </div>

        <div>
          <button class="btn btn-warning btn-sm"
            onclick="editarUsuario(${u.id},'${u.nombre}','${u.email}')">
            Editar
          </button>

          <button class="btn btn-danger btn-sm"
            onclick="eliminarUsuario(${u.id})">
            Eliminar
          </button>

          <span class="badge bg-success ms-2">${cant}/3</span>
        </div>
      </div>
    `;
  });
}

/* ======================
   REGISTRAR USUARIO
====================== */

async function agregarUsuario(e){
  e.preventDefault();

  const nombre=document.getElementById("nombreUsuario").value.trim();
  const email=document.getElementById("emailUsuario").value.trim();

  if(!nombre||!email){
    Swal.fire("Error","Campos vacíos","error");
    return;
  }

  if(usuarios.some(u=>u.email===email)){
    Swal.fire("Error","Email repetido","error");
    return;
  }

  const res=await fetch("/api/usuarios",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({nombre,email})
  });

  const data=await res.json();

  if(res.ok){
    Swal.fire("Éxito","Usuario registrado","success");
    document.getElementById("formAgregarUsuario").reset();
    agregarNotificacion(`Usuario registrado: ${nombre}`);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   EDITAR USUARIO
====================== */

async function editarUsuario(id,nombre,email){

  const {value}=await Swal.fire({
    title:"Editar usuario",
    html:`
      <input id="n" class="swal2-input" value="${nombre}">
      <input id="e" class="swal2-input" value="${email}">
    `,
    preConfirm:()=>({
      nombre:document.getElementById("n").value,
      email:document.getElementById("e").value
    }),
    showCancelButton:true
  });

  if(!value) return;

  const res=await fetch(`/api/usuarios/${id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(value)
  });

  const data=await res.json();

  if(res.ok){
    Swal.fire("Actualizado","Usuario actualizado","success");
    agregarNotificacion(`Usuario editado: ${value.nombre}`);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   ELIMINAR USUARIO
====================== */

async function eliminarUsuario(id){

  const usuario = usuarios.find(u=>u.id===id);

  const c=await Swal.fire({
    title:"Eliminar usuario?",
    icon:"warning",
    showCancelButton:true
  });

  if(!c.isConfirmed) return;

  const res=await fetch(`/api/usuarios/${id}`,{
    method:"DELETE"
  });

  const data=await res.json();

  if(res.ok){
    Swal.fire("Eliminado",data.mensaje,"success");
    agregarNotificacion(`Usuario eliminado: ${usuario.nombre}`);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   SELECTS
====================== */

function actualizarSelects(){
  usuarioPrestamo.innerHTML='<option value="">Seleccione usuario</option>';
  usuarios.forEach(u=>{
    usuarioPrestamo.innerHTML+=`<option value="${u.nombre}">${u.nombre}</option>`;
  });

  libroPrestamo.innerHTML='<option value="">Seleccione libro</option>';
  libros.forEach(l=>{
    libroPrestamo.innerHTML+=`<option value="${l.id}">${l.titulo}</option>`;
  });
}

/* ======================
   PRESTAMOS
====================== */

function actualizarTablaPrestamos(){
  tablaPrestamos.innerHTML="";

  prestamos.forEach(p=>{
    tablaPrestamos.innerHTML+=`
      <tr>
        <td>${p.usuario}</td>
        <td>${p.libro.titulo}</td>
        <td>${new Date(p.fecha).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-danger btn-sm"
            onclick="devolverLibro('${p.usuario}',${p.libro.id})">
            Devolver
          </button>
        </td>
      </tr>
    `;
  });
}

async function realizarPrestamo(e){
  e.preventDefault();

  const usuario=usuarioPrestamo.value;
  const libro=libroPrestamo.value;

  const res=await fetch("/api/prestamos/reservar",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({usuario,idLibro:Number(libro)})
  });

  const data=await res.json();

  if(res.ok){
    Swal.fire("Éxito",data.mensaje,"success");
    agregarNotificacion(data.mensaje);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

async function devolverLibro(usuario,idLibro){

  const res=await fetch("/api/prestamos/devolver",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({usuario,idLibro})
  });

  const data=await res.json();

  if(res.ok){
    Swal.fire("Éxito",data.mensaje,"success");
    agregarNotificacion(data.mensaje);
    cargarDatos();
  }else{
    Swal.fire("Error",data.mensaje,"error");
  }
}

/* ======================
   NOTIFICACIONES
====================== */

function agregarNotificacion(m){
  const li=document.createElement("li");
  li.className="list-group-item";
  li.textContent=m;
  listaNotificaciones.prepend(li);
}

/* ======================
   INICIO
====================== */

document.addEventListener("DOMContentLoaded",()=>{
  agregarNotificacion("Sistema iniciado");
  cargarDatos();
  setInterval(cargarDatos,60000);
});
