<template>
  <div class="background-container">
    <div class="container">
      <div class="header">
        <div class="header-description">
          <div class="text-center">
            <img
              src="../components/images/imagenNueva2.png"
              class="image"
              alt="imagen logo"
            />
            <h3 class="header-title">Register to TaskPro</h3>
            <p class="header-subtitle">
              Ready to create your tasks in TaskPro!!!
            </p>
          </div>
        </div>
      </div>

      <form @submit.prevent="signUp" class="form-sign-in">
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
              <span
                class="toggle-password1"
                @click="togglePasswordVisibility('password')"
              >
                <i
                  class="fa"
                  :class="passwordVisible ? 'fa-eye-slash' : 'fa-eye'"
                ></i>
              </span>
            </label>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              class="input-field"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">
              <span
                class="toggle-password2"
                @click="togglePasswordVisibility('confirmPassword')"
              >
                <i
                  class="fa"
                  :class="confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'"
                ></i>
              </span>
            </label>
            <input
              :type="confirmPasswordVisible ? 'text' : 'password'"
              class="input-field"
              placeholder="Confirm password"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="button" type="submit">Sign Up</button>
          <p>
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>
        </div>
      </form>

      <div v-show="errorMsg">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

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

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Los datos introducidos no son correctos!!!";
};
</script>

<style  scoped>
.form-input-label {
  display: flex;
  align-items: center;
}

.background-container{
 
  background-image: url('https://adnfriki.com/wp-content/uploads/2013/09/Fondos-Abstractos-II-ADNFriki-9.jpg');
background-repeat: no-repeat; 
background-position: center;
  background-size: cover;

} 

/* icono ojo visible/ no password*/
.toggle-password1 {
  position: absolute;
  top: 48%;
  right: 700px; /* Ajusta la posición del ícono */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */

  color: #467ffa;
  margin-left: 5px;
  cursor: pointer;
}
.toggle-password2 {
  position: absolute;
  top: 56.5%;
  right: 700px; /* Ajusta la posición del ícono */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */

  color: #467ffa;
  margin-left: 5px;
  cursor: pointer;
}

/* .fa {
  font-size: 18px;
  color: #ccc;
} */
.container {
  max-width: 430px;
  margin: 0 auto;
}

.header-title {
  color:#ffae00;
  text-align: center;
  margin-bottom: 20px;
  font-size: 48px;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}

.subtitle {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.image {
  margin-top: 35px;
  height: 200px;
  width: 180px;
}
.form-sign-in {
  /* border: 1px solid #ccc; */
  padding: 20px 20px 20px 20px;
}

.form-input {
  margin-bottom: 10px;
}

.input-field-label {
  font-weight: bold;
}

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
</style>


