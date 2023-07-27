<template>
  <div class="flex-container">
    <div class="card" draggable="true">
      <div :class="['card-header', { completed: task.is_complete }]">
        <img width="60" height="60" src="https://img.icons8.com/arcade/64/property-with-timer.png" alt="property-with-timer" class="imagen-titulo-card "/>
        <!-- <img
          src=".//images/Task-Logo-fullcol-Copy.png"
          class="imagen-titulo-card"
        /> -->
        <span :class="['title', { completed: task.is_complete }]">{{
          task.title
        }}</span>
      </div>
      <div class="card-body">
        <h5 :class="['card-title', { completed: task.is_complete }]">
          {{ task.is_complete ? "Task completed" : "Task incompleted" }}
        </h5>
        <p class="card-text" :class="{ completed: task.is_complete }">
          {{ task.description }}
        </p>
        <div class="icons">
          <button
            :class="['boton-complete', { completed: task.is_complete }]"
            @click="toggleComplete"
          >
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
          <form
            v-if="inputUpdate && task.id === selectedTaskId"
            class="update-form text-center"
          >
            <input
              type="text"
              v-model="name"
              class="input1"
              placeholder="New Title"
            />
            <textarea
              type="text"
              v-model="description"
              class="input2"
              placeholder="New Description"
            >
            </textarea>
            <button @click="updateTask" class="boton-save">Update task</button>
            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ===================== COMIENZA EL SCRIPT ================================= -->

<script setup>
import { ref, defineProps } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();
const name = ref("");
const description = ref("");
const props = defineProps({
  task: Object,
});
const selectedTaskId = ref(null);
// const tasks = ref([]);

// Este código define una función asincrónica deleteTask que utiliza taskStore para eliminar una tarea específica mediante su ID. El uso de await asegura que la función asincrónica espere a que se complete la operación de eliminación antes de continuar con el resto del código.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

// Esta línea de código crea una referencia reactiva llamada inputUpdate con un valor inicial de false. Esta referencia se puede utilizar para realizar un seguimiento del estado de actualización de un input en una aplicación y activar o desactivar ciertas funcionalidades o comportamientos según el valor de inputUpdate.
const inputUpdate = ref(false);

// Esta función UpdateToggle se utiliza para cambiar el valor de la referencia reactiva inputUpdate y asignar el ID de la tarea a la referencia reactiva selectedTaskId.
const UpdateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
  selectedTaskId.value = props.task.id;
};

// Esta función updateTask se utiliza para actualizar una tarea en taskStore con los nuevos valores del nombre y la descripción. Luego, se restablecen los valores del nombre y la descripción a cadenas vacías, y se llama a UpdateToggle para realizar alguna acción adicional relacionada con la actualización de la tarea.
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
  UpdateToggle();
};

// Esta función toggleComplete se utiliza para alternar el estado de completitud de una tarea entre completa e incompleta. Actualiza el valor de la propiedad is_complete de la tarea en props y luego llama a taskStore.completeTask() para reflejar ese cambio en taskStore.
const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};
</script>


<!-- ================= STYLES TASKITEM ======================================= -->


  <style scoped>
.card-header.completed .title {
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.card-header {
  border-radius: 20px 20px 0px 0px;
  background-color: gold;
}

.imagen-titulo-card {
  margin-right: 0.5rem;
  height: 40px;
  width: 40px;
  transition: transform 0.3s;
}

.imagen-titulo-card:hover {
  transform: scale(1.2);
}

.card-text.completed {
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

/* ==============prueba drag and drop===================== */

/* .empty{

display: inline-block;

width:320px;
margin: 10px;
border: 3px black;
background-color: white; 

}
.hold{
border: solid #fc0000 4px;

}
.hovered{
 background: #e40000;
 border-style:dashed;


}
.invisible{
    display: none;
}  */
.card {
  position: relative;
  /* justify-content: space-around; */
  width: 300px;
  border-radius: 20px;
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
  
