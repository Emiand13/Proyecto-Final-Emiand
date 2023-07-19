<template>
  <div class="background-container">
    <div style="text-align: center; padding: 8em 0">
      <h1>
        <a style="text-decoration: none" class="titulo-reloj">
          <span style="color: rgb(252, 194, 4)">Hora actual en</span>
          <br />Barcelona, España</a
        >
      </h1>
      <iframe
        src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&size=large&timezone=Europe%2FMadrid"
        width="100%"
        height="180"
        frameborder="0"
        class="center"
      ></iframe>
      <div id="elemento">
        <img src="./images/logo-ironhack-blue.png" class="image-ironhack2" />
      </div>
    </div>
  </div>
</template> 


<script setup>
// import Footer from "../components/Footer.vue";
// import { ref, onMounted, onBeforeUnmount } from "vue";

// export default {
//   name: 'Reloj',
//   setup() {
//     const horaActual = ref('');
//     let intervalId;

//     // Función para obtener la hora actual
//     const obtenerHoraActual = () => {
//       const date = new Date();
//       horaActual.value = date.toLocaleTimeString();
//     };

//     // Obtener la hora actual al montar el componente
//     onMounted(() => {
//       obtenerHoraActual();
//       // Actualizar la hora cada segundo
//       intervalId = setInterval(obtenerHoraActual, 1000);
//     });

//     // Limpiar el intervalo al desmontar el componente
//     onBeforeUnmount(() => {
//       clearInterval(intervalId);
//     });

//     return {
//       horaActual
//     };
//   }
// }
</script>







<style scoped>

.titulo-reloj {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
/* .image-ironhack{
  margin-top: 75px;
width: 80px;

} */
.image-ironhack2 {
  margin-top: 75px;
  width: 100px;
}

#elemento {
  position: absolute;
  top: 65%;
  left: 46%;
  transform: translate(-50%, -50%);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.background-container {
  height: auto;
  width: 100%;
  background-size: cover;
  background-image: url("https://images2.alphacoders.com/100/1008542.jpg");
  background-repeat: no-repeat;
  background-position: center;
}

/* ==========MEDIA QUERIES========================================= */
@media (max-width: 768px) {
  /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */
  .image-ironhack2 {
    display: flex;
    justify-content: center;
    margin-left: 25px;
    margin-top: 100px;
    width: 70px;
  }

  #elemento {
    position: absolute;
    top: 65%;
    left: 35%;
    transform: translate(-50%, -50%);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}


@media (max-width: 375px) {

  .image-ironhack2 {
    display: none;
  
  }
}
</style>