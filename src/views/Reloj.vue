<script setup>
import { onMounted, ref, toRefs, computed } from "vue";
import Nav from "../components/Nav.vue";
import Reloj from "../components/Reloj.vue";
import Footer from "../components/Footer.vue"


import { useRouter } from "vue-router";

// const mensaje = ref('');

// const mostrarMensaje = () => {
//   mensaje.value = '¡Hola desde la vista del reloj!';
// };
</script>

<template>
   <div class="background-container"> 
    <Nav />
    <Reloj />
    <!-- Uso del componente "Reloj.vue" -->
   </div> 
   <Footer/>
</template>



<style scoped>
.background-container {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-image: url("https://images2.alphacoders.com/100/1008542.jpg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>