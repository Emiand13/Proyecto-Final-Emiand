<template>
  <div class="container">
    <div class="text-center">
    <img src="../components/images/Task-Logo-fullcol-Copy.png" class="image" alt="imagen logo">
    <h3 class="header-title">Welcome to TaskPro</h3>
    
    <p class="subtitle">Ready to create your tasks in TaskPro!!!</p>
  </div>
    
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
        <button class="button" type="submit">Sign In</button>
      </div>
    </form>

    <p>Don't have an account? <router-link to="/auth/signup">Sign Up</router-link></p>
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

const signIn = async () => {
  try {
    await userStore.signIn(email.value, password.value);
    redirect.push("/");
  } catch (error) {
    console.error(error);
    // Mostrar mensaje de error al usuario si es necesario
  }
};

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

.input-password {
  padding-right: 30px; /* Ajusta el espaciado para el ícono */
  position: relative;
}

.toggle-password {
  color: #467ffa;
  position: fixed;
  top: 54%;
  right: 610px; /* Ajusta la posición del ícono */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */
}
.container {
  max-width: 400px;
  margin: 0 auto;
}

.header-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 32px;
  font-family:Verdana, Geneva, Tahoma, sans-serif
}

.subtitle{

  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-family:Verdana, Geneva, Tahoma, sans-serif
}
.image{
height: 200px;
width: 240px;

}


.form-sign-in {
  /* border: 1px solid #ccc; */
   padding:20px 20px 20px 20px; 
}

.form-input {
  margin-bottom: 10px;
}

/* .input-field-label {
  font-weight: bold;
} */

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  padding: 10px 20px;
  background-color: #ffae00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

p {
  text-align: center;
  margin-top: 10px;
}

.router-link {
 align-items: center;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}


@media (max-width: 924px) {

  .toggle-password {
  color: #467ffa;
  position: absolute;
  top: 76%;
  right: 90px; /* Ajusta la posición del ícono */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */
  /* … */
}

}
@media (max-width: 375px) {

.toggle-password {
color: #467ffa;
position: absolute;
top: 50%;
right: 190px; /* Ajusta la posición del ícono */
transform: translateY(-50%);
cursor: pointer;
z-index: 1; /* Asegura que el ícono esté por encima del input */
/* … */
}

}







</style>
