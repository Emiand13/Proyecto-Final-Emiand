<template>
  <nav class="navbar navbar-expand-lg navbar-light px-3">
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/>    -->
    <div class="with-shadow">
      <!-- <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button> -->
      <img src="../components/images/imagenNueva2.png" class="logo" />
    </div>
    <router-link to="/" class="nav-link"> Home </router-link>

    <router-link to="/account" class="nav-link">Your Account</router-link>

    <router-link to="/" class="nav-link">Your Tasks</router-link>

    <router-link class="nav-link" to="/reloj">Reloj</router-link>

    <div class="">
      <ul>
        <li class="log-out-welcome">
          <p class="nav-link">
            Welcome,
            <span class="user-email">{{ getEmailPrefix(getUser.email) }}</span>
          </p>
          <!-- Comentario: Muestra el correo electrónico del usuario -->
        </li>
        <li>
          <button @click="signOut" class="log-out">Log Out</button>
          <!-- Comentario: Botón para cerrar sesión -->
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user; // Comentario: Obtiene el usuario del almacén de usuarios

// constante que llama al correo electrónico del usuario desde useUSerStore
const userEmail = ref(""); // Comentario: Variable reactiva para almacenar el correo electrónico del usuario

// función asíncrona que llama al método signOut desde useUserStore y empuja al usuario de vuelta a la vista Auth.
const userStore = useUserStore(); // Comentario: Accede al almacén de usuarios
const router = useRouter(); // Comentario: Accede al enrutador

// Obtiene el correo electrónico del usuario cuando se carga el componente
const getUserEmail = () => {
  const user = getUser.value;
  if (user) {
    userEmail.value = user.email;
  }
};
getUserEmail();

const signOut = async () => {
  try {
    // Lógica para cerrar sesión
    await userStore.signOut(); // Comentario: Llama a la función de cierre de sesión del almacén de usuarios

    // Redirigir al usuario a la página de registro
    router.push("/auth/signup");
  } catch (error) {
    // Manejo de errores
    console.error(error);
  }
};

//Esta funcion es para que se muestre solamente el prefijo del email del usuario
const getEmailPrefix = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  }
  return email;
};
</script>

<style  scoped>
.logo {
  height: 60px;
  width: 60px;
  border-radius: 15px;
}

nav {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-email {
  color: gold; /* Cambia el color a tu preferencia */
}
.log-out-welcome p {
  margin: 0;
}

.nav-link {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 16px;
}

.log-out {
  height: 45px;
  width: 100px;
  align-content: center;
  padding: 10px 15px;
  background-color: #a504b7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
</style>
