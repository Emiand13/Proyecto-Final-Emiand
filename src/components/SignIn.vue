<template>
   <div class="background-container">
  <div class="container">
    <div class="text-center">
    <img src="../components/images/IMAGENLOGO.png" class="image2" alt="imagen logo">
    <h3 class="header-title">Welcome to TaskPro</h3>
    
    <p class="subtitle">Ready to create your tasks in TaskPro!!!</p>
  </div>
  <div v-show="errorMsg" class="error">{{ errorMsg }}</div>
  
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label"></label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">
          </label>
     
            <input
              :type="passwordVisible ? 'text' : 'password'"
              class="input-field input-password"
              placeholder="Confirm Password"
              v-model="password"
              required
              
            />
            <span class="toggle-password" @click="togglePasswordVisibility('password')">
              <i class="fa" :class="passwordVisible ? 'fa-eye-slash' : 'fa-eye'"></i>
            </span>
        </div>
        <button class="button2" type="submit">Sign In</button>
      </div>
    </form>

    <p class="texto-have-acount">Don't have an account? <router-link to="/auth/signup" class="router-link">Sign Up</router-link></p>
  </div>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";






const email = ref("");
const password = ref("");
const redirect = useRouter();
const userStore = useUserStore();

// Error Message
const errorMsg = ref("");

const signIn = async () => {
  try {
    await userStore.signIn(email.value, password.value);
    redirect.push("/");
  } catch (error) {
    console.error(error);
    // Mostrar mensaje de error al usuario si es necesario
    errorMsg.value = "Error al iniciar sesión. Por favor, verifica tus credenciales.";
    setTimeout(() => {
      errorMsg.value = null;
    }, 3000);
  }
    return;
  }
  
  

  

//=========================================================

//Visibilidad password y confirm password
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const togglePasswordVisibility = (field) => {
  if (field === "password") {
    passwordVisible.value = !passwordVisible.value;
  } else if (field === "confirmPassword") {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
};
//========================================================


</script>

<style scoped>


/* ========== SIGNIN COMPONENT ============================================== */

.router-link {
  font-size: 16px;
  align-items: center;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}
.error{
 display: flex;
 justify-content: center;
  font-size: 14px;
  color:rgb(255, 255, 255);
  background-color: rgb(255, 0, 0);
  border-radius: 15px;
}



.background-container{
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-image: url('https://images2.alphacoders.com/100/1008542.jpg');
  background-repeat: no-repeat; 
  background-position: center;

}  
.input-password {
  padding-right: 30px; /* Ajusta el espaciado para el ícono */
  position: relative;
}

.toggle-password {
  flex-wrap: wrap;
  color: #467ffa;
  position: fixed;
  top: 55%;
  right: 700px; /* Ajusta la posición del ícono */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */
}
.container {
  max-width: 450px;

}

.header-title {
  color:gold;
  text-align: center;
  margin-bottom: 20px;
  font-size: 50px;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}

.subtitle{
  color: white;
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.image2{
  border-radius: 15px;
  margin-top: 80px;
  margin-bottom:20px ;
  height: 120px;
  width: 120px;
}


.form-sign-in {
   padding:20px 20px 20px 20px; 
}

.form-input {
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button2 {
 padding: 10px 20px; 
  background-color: gold;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

}

p {
  text-align: center;
  margin-top: 10px;
}

.texto-have-acount{
  color:white;
}
.router-link {
 align-items: center;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}


@media (max-width: 1920px) {

  .toggle-password {
  color: #467ffa;
  position: absolute;
  top: 58.5vh;
  right: 600px; /* Ajusta la posición del ícono */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */
  /* … */
}

}
@media (max-width: 768px) {


.background-container{
  height: 120vh;
  width: 100%;
  background-size: cover;
  background-image: url('https://images2.alphacoders.com/100/1008542.jpg');
  background-repeat: no-repeat; 
  background-position: center;

}  


.button {
  padding: 10px 20px;
  background-color: gold;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

}


}







</style>
