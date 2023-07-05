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
        <button @click="deleteTask" class="boton-delete">Delete</button>
        <button @click="updateTask" class="boton-delete">Update</button>
        <button @click="editTask" class="boton-delete">EditTask</button>
      </div>
      </div>
    </div>
</template>
  
  <script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

const props = defineProps({
task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
await taskStore.deleteTask(props.task.id);
};

onUpdated(() => {
taskStore.fetchTasks();
});
</script>
  
  <style scoped>
.container{
display: flex;
justify-content: space-around;
flex-direction: column;
}

.card {
width: 300px;
}
.card-header img {
height: 50px;
width: 50px;
}

.boton-delete {
width: 80px;
padding: 10px 15px;
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