<template>
    <div class="background-container"> 
   
    <div class="wrapper">
     <Nav />
    

      <div class="content">
        <!-- <h3>Your account:</h3>
      <router-link to="/account">Account</router-link> -->
      </div>
      <NewTask />

      <div class="flex">
        <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
    <Footer/>
  </div> 



</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
 import Footer from "../components/Footer.vue"





const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasksArr);
console.log("taskComputed:", tasks.value);

onMounted(async () => {
  await taskStore.fetchTasks();
  console.log("taskOnmouted:", tasks.value);
});







</script>


<style scoped>
 .flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap:25px
}

.background-container {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-image: url("https://images2.alphacoders.com/100/1008542.jpg");
  background-repeat: no-repeat;
  background-position: center;
}

body {
    background-color: white;
    color: black;
}

body.dark-mode {
    background-color: #1a1a1a;
    color: white;
}

</style>

