<template>
    <div class="add-task-form">
      <h1>Add a new Task</h1>
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

import { ref, } from "vue";
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


</script>

<style scooped >
.add-task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
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
  background-color: #63E667;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


</style>
  