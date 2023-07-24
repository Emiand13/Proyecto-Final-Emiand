<template>
  <div class="container">
    <div class="wrap">
      <div class="tarjeta-wrap">
        <div class="tarjeta">
          <div class="adelante card1"></div>
          <div class="atras">
            <div>
              <br>
              <h2 class="titulo-about">⚜️About Me⚜️</h2>
              <br />
              <p class="parrafo-about">
                My name is Emilio Carrasco, I am 36 years old, I am a junior web
                developer and I have been passionate about this world since day
                one that I started this adventure almost two years ago, every
                day I learn something new and there is a phrase that I want to
                share with you Never Master Always Student, being humble and
                hardworking is a characteristic that defines me.
              </p>
              <br>
              <a href="https://github.com/Emiand13" class="link-emiand13"
                >Emiand13</a
              >
              <p class="parrafo-about-2">⚜️Life is for the living⚜️</p>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>



<style scoped>


.titulo-about {
	margin-top: 10px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: gold;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}
.parrafo-about-2 {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 18px;
  color: rgb(0, 0, 0);
}
.parrafo-about {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 18px;
  color: rgb(0, 0, 0);
}

.link-emiand13 {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 48px;
}

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.wrap {
  width: 50px;
  margin: 50px auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
} 

.tarjeta-wrap {
  margin: 10px;
  -webkit-perspective: 800;
  perspective: 800;
}

.tarjeta {
  width: 460px;
  height: 460px;
  background: #20baf2;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: 0.7s ease;
  transition: 0.7s ease;
  -webkit-box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.65);
  box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.65);
  border-radius: 20px;
}

.adelante,
.atras {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
}

.adelante {
  width: 100%;
}

.atras {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);

  padding: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #d6eadf;
  text-align: center;
  color: #fff;
  font-family: "open sans";
}

.tarjeta-wrap:hover .tarjeta {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.card1 {
  background-image: url("../components/images/130839086.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  border-radius: 20px;
}

.container {
	display: flex;
	justify-content: center;
  margin-top: 50px;
  height: 600px;
 
}

@media (max-width: 768px) {
 
 * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  } 

  .wrap {
    width: 150px;
    margin: 50px auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .tarjeta-wrap {
    margin: 10px;
    -webkit-perspective: 800;
    perspective: 800;
  }
  .tarjeta {
    width: 350px;
    height: 350px;
    background: #20baf2;
    position: relative;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: 0.7s ease;
    transition: 0.7s ease;
    -webkit-box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.65);
    box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.65);
  }

  .adelante,
  .atras {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

  }

  .adelante {
    width: 100%;
  }

  .atras {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);

    padding: 15px 15px 15px 15px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;

  
  }

  .tarjeta-wrap:hover .tarjeta {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .card1 {
    background-image: url("../components/images/130839086.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
  }

  .container {
    height: 450px;
	
  }
  .titulo-about {
	margin-top: 10px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: gold;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}
.parrafo-about-2 {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 14px;
  color: rgb(0, 0, 0);
}
.parrafo-about {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 14px;
  color: rgb(0, 0, 0);
}

.link-emiand13 {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 48px;
}
}
</style>