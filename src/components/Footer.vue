<template>
  <footer class="footer">
    <div class="container-flex">
      <div class="footer-image">
        <img width="60" height="60" src="https://img.icons8.com/arcade/64/property-with-timer.png" alt="property-with-timer" class="logo"/>
        <!-- <img
          src="../components/images/Task-Logo-fullcol-Copy.png"
          alt="logo"
          class="logo"
        /> -->
        <h6>
          © 2023 TasksPro App. All rights reserved. Built by
          <a href="https://github.com/Emiand13" class="link-footer">
            ⚜️Emiand13⚜️</a
          >
        </h6>
      </div>
    </div>
  </footer>
</template>



<style scoped>
.logo {
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.2);
}
.footer {
  height: 135px;
  width: 100%;
  background-color: rgb(46, 15, 250);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 0px;
}

.footer-image img {
  margin-left: 210px;
  height: 55px;
  width: 50px;
  border-radius: 10px;
  margin-top: 5px;
}
.footer p {
  font-size: 1rem;
}
.footer h6 {
  margin-top: 5px;
  font-size: 1rem;
  color: rgb(255, 255, 255);
}

.link-footer {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

@media (max-width: 768px) {
  footer {
    width: 100%;
    background-color: rgb(46, 15, 250);
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 250px;
  }

  .footer-image img {
    margin-left: 140px;
    width: 50px;
    border-radius: 10px;
    margin-top: 15px;
  }
  .footer p {
    font-size: 0.8rem;
  }
  .footer h6 {
    margin-top: 10px;
    font-size: 0.7rem;
    color: rgb(255, 255, 255);
  }

  .link-footer {
    text-decoration: none;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
}
</style>

