<template>
  
<div class="background-container">
  <Nav />
  <div class="account">
    <h1>Name: {{username}}</h1>
  <img :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">

</div>
  








</div>
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.avatar_url;
  }

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>

.account{
display: flex;
justify-content: center;
margin-top: 150px;
}



.background-container{
  height: 140vh;
  width: 100%;
  background-size: cover;
  background-image: url('https://images2.alphacoders.com/100/1008542.jpg');
  background-repeat: no-repeat; 
  background-position: center;

}  

img {
  width: 200px;
  border-radius: 50%;
}
</style>