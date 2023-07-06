<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        TASKPRO
        <img src="../components/images/Task-Logo-fullcol-Copy.png" />
        {{ task.title }}
      </div>

      <div class="card-body">
        <h5 class="card-title">task incompleted</h5>
        <p class="card-text">{{ task.description }}</p>
        <div class="icons">
          <button
            @click="completeTask(task.id, task.title, task.description)"
            class="boton-complete"
          >
            Comp
          </button>
          <button @click="deleteTask" class="boton-delete">Delete</button>
          <button @click="UpdateToggle" class="boton-update">Edit</button>
        </div>
        <div>
          <form v-if="inputUpdate" class="update-form text-center">
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
            ></textarea>
            <button @click="updateTask" class="boton-save">
              Guardar New Edittask
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

const name = ref("");

const description = ref("");

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

// variable inputUpdate la utilizo en false para luego utilizarla en el dom para mantener ocultos los inputs para hacer un update
const inputUpdate = ref(false);

// funcion basica para hacer un toggle a traves de un boton @click para cambiar la variable inputUpdate de false a true y con esto dejar ver en el DOM dichos inputs y el boton para hacer el update
const UpdateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
};

// funcion que llama a funcion de la store task.js que se encarga de hacer una actualizacion de los datos de la tarea.
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
};
</script>

  <style scoped>
.flex {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

.input1 {
  height: 50px;
  width: 250px;
  margin-bottom: 10px;
  margin-top: 0px;
}
.input2 {
  width: 250px;
}
.completed-task {
  text-decoration: underline;
}
.update-form {
  margin-top: 100px;
}

.update-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.boton-save {
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.boton-save:hover {
  background-color: #45a049;
}
.container {
  margin-bottom: 35px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  justify-content: center;
}
.card-header {
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px 20px 0px 0px;
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 300px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #63e667;
}
.card-header img {
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  width: 50px;
}
.icons {
  display: flex;
  justify-content: space-around;
  /* margin-bottom: 15px; */
}
.boton-complete {
  height: 58px;
  width: 60px;
  background-color: #6000fad1;
  color: white;
  border: none;
  border-radius: 80%;
  cursor: pointer;
}
.boton-update {
  height: 58px;
  width: 60px;

  background-color: #fab700d1;
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;
}
.boton-delete {
  height: 58px;
  width: 60px;

  background-color: #ff3d3dd1;
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;
}
</style>
  
  <!--
  **Hints**
1. ref() o reactive() se pueden usar aquí para almacenar lo siguiente, piense si desea almacenarlos individualmente o
   como un objeto, depende de ti.
  
   2. Las propiedades de datos que se necesitan aquí son las siguientes: un valor booleano para almacenar una variable falsa**importante, una cadena para almacenar un error,
   una cadena para almacenar el valor de la tarea que el usuario puede editar, un booleano falso inicial para ocultar el campo de entrada utilizado para editar
   el nuevo detalle o detalles de la tarea [esto es en referencia al título de la tarea y la descripción de la tarea].
  
   3. Almacene los eventos de emisión personalizados que se usarán para llamar a las funciones de homeView para editar, eliminar y alternar el
   estado [completado, no completado] del elemento de tarea.
  
   4. Función para manejar el error con las propiedades de datos utilizadas para controlar el error y el booleano que controla el booleano
   variable vacía.
  
   5. Función para manejar el diálogo de edición donde se muestra el campo de entrada y la cadena utilizada para almacenar el valor del
   inputField se usará aquí para guardar el valor como accesorio en esta función.
  
   6. Función para emitir un evento personalizado emit() que toma 2 parámetros un nombre para el evento personalizado y el valor que será
   enviar a través de la propiedad al componente principal. Esta función puede controlar la finalización alternada de la tarea en la vista de inicio.
  
   7. Función para editar la información de la tarea que decidiste que el usuario puede editar. El cuerpo de esta función toma un condicional
   que primero verifica si el valor de la tarea [ya sea el título y la descripción o solo el título] está vacío y, si es verdadero, ejecuta el
   función utilizada para manejar el error en la sugerencia 4. De lo contrario, el condicional establece la primera propiedad de datos booleanos mencionada en la sugerencia2
   vuelva a su valor booleano inicial para ocultar el mensaje de error y repita lo mismo para la propiedad de datos mencionada en el cuarto lugar en la sugerencia 2;
   una constante que almacena un objeto que contiene el valor antiguo del elemento de utilería y el valor de la tarea que proviene de los datos
   propiedad mencionada en tercer lugar en la sugerencia 2; un evento personalizado emit() que toma 2 parámetros un nombre para el evento personalizado y el valor
   del objeto utilizado en esta parte del condicional y, por último, esta parte del condicional establece el valor del campo de entrada
   a una cadena vacía para borrarla de la interfaz de usuario.
  
   8. Función para emitir un evento personalizado emit() que toma 2 parámetros un nombre para el evento personalizado y el valor que será
   enviar a través de la propiedad al componente principal. Esta función puede controlar la eliminación de la tarea en la vista de inicio.
   -->