<template>
    <div class="container">
       
        <div class="wrap">
		<div class="tarjeta-wrap">
			<div class="tarjeta">
				<div class="adelante card1"></div>
				<div class="atras">
					<img src="./images/emiand13.jpg" class="imagen-emiand13">
				</div>
			</div>
		</div>
    </div>
    </div>
 
</template>

<script setup>


</script>



<style scoped>
body{

background-color: blue;
}

*{
margin: 0;
padding: 0;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
}

.wrap{
 
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

.tarjeta-wrap{
  
margin: 10px;
-webkit-perspective: 800;
perspective: 800;
}


.imagen-emiand13{
    width: 550px;
height: 400px;


}
.tarjeta{
   
width: 460px;
height: 400px;
background: #20baf2;
position: relative;
-webkit-transform-style: preserve-3d;
transform-style: preserve-3d;
-webkit-transition: .7s ease;
transition: .7s ease;
-webkit-box-shadow: 0px 10px 15px -5px rgba(0,0,0,0.65);
box-shadow: 0px 10px 15px -5px rgba(0,0,0,0.65);

}

.adelante, .atras{
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;

}

.adelante{
width: 100%;
}

.atras{
 
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

text-align: center;
color: #fff;
font-family: "open sans";
}

.tarjeta-wrap:hover .tarjeta{
-webkit-transform: rotateY(180deg);
transform: rotateY(180deg);
}

.card1{
background-image: url("../components/images/130839086.jpg");
background-size: cover;
display: flex;
justify-content: center;
}



 .container{
height: 530px;
margin-left: 5rem;
 }
 
  
</style>