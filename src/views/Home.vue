<template>
  <div :class="{ 'modo-claro': modoClaro }">
  <div class="wrapper">
    <Nav :modo-claro="modoClaro" @cambiarModoClaro="alternarModoClaro" />
    <!-- <button @click="alternarModoClaro" class="modo-boton">
    <span v-if="!modoClaro">
      <img width="30" height="30" src="https://img.icons8.com/nolan/64/vaporwave.png" alt="vaporwave"/>
        </span>
        <span v-else>
          <img width="30" height="30" src="https://img.icons8.com/nolan/64/bright-moon.png" alt="bright-moon"/>
        </span> {{ modoClaro ? '' : '' }}</button> -->
    <NewTask />
    <div class="flex">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Footer from "../components/Footer.vue";


// ============Cambio de background en el home =======================

const modoClaro = ref(false);

const alternarModoClaro= () => {
  modoClaro.value = !modoClaro.value;
};

// =====================================================================


const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasksArr);
console.log("taskComputed:", tasks.value);

onMounted(async () => {
  await taskStore.fetchTasks();
  console.log("taskOnmouted:", tasks.value);
});


// const cambiarModoClaro = () => {
//   modoClaro.value = !modoClaro.value;
// };



</script>


<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}


.modo-claro{
  height:AUTO;
  width: 100%;
  background-size: cover;
  background-image: url("https://th.bing.com/th/id/R.eb7133b0843bfb621b2c71669eb11663?rik=1WOmWabtON9j4g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f5%2fb%2f6%2f935134-cool-bubble-backgrounds-1920x1280-for-mobile-hd.jpg&ehk=WyUDi6%2fpVqhRgRZxkeM5vq5bvGudbGx3d2e2pzF4Y4o%3d&risl=&pid=ImgRaw&r=0");
  background-repeat: no-repeat;
  background-position: center;
}

.modo-boton {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  margin-left: 5px ;
  padding: 5px 10px;
  background-color: #007bff26; /* Color de fondo del botón (modo claro) */
  color: #fff56400; /* Color de texto del botón (modo claro) */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modo-boton:hover {
  background-color: #0057b326; /* Nuevo color de fondo al pasar el mouse (modo claro) */
}

/* Estilos para el botón de cambiar el modo en modo oscuro */
.modo-claro .modo-boton {
  background-color: rgba(0, 149, 255, 0.279); /* Color de fondo del botón (modo oscuro) */
  color: #fff564; /* Color de texto del botón (modo oscuro) */
}

.modo-claro .modo-boton:hover {
  background-color: #297cf8; /* Nuevo color de fondo al pasar el mouse (modo oscuro) */
}

/* Estilos para los iconos (Font Awesome) */
.modo-boton i {
  font-size: 15px;
}
/* ========================================================== */
</style>