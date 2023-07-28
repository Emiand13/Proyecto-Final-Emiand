<template>

    <div style="text-align: center; padding: 6em 0">
      <h1>
        <h3  class="link-clock2">TaskPro</h3>
        <h3><router-link 
          to="/" 
          class="link-clock2">
          <img width="64" height="64" src="https://img.icons8.com/arcade/64/clipboard.png" alt="clipboard"/></router-link> 
        </h3>
        <a style="text-decoration: none"
         class="titulo-reloj">
          <span style="color: rgb(252, 194, 4)">Hora actual en</span>
          <br />Barcelona, España</a
        >
      </h1>
      <iframe
        src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&size=large&timezone=Europe%2FMadrid"
        width="100%"
        height="180"
        style="color: white;"
        frameborder="0"
        class="center"
      ></iframe>
       <!-- <div id="elemento">
        <img src="./images/logo-ironhack-blue.png" class="image-ironhack2" />
      </div>  -->
    </div>
   
    
</template> 


<script setup>

</script>


<style scoped>
img{
  transition: transform 0.3s;
}

img:hover{
  transform: scale(1.2);
}
</style>