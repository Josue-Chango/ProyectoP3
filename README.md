# Sistema de Gestión de Biblioteca Digital

Proyecto Final – Desarrollo de Aplicaciones Web Interactivas  
HTML, CSS, JavaScript, Node.js

-------------------------------------------------------

## Descripción

Este proyecto consiste en un sistema web para la gestión de una biblioteca digital que permite administrar libros, usuarios y préstamos. El sistema permite registrar, editar, eliminar, prestar y devolver libros, mostrando notificaciones y validaciones automáticas.

-------------------------------------------------------

## Objetivo

Desarrollar una aplicación web interactiva que mejore el control de préstamos y devoluciones de libros mediante JavaScript, programación asíncrona y manipulación del DOM.

-------------------------------------------------------

## Tecnologías Utilizadas

- HTML5  
- CSS3  
- JavaScript  
- Node.js  
- Express.js  
- SweetAlert2  
- Bootstrap 5  

-------------------------------------------------------

## Librerías / Dependencias

Instalar con:

npm init -y  
npm install express 

SweetAlert2 y Bootstrap se cargan por CDN en el HTML.

-------------------------------------------------------

## Estructura del Proyecto

/public  
 ├── index.html  
 ├── css/style.css  
 └── js/app.js  

/api  
 ├── libros.js  
 ├── usuarios.js  
 └── prestamos.js  

/models  
 ├── libro.js  
 ├── usuario.js  
 └── prestamo.js  

/services  
 └── fileService.js  

/data  
 ├── libros.txt  
 ├── usuarios.txt  
 └── prestamos.txt  

server.js  

-------------------------------------------------------

## Funcionalidades

LIBROS  
- Agregar libro  
- Editar libro  
- Eliminar libro  
- Validar duplicados  

USUARIOS  
- Registrar usuario  
- Editar usuario  
- Eliminar usuario  
- Validar correo duplicado  

PRÉSTAMOS  
- Prestar libro  
- Devolver libro  
- Máximo 3 préstamos por usuario  

NOTIFICACIONES  
- Registro exitoso  
- Edición  
- Eliminación  
- Préstamo  
- Devolución  

-------------------------------------------------------

## Cómo Ejecutar el Proyecto

1. Instalar Node.js  
2. Abrir consola en la carpeta del proyecto  
3. Ejecutar:

npm install  
node server.js 

4. Abrir navegador:

http://localhost:3000  

-------------------------------------------------------

## Autor

Proyecto desarrollado por:  
Josue Chango,
Adonnys Calero,
Fernando Tipan

-------------------------------------------------------
