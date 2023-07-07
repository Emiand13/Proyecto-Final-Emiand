<template>
     <div class="background-container">
    <div class="bodyclock">
    <div id="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    <p class="text">DIGITAL CLOCK with Vue.js</p>

</div>
</div>
</div>

</template>

<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";




// const redirect = useRouter();







const date = ref("");
const time = ref("");

// Función para obtener la fecha y hora actual
const getCurrentDateTime = () => {
  const now = new Date();

  // Obtener la fecha actual
  const options = { year: "numeric", month: "long", day: "numeric" };
  date.value = now.toLocaleDateString(undefined, options);

  // Obtener la hora actual
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  time.value = `${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  // Actualizar la fecha y hora cada segundo
  getCurrentDateTime();
  setInterval(getCurrentDateTime, 1000);
});




</script>

<style scoped>




.background-container{
  height: 1450px;
  width: 100%;
  background-size: cover;
  background-image: url('https://images2.alphacoders.com/100/1008542.jpg');
  background-repeat: no-repeat; 
  background-position: center;

} 
.bodyclock {
  background: white;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Resto de los estilos CSS para el reloj */
#clock {
  font-family: "Share Tech Mono", monospace;
  color: #333;
  text-align: center;
}

.time {
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 5px 0;
}

.date {
  letter-spacing: 0.1em;
  font-size: 24px;
}

.text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>