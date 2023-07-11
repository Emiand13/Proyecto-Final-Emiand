<template>
  <div class="flex-container">
    <div class="card">
      <div :class="['card-header', { completed: task.is_complete }]">
        <!-- <img src="../components/images/imagenNueva2.png" class="image" /> -->
     <span :class="['title', { completed: task.is_complete }]">{{
          task.title
        }}</span>
      </div>

      <div class="card-body">
        <h5 :class="['card-title', { completed: task.is_complete }]">
          {{ task.is_complete ? "Task completed" : "Task incompleted" }}
        </h5>
        <p class="card-text" :class="{ completed: task.is_complete }">{{ task.description }}</p>
        <div class="icons">
          <button
            :class="['boton-complete', { completed: task.is_complete }]"
            @click="toggleComplete">
            <i class="fas fa-check fa-2x"></i>
            {{ task.is_complete ? "" : "" }}
          </button>
          <button @click="deleteTask" class="boton-delete">
            <i class="fas fa-trash fa-2x"></i>
          </button>
          <button @click="UpdateToggle" class="boton-update">
            <i class="fas fa-edit fa-2x"></i>
          </button>
        </div>
        <div>
          <form v-if="inputUpdate && task.id === selectedTaskId" class="update-form text-center">
            <input
              type="text"
              v-model="name"
              class="input1"
              placeholder="New Title"/>
            <textarea
              type="text"
              v-model="description"
              class="input2"
              placeholder="New Description">
            </textarea>
            <button @click="updateTask" class="boton-save">
              Update task
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<!-- ===================== COMIENZA EL SCRIPT ================================= -->

<script setup>
import { ref, onUpdated, defineProps } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();
const name = ref("");
const description = ref("");
const props = defineProps({
  task: Object,
});
const selectedTaskId = ref(null);
const tasks = ref([
  // Aquí van tus tareas existentes
]);

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

// variable inputUpdate la utilizo en false para luego utilizarla en el dom para mantener ocultos los inputs para hacer un update
const inputUpdate = ref(false);

// funcion basica para hacer un toggle a traves de un boton @click para cambiar la variable inputUpdate de false a true y con esto dejar ver en el DOM dichos inputs y el boton para hacer el update
const UpdateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
  selectedTaskId.value = props.task.id;

};

// funcion que llama a funcion de la store task.js que se encarga de hacer una actualizacion de los datos de la tarea.
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
  UpdateToggle();
};

const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};
</script>

  <style scoped>
 .card-header.completed .title{
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} 

.card-text.completed{
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.boton-complete.completed {
  background-color: green;
}

.input1 {
  height: 30px;
  width: 250px;
  margin-bottom: 10px;
  margin-top: 0px;
}
.input2 {
  width: 250px;
  margin-bottom: 15px;
}

.update-form {
  margin-top: 30px;
}

.update-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid gold;
  border-radius: 4px;
}

.boton-save {
  background-color: #a504b7;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.boton-save:hover {
  background-color: #cb53d8;
}
.flex-container {
  overflow: hidden;
  margin-bottom: 35px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: center;
}
.card-header {
   white-space: wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  gap: 10px;
  align-items: center;
  justify-content: start;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px 20px 0px 0px;
  background-color: gold;

}
.card {
  justify-content: space-around;
  width: 300px;
  border-radius: 20px;
  /* box-shadow: 2px 2px 2px 2px gold; */
  background-color: rgba(255, 255, 255, 0.6);
}
.icons {
  display: flex;
  justify-content: space-around;
}

.boton-complete {
  text-decoration: underline;
  height: 58px;
  width: 60px;
  padding: 17px 15px 10px 15px;
  background-color: #a504b7;
  color: white;
  border: none;
  border-radius: 80%;
  cursor: pointer;
}
.boton-update {
  height: 58px;
  width: 60px;
  padding: 10px 10px 10px 15px;
  background-color: gold;
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;
}
.boton-delete {
  height: 58px;
  width: 60px;
  padding: 10px 10px 10px 10px;
  background-color: #ff0000d1;
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;
}





@media (max-width: 768px) {
  /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */

}
</style>
  
