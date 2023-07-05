
# Final Project TaskPro 

<img src="./src/components/images/Task-Logo-fullcol-Copy.png">

## Table of Contents

- [Introduction](#introduction)
- [Description](#Description)
- [Roadmap](#Roadmap)
- [Technologies](#Technologies)
- [Features](#features)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)

## Introduction

With TaskPro, we aim to get a centralized space to create, edit and manage all your tasks, whether they are pending, in progress or completed.

## Description

This is the final project developed during the Front-End Development bootcamp at Ironhack. It consists of a Vue.js based web application that allows users to manage their tasks.

The application provides functionalities such as user account registration, task creation, editing existing tasks, marking tasks complete, and deleting tasks. To store all user and task data, the application is linked to a database. In this case, Supabase is used, a service that offers a set of Back-End functionalities for database management.

_The main_ objective of this project is to put into practice the knowledge acquired in Vue.js during the course, as well as establish the connection with an external database and manage it effectively.


## Roadmap

### Sabado 01/07/23
* Preparar el README con la descripcion del proyecto y el roadmap
* Subir el proyecto a Vercel para que este disponible para todo el mundo
* Conectar el proyecto con supabase para almacenar los datos de la app

### Martes 03/07/23
* Implentar HTML y CSS del Sign Up y Sing In
* Implentar la logica para el Sign Up, Sign In y Sing Out
* Implementar la funcionalidad de ocultar/mostrar contraseña a la hora de hacer Sign In

### Miercoles 05/07/23
* Añadir funcionalidad al boton update para editar tarea


### Jueves 06/07/23
* Implementar la funcionalidad de addTask y taskItem


### Viernes 07/07/23
* Adaptar el diseño a la version movil, en este caso solo hay solo media query que se activa a partir de 747px para abajo

### Sabado 08/07/23
* Hacer el fetch de las tareas de Supabase al cargar la pagina y cada vez que se ejecute alguna accion de cambio
* Implementar funcionalidad de la fecha en el home


### Lunes 10/07/23
* Implementar menu hamburguesa para versiones moviles
* Cuando el usuario clique en el boton de toggle y cambie el estado de la tarea a "Hecha", esta se tacha


### Martes 11/07/23
* Preparar la tienda task.js para poder conectar los botones con la base de datos
* Añadir funcionalidad al boton toggle que permite cambiar el estado de la tarea
* Añadir funcionalidad al boton de cambiar el nombre que permite al usuario cambiar el titulo de la tarea


### Miercoles 12/07/23


### Jueves 13/07/23


### Viernes 14/07/23


### Sabado 15/07/23
* Empezar con el diseño CSS del componente addTask
* Añadir el diseño CSS del componente taskItem 

### Lunes 17/07/23

* Repaso a la pagina y todas sus funcionalidades
* Preparar la presentacion del proyecto


## Technologies

<img src="./src/components/images/imagen%20tecnologias%20usadas.jpg">

* __Client:__ Vue.js y Vite
* __Router:__ Vue Router
* __Store:__ Pinia
* __Database:__ Supabase



## Features

Discover the key functions of TaskPro:

* Maintain order in your daily life with TaskPro.
* Register and create your own account in TaskPro.
* Manage all your tasks efficiently.
* Edit and delete: Customize your tasks according to your needs.
* Tasks with due dates: Set and track tasks by date.

With TaskPro, you will have a simple and effective tool to manage your tasks in a practical way.


## Contributors

<!-- Todos los que han aportado algo en el proyecto -->

## Build Process

<!-- Proceso de construcción -->


## Acknowledgments

<!-- Aqui los agradecimientos -->




























https://readme.so/
https://www.readme-templates.com/

## Supabase

Imagina que Supabase es como una caja de herramientas mágica para construir sitios web y aplicaciones. Proporciona muchas herramientas listas para usar que facilitan a los desarrolladores crear experiencias en línea poderosas e interactivas.

### Que es Supabase ?

Supabase es una plataforma que te ayuda a crear aplicaciones web y móviles. Es como un conjunto de herramientas y servicios que los desarrolladores utilizan para crear sitios web y aplicaciones más fácilmente. Proporciona una base de datos (donde puedes almacenar información), autenticación (para gestionar usuarios y contraseñas) y almacenamiento de archivos (para guardar y compartir fotos, videos y otros archivos).

### Por que lo usamos ?

Usamos Supabase porque nos facilita la vida como desarrolladores. Nos ahorra tiempo y esfuerzo al proporcionarnos herramientas poderosas y listas para usar. Con Supabase, podemos construir aplicaciones más rápidamente y con menos código. Además, nos permite almacenar información y gestionar usuarios de forma segura y eficiente.

### Ejemplo

Imagina que quieres construir una aplicación de notas en línea. Con Supabase, puedes crear una base de datos para almacenar todas las notas de los usuarios. También puedes agregar autenticación para que los usuarios puedan registrarse y acceder a sus propias notas. Además, puedes usar el almacenamiento de archivos para permitir a los usuarios adjuntar imágenes a sus notas. Supabase se encarga de toda la parte complicada, y tú solo necesitas escribir un poco de código para personalizar la apariencia y el comportamiento de la aplicación.

## Postgres

### Que es postgres?

PostgreSQL, o Postgres en resumen, es un sistema de gestión de bases de datos relacionales. Básicamente, es un software que nos ayuda a almacenar y organizar grandes cantidades de información de manera estructurada. Puedes pensar en ello como una versión avanzada de una hoja de cálculo, pero más potente y capaz de manejar una amplia gama de datos.

### Porque lo usamos ?

Usamos PostgreSQL porque nos permite almacenar y recuperar datos de manera eficiente. Es muy confiable y puede manejar grandes cantidades de información sin problemas. Además, tiene muchas características avanzadas, como el soporte para consultas complejas y la capacidad de mantener la integridad de los datos. Es ampliamente utilizado en aplicaciones empresariales y proyectos grandes donde la precisión y la seguridad de los datos son fundamentales.

## Diff entre postgress y supabase

Supabase:
Supabase es una plataforma de código abierto que combina múltiples herramientas y servicios para simplificar el proceso de construcción de aplicaciones web y móviles. Incluye una base de datos PostgreSQL, un sistema de autenticación y almacenamiento de archivos, entre otras características. Supabase proporciona una configuración lista para usar que facilita a los desarrolladores la creación rápida de aplicaciones. También ofrece capacidades en tiempo real, lo que permite que las aplicaciones actualicen los datos en tiempo real sin requerir actualizaciones manuales.

PostgreSQL:
PostgreSQL, a menudo conocido como Postgres, es un sistema de gestión de bases de datos relacionales (RDBMS) de código abierto, poderoso y altamente confiable. Está diseñado para almacenar y gestionar datos estructurados de manera eficiente. PostgreSQL ofrece un conjunto robusto de características, que incluyen soporte para consultas complejas, integridad de datos, escalabilidad y capacidad de extensión. Se utiliza ampliamente en diversas aplicaciones e industrias, especialmente en proyectos que requieren un alto nivel de integridad de datos, seguridad y escalabilidad.

Diferencias:

Funcionalidad: Supabase se basa en PostgreSQL, lo que significa que utiliza PostgreSQL como su motor de base de datos subyacente. Sin embargo, Supabase agrega herramientas y servicios adicionales, como autenticación y almacenamiento de archivos, para proporcionar una plataforma integrada para la construcción de aplicaciones. PostgreSQL, por otro lado, se centra únicamente en proporcionar un sistema de gestión de bases de datos relacionales potente y flexible.

Facilidad de uso: Supabase ofrece una experiencia más amigable y simplificada para los desarrolladores. Proporciona una configuración simplificada e incluye componentes y bibliotecas preconstruidas que facilitan la construcción de aplicaciones. PostgreSQL, al ser un RDBMS independiente, requiere una configuración y ajuste más manuales.

Capacidades en tiempo real: Una ventaja significativa de Supabase son sus capacidades en tiempo real, que permiten a las aplicaciones escuchar los cambios de datos en tiempo real. Esta función no está disponible solo en PostgreSQL y requiere una implementación y configuración adicionales.

Flexibilidad: Si bien Supabase proporciona una plataforma simplificada e integrada, PostgreSQL ofrece más flexibilidad y control sobre la configuración y la instalación de la base de datos. Con PostgreSQL, los desarrolladores tienen un control total sobre la gestión de la base de datos y pueden personalizarla según sus requisitos específicos.#   P r o y e c t o - F i n a l - E m i a n d 
 
 