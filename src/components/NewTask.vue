<template>
  <div class="add-task-form">
    <h2 class="header-title">Add a new Task</h2>

    <p class="subtitle">
      Keep your tasks in order, reach your goals: Act today!
    </p>
    <h3><router-link to="/reloj" class="link-clock">Clock</router-link></h3>
    <div>
      <p class="date">
        <strong>Today's date is {{ formattedDate }}</strong>
      </p>
    </div>
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>
    <div>
      <div class="input-field">
        <input
          type="text"
          placeholder="Add a Task Title - Listen to Snoop Dog"
          v-model="name"
        />
      </div>
      <div class="input-field">
        <textarea
          placeholder="Add a Task Description - We are going to the concert next week"
          v-model="description"
          class="input-field"
          style="max-height: 15rem"
        ></textarea>
      </div>
      <button @click="addTask" class="button fade-in-button">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valores de los inputs
const name = ref("");
const description = ref("");

// La referencia showErrorMessage se puede utilizar en el componente para realizar un seguimiento y controlar la visibilidad de un mensaje de error en la interfaz de usuario. Al cambiar el valor de showErrorMessage, se puede mostrar u ocultar el mensaje de error según sea necesario.
const showErrorMessage = ref(false);

// La referencia  errorMessage se puede utilizar en el componente para almacenar y mostrar mensajes de error en la interfaz de usuario. Al asignar un valor al errorMessage, se puede mostrar el mensaje de error correspondiente y actualizar dinámicamente en función de las acciones o eventos en el componente.
const errorMessage = ref(null);

// La referencia tasks se puede utilizar en el componente para almacenar y manipular una lista de tareas. Al modificar el contenido del array asignado a tasks, se puede realizar un seguimiento de los cambios y actualizar la interfaz de usuario de forma reactiva.
const tasks = ref([]);

// Arrow function para crear tareas.
const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 3000);
  } else {
    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
  }
};

//Variables y funciones para inyectar la fecha en el dom

const currentDate = ref(new Date());

const updateCurrentDate = () => {
  currentDate.value = new Date();
};

onMounted(() => {
  updateCurrentDate();
  setInterval(updateCurrentDate, 24 * 60 * 60 * 1000); // Actualizar cada día (24 horas * 60 minutos * 60 segundos * 1000 milisegundos)
});

const formattedDate = ref("");

onMounted(() => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("en", options);
  formattedDate.value = formatter.format(currentDate.value);
});
</script>

<style scooped >

.fade-in-button {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.fade-in-button:hover {
  opacity: 0.7;
}
.link-clock {
  text-decoration: none;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
.error-text {
  display: flex;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  color: white;
  background-color: red;
  border-radius: 15px;
}

.header-title {
  color: rgba(255, 217, 0, 0.952);
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 20px;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-size: 75px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.subtitle {
  color: white;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.date {
  color: gold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.add-task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 10px;
}

.input-field input {
  width: 500px;
  height: 45px;
  border-radius: 5px;
  padding: 10px 10px;
}
.input-field textarea {
  padding: 10px 10px;
  height: 55px;
  width: 500px;
  border-radius: 5px;
}
.button {
  width: 500px;
  padding: 10px 20px;
  background-color: #a504b7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* =======================MEDIA QUERIES==================================== */
@media (max-width: 768px) {
  /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */

  .header-title {
    margin-top: 3rem;
    color: gold;
    text-align: center;
    font-size: 55px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }

  .button {
    margin-left: 10px;
    width: 280px;
    background-color: #a504b7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .input-field textarea {
    padding: 10px 10px;
    height: 55px;
    width: 280px;
    border-radius: 5px;

    margin-left: 10px;
  }

  .subtitle {
    color: white;
    text-align: center;
    margin-bottom: 10px;
    font-size: 18px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  .date {
    color: gold;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .add-task-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .input-field {
    margin-bottom: 10px;
  }

  .input-field input {
    width: 280px;
    height: 45px;
    border-radius: 5px;
    padding: 10px 10px;
    margin-left: 10px;
  }
}
</style>
  