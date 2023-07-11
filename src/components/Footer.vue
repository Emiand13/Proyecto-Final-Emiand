<template>
  <footer class="footer">
    <div class="container-flex">
      <div class="footer-image">
        <img src="../components/images/imagenNueva2.png" alt="logo" />
        <h6>
          © 2023 TasksPro App. All rights reserved. Built with ❤️ by Emiand13
        </h6>
      </div>
    </div>
  </footer>
</template>



<style scoped>
footer {
  height: 8%;
  width: 100vw;
  background-color: rgba(46, 15, 250, 0.377); 
  padding: 10px ;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 250px;
}

.footer-image img {
  margin-left: 230px;
  width: 40px;
  border-radius: 10px;
}
.footer p {
  font-size: 1rem;
}
.footer h6 {
  margin-top: 10px;
  font-size: 1rem;
  color: rgb(255, 255, 255);
}
</style>

