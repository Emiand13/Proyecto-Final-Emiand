<script setup>
import Nav from "../components/Nav.vue";
import Reloj from "../components/Reloj.vue";
import Footer from "../components/Footer.vue"

import { ref } from 'vue';
const modoClaro = ref(false);

// Método para manejar el evento cambiarModoClaro emitido desde Nav.vue
const handleCambiarModoClaro = () => {
  // Lógica para cambiar el modo claro en el componente padre (About.vue)
  modoClaro.value = !modoClaro.value;
};





</script>

<template>
      <div :class="{ 'modo-claro': modoClaro }">
    <Nav :modoClaro="modoClaro" @cambiarModoClaro="handleCambiarModoClaro" />
    <Reloj />
    </div>
   <Footer/>
</template>



<style scoped>


.modo-claro{
  height:AUTO;
  width: 100%;
  background-size: cover;
  background-image: url("https://th.bing.com/th/id/R.eb7133b0843bfb621b2c71669eb11663?rik=1WOmWabtON9j4g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f5%2fb%2f6%2f935134-cool-bubble-backgrounds-1920x1280-for-mobile-hd.jpg&ehk=WyUDi6%2fpVqhRgRZxkeM5vq5bvGudbGx3d2e2pzF4Y4o%3d&risl=&pid=ImgRaw&r=0");
  background-repeat: no-repeat;
  background-position: center;
}

.modo-boton {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  margin-left: 5px ;
  padding: 5px 10px;
  background-color: #007bff26; /* Color de fondo del botón (modo claro) */
  color: #fff56400; /* Color de texto del botón (modo claro) */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modo-boton:hover {
  background-color: #297cf8; /* Nuevo color de fondo al pasar el mouse (modo oscuro) */
}

/* Estilos para el botón de cambiar el modo en modo oscuro */
.modo-claro .modo-boton {
  background-color: rgba(0, 149, 255, 0.279); /* Color de fondo del botón (modo oscuro) */
  color: #fff564; /* Color de texto del botón (modo oscuro) */
}

.modo-claro .modo-boton:hover {
  background-color: #297cf8; /* Nuevo color de fondo al pasar el mouse (modo oscuro) */
}

/* Estilos para los iconos (Font Awesome) */
.modo-boton i {
  font-size: 15px;
}

</style>