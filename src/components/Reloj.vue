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

</script>


<style scoped>
</style>