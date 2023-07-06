<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // aquí llamamos a buscar usuario
    if (!user.value) {
     // Redirigirlos a cerrar sesión si el usuario no está allí
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
     // continuar al tablero
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped>

body{

background-image: url("https://th.bing.com/th/id/OIP.h5-6IdZpk78O-yeOZ2e2WAAAAA?pid=ImgDet&rs=1");



}
</style>
