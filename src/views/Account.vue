<template>
  
    <div class="background-container">
    <Nav />
    <div class="avatarProfile">
    <img 
      :src="
        avatar_url
          ? avatar_url
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
      "
      alt="Profile picture"
    />
  </div>
    <div>
      <h2>Nombre de usuario: {{ username }}</h2>
      <h2>Nombre completo: {{ name }}</h2>
      <!-- <h2>Website: {{ website }}</h2> -->
    </div>
    <button class="avatarProfile" @click.prevent="editProfileButton">Edit your profile</button>

    <form class="form-widget" @submit.prevent="updateProfile">
    <!-- Add to body -->
    <!-- <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" /> -->

    <!-- Other form elements -->
  </form>
   
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