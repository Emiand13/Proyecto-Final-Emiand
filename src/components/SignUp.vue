<template>
  <div class="background-container">
    <div class="container">
      <div class="header">
        <div class="header-description">
          <div class="text-center">
            <img
              src="../components/images/IMAGENLOGO.png"
              class="image"
              alt="imagen logo"
            />
            <h3 class="header-title">Register to TaskPro</h3>
            <p class="subtitle">Ready to create your tasks in TaskPro!!!</p>
            <div v-show="errorMsg" class="error">{{ errorMsg }}</div>
            <div v-if="emailConfirmed">
              <p>Por favor, revisa tu email para confirmar tu registro.</p>
            </div>
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
                :style="style"
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
                :style="style"
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
          <button class="button2" type="submit">Sign Up</button>
          <p class="texto-have-Acount">
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="router-link"
            />
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
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

const emailConfirmed = ref(false);

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

// Error Message
const errorMsg = ref("");

// Esta función togglePasswordVisibility se utiliza para alternar la visibilidad de los campos de contraseña y confirmación de contraseña.
const togglePasswordVisibility = (field) => {
  if (field === "password") {
    passwordVisible.value = !passwordVisible.value;
  } else if (field === "confirmPassword") {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
};

// Enrutador para empujar al usuario una vez que se haya registrado para iniciar sesión
const redirect = useRouter();

// Función de tipo flecha para registrar al usuario en supaBase con un método timeOut() para mostrar el error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // llama al almacén de usuarios y envía la información de los usuarios al backend para iniciar sesión
      await useUserStore().signUp(email.value, password.value);

      emailConfirmed.value = true; // Establecer emailConfirmed en true

      // redirige al usuario a homeView (signIn)
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // muestra mensaje de error
      errorMsg.value = error.message;
      // oculta el mensaje de error
      setTimeout(() => {
        errorMsg.value = null;
      }, 3000);
    }
    return;
  }
  errorMsg.value = "Los datos introducidos no son correctos!!!";
  // oculta el mensaje de error
  setTimeout(() => {
    errorMsg.value = null;
  }, 3000);
};
</script>

<style  scoped>
/* =========== IMAGEN BACKGROUND SIGN UP ================================== */
.background-container {
  height: 120vh;
  width: 100%;
  background-size: cover;
  background-image: url("https://images2.alphacoders.com/100/1008542.jpg");
  background-repeat: no-repeat;
  background-position: center;
}

/* ICONO1 OJO VISIBLE / NO VISIBLE PASSWORD*/
.toggle-password1 {
  position: absolute;
  top: 64.3vh;
  right: 600px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */

  color: #467ffa;
  margin-left: 5px;
  cursor: pointer;
}

/* ICONO2 OJO VISIBLE / NO VISIBLE PASSWORD*/
.toggle-password2 {
  position: absolute;
  top: 73vh;
  right: 600px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */

  color: #467ffa;
  margin-left: 5px;
  cursor: pointer;
}

/* ======= INPUT WRAPPER =================================================================== */
.error {
  font-size: 16px;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 0, 0);
  border-radius: 15px;
}
.container {
  max-width: 450px;
}

.header-title {
  color: gold;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  font-size: 50px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.subtitle {
  color: white;
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.image {
  border-radius: 15px;
  margin-top: 80px;
  margin-bottom: 20px;
  height: 120px;
  width: 120px;
}
.form-sign-in {
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

.texto-have-Acount {
  color: white;
}
.router-link {
  font-size: 16px;
  align-items: center;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}



@media (max-width: 768px) {


  .toggle-password1 {
  position: absolute;
  top: 83.5vh;
  right: 50px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */

  color: #467ffa;
  margin-left: 5px;
  cursor: pointer;
}

/* ICONO2 OJO VISIBLE / NO VISIBLE PASSWORD*/
.toggle-password2 {
  position: absolute;
  top: 93vh;
  right: 50px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1; /* Asegura que el ícono esté por encima del input */

  color: #467ffa;
  margin-left: 5px;
  cursor: pointer;
}





}
</style>


