// services/notificacionService.js
let notificaciones = [];

function agregarNotificacion(mensaje) {
  notificaciones.push(mensaje);
  return mensaje;
}

function listarNotificaciones() {
  return notificaciones;
}

module.exports = {
  agregarNotificacion,
  listarNotificaciones
};