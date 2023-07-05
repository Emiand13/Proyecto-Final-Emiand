<template>
  <div>
    <Nav/>
    <!-- <h1>Your account:</h1>
    <router-link to="/account">Account</router-link> -->
   
    <NewTask @add-task="handleAddTask" />
  
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </div>

</template>

<script setup>
import { ref, onUpdated } from 'vue';
import { useTaskStore } from '../stores/task';
import { useRouter } from 'vue-router';
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';

// Utilizamos useTaskStore para obtener la instancia de la tienda de tareas.
const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);


// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async() => {
  tasks.value = await taskStore.fetchTasks();
};
getTasks();
onUpdated(async () => {
   await getTasks();
})
</script>
