<template>
  
  <nav class="navbar navbar-expand-lg navbar-light  px-3">
   <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/>    -->
   <div class="with-shadow ">
     <img src="../components/images/Task-Logo-fullcol-Copy.png" class="logo">
    </div>
    <router-link to="/" class="nav-link">
      Home
    </router-link>
 
    <ul>
      <li>
          <router-link to="/account" class="nav-link">Your Account</router-link>
        </li>
        <li>
          <router-link to="/" class="nav-link">Your Tasks</router-link>
        </li>

       
    </ul>

    <div class="">
      <ul>
        <li class="log-out-welcome">
          <p class="nav-link">Welcome, {{getUser.email}}</p> <!-- Comentario: Muestra el correo electrónico del usuario -->
        </li>
        <li>
          <button @click="signOut" class="log-out">Log out</button> <!-- Comentario: Botón para cerrar sesión -->
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
import { ref } from 'vue';

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
    router.push('/auth/signup');
  } catch (error) {
    // Manejo de errores
    console.error(error);
  }
};
</script>

<style  scoped>


.logo{
height:80px;
width: 85px;

box-shadow: 20 20px 4px rgb(0, 0, 0);
}

nav {
  /* background-color: #63E667; */
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.log-out-welcome p {
  margin: 0;
}

.button {
  padding: 10px 20px;
  background-color: #63E667;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.nav-link {
  text-decoration: none;
}

.log-out{
  width: 100px;
  padding: 10px 15px;
  background-color: #ff3d3dd1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;




}
</style>
