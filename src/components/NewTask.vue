<template>
    <div class="add-task-form">
      <h2 class="header-title">Add a new Task</h2>
      <p class="subtitle">Keep your tasks in order, reach your goals: Act today!</p>
      <div>
        <p class="date"><strong>Today's date is{{ formattedDate }}</strong></p>
  </div>
      <div v-if="showErrorMessage">
        <p class="error-text">{{ errorMessage }}</p>
      </div>
      <div>
        <div class="input-field">
          <input type="text" placeholder="Add a Task Title - Listen to Snoop Dog" v-model="name">
        </div>
        <div class="input-field">
            <textarea placeholder="Add a Task Description - We are going to the concert next week" v-model="description" class="input-field"></textarea>
        </div>
        <button @click="addTask" class="button">Add</button>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';

import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constante para guardar una variable que contiene un valor booleano falso inicial para el contenedor de mensaje de error que se muestra condicionalmente dependiendo de si el campo de entrada está vacío
const showErrorMessage = ref(false);

//   constante para guardar una variable que contiene el valor del mensaje de error
const errorMessage = ref(null);




// Arrow function para crear tareas.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

}  else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
}
};


const currentDate = ref(new Date());

const updateCurrentDate = () => {
  currentDate.value = new Date();
};

onMounted(() => {
  updateCurrentDate();
  setInterval(updateCurrentDate, 24 * 60 * 60 * 1000); // Actualizar cada día (24 horas * 60 minutos * 60 segundos * 1000 milisegundos)
});

const formattedDate = ref('');

onMounted(() => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en', options);
  formattedDate.value = formatter.format(currentDate.value);
});
</script>

<style scooped >

.header-title{
  color:gold;
  text-align: center;
  margin-bottom: 20px;

  font-size: 70px;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}
.subtitle {
  color: white;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.date{
  color:gold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.add-task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 65vh;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 10px;
 
}

.input-field input {
  width: 400px;
}
.input-field textarea{
    width: 400px;
}
.button {
  width: 400px;
  padding: 10px 20px;
  background-color:#a504b7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


</style>
  