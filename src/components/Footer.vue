<template>
  <footer class="footer">
     <div class="container-flex"> 
      <div class="footer-image">
        <img src="../components/images/Task-Logo-fullcol-Copy.png" alt="logo" class="logo" />
        <h6>
          © 2023 TasksPro App. All rights reserved. Built with ❤️ by <a href="https://github.com/Emiand13" class="link-footer"> Emiand13</a> 
        </h6>
      </div>
    </div> 
  </footer>
</template>



<style scoped>

.logo{
height: 55px;
width:2em;
}




.footer {
 
  bottom: 0px;
  height: 90px; 
  width: 100%;
  background-color: rgb(46, 15, 250); 
   padding: 10px ;  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; 

}

.footer-image img {
  margin-left: 200px;
  width: 80px;
  border-radius: 10px;
  margin-top: 15px;
}
.footer p {
  font-size: 1rem;
}
.footer h6 {
  margin-top: 10px;
  font-size: 1rem;
  color: rgb(255, 255, 255);
}

.link-footer {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}


@media (max-width: 768px) {

  footer {
  height: 8%;
  width: 100vw;
  background-color: rgb(46, 15, 250); 
  padding: 10px ;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 250px;
}

.footer-image img {
  margin-left: 120px;
  width: 80px;
  border-radius: 10px;
  margin-top: 15px;
}
.footer p {
  font-size: 0.6rem;
}
.footer h6 {
  margin-top: 10px;
  font-size: 0.6rem;
  color: rgb(255, 255, 255);
}

.link-footer {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}




}
</style>

