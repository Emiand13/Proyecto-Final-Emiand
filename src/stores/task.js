import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";
import Swal from "sweetalert2";

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API
  const tasksArr = ref([]);

  // Consegir tareas de supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    console.log(tasksArr.value);
  };

  // Añadir tarea a supabase
  const addTask = async (title, description) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
    await fetchTasks();
  };

  // Borrar tarea de supabase
  const deleteTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, error } = await supabase.from("tasks").delete().match({
          id: id,
        });
        await fetchTasks();

        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  // Actualizar tarea en supabase
  const updateTask = async (id, title, description) => {
    const { data, error } = await supabase
      .from("tasks")
      .update([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ])
      .eq("id", id);
    await fetchTasks();
  };

  // Completar tarea en supabase
  const completeTask = async (id, booleanValue) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: booleanValue })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    } 
      await fetchTasks();
    }
  return {
    tasksArr,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
    completeTask,
  };
});

