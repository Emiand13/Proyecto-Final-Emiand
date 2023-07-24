<template>
  <nav
    class="navbar navbar-expand-lg"
    style="display: flex; justify-content: space-between"
  >
    <div class="container-fluid">
      <img src="../components/images/Task-Logo-fullcol-Copy.png" class="logo" />

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 3.5A.5.5 0 0 1 1.5 3h13a.5.5 0 0 1 0 1H1.5A.5.5 0 0 1 1 3.5zM1 7.5A.5.5 0 0 1 1.5 7h13a.5.5 0 0 1 0 1H1.5A.5.5 0 0 1 1 7.5zM1 11.5A.5.5 0 0 1 1.5 11h13a.5.5 0 0 1 0 1H1.5A.5.5 0 0 1 1 11.5z"
            />
          </svg>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link"> TaskPro </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/account" class="nav-link"
              >Your Account</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reloj">Clock</router-link>
          </li>
           <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li> 
        
        </ul>
      </div>
      <ul>
        <li class="log-out-welcome">
          <p class="nav-link">
            Welcome,
            <span class="user-email">{{ getEmailPrefix(getUser.email) }}</span>
          </p>
          <!-- Comentario: Muestra el correo electrónico del usuario -->
        </li>
        <li>
          <button @click="signOut" class="log-out fade-in-button">Log Out</button>
          <!-- Comentario: Botón para cerrar sesión -->
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

// Constante para guardar una variable que contendrá el método useRouter
const route = "/";

// Constante para guardar una variable que obtendrá el usuario desde el almacén con una función computada importada de Vue
const getUser = useUserStore().user; // Obtiene el usuario del almacén de usuarios

// Constante que recupera el correo electrónico del usuario desde useUserStore
const userEmail = ref(""); // Variable reactiva para almacenar el correo electrónico del usuario

// Función asíncrona que recupera el correo electrónico del usuario cuando se carga el componente
const userStore = useUserStore(); // Accede al almacén de usuarios
const router = useRouter(); // Accede al enrutador

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

// Esta función es para mostrar solamente el prefijo del correo electrónico del usuario
const getEmailPrefix = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  }
  return email;
};
</script>




<style  scoped>

.navbar-toggler {
    padding: 0.05rem 0.1rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: rgb(46, 15, 250); 
    border: 1px solid #d4e608;
    border-radius: 0.25rem;
    transition: box-shadow 0.2s ease-in-out;
    color: #d4e608;
  }
  
  .logo {
    height: 60px;
    width: 90px;
    border-radius: 15px;
  }
  
  nav {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(46, 15, 250); 
  }
  
  nav ul {
    list-style: none;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  }
  
  .user-email {
    color: gold;
  }
  .log-out-welcome p {
    margin: 0;
   
  }
  
  .nav-link {
    margin-left: 2rem;
    text-decoration: none;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 20px;
    color:rgba(255, 217, 0, 0.897);
  }

  .nav-link:hover{

color:#a504b7;
  }
  
  .log-out {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 45px;
    width: 100px;
    align-content: center;
    padding: 10px 15px;
    background-color: #ff0800d7;
    color: rgba(250, 238, 238, 0.952);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  }
  
  
.fade-in-button {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  /* Otras propiedades de diseño de los botones (tamaño, color, bordes, etc.) */
}

.fade-in-button:hover {
  opacity: 0.7;
}
  @media (max-width: 768px) {
    /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */
  
    .logo {
      height:50px;
      width: 60px;
      border-radius: 5px;
    }
    .log-out {
    height: 35px;
    width: 100px;
    align-content: center;
    padding: 5px 5px;
    background-color: #a504b7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  }
  .user-email {
    color: gold;
    font-size: 16px;
  }
  .log-out-welcome p {
    margin: 0;
    font-size: 16px;
   
  }
  
  .nav-link {
    margin-left: 2rem;
    text-decoration: none;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 16px;
  
  }
  
  nav {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(46, 15, 250); 
  }
  
  }
</style>
