<template>
  <div class="background-container">
    <Nav />
    <div class="container-account">
      <div class="data">
        <br />
        <h1 class="titulo-data-perfil">Your profile</h1>
        <h3>Name: {{ username }}</h3>
        <h3>
          Website: <a target="_blank" :href="website">{{ website }}</a>
        </h3>
        <h3>Location: {{ location }}</h3>
        <h3>Byography: {{ bio }}</h3>
      </div>
      <Profile @updateProfileEmit="hundleUpdateProfile" />
      <div>
        <img :src="avatar_url" v-if="avatar_url" alt="Profile picture" class="imagen-avatar"/>
        <h3 class="titulo-AVATAR-perfil">Select your avatar</h3>
        <br />
        <br />
        <input @change="fileManager" type="file" class="boton-select-file" />
        <button @click="uploadFile" class="boton-upload-file">
          Upload File
        </button>
      </div>
    </div>
    <br />
    <!-- <Footer class="footer2" /> -->
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";
// import Footer from "../components/Footer.vue";

// ================= AVATAR URL =======================================

const file = ref();
const fileUrl = ref();


const fileManager = (event) => {
  file.value = event.target.files[0];

};

const hundleUpdateProfile = (updatedProfileData) => {
  username.value = updatedProfileData.full_name;
  website.value = updatedProfileData.website;
  location.value = updatedProfileData.location;
  bio.value = updatedProfileData.bio;
  avatar_url.value = updatedProfileData.avatar_url;
};

const uploadFile = async () => {
  if (!file.value) return;
  
  const { data } = await supabase
        .from('profiles')
        .select("avatar_url")
        .eq("user_id", supabase.auth.user().id);

  const deleteUrl = data[0].avatar_url
  const { error: urlDeleteError } = await supabase.storage
    .from("profile-img")
    .remove([deleteUrl]);

  if (urlDeleteError) {
    console.error("Error deleting file:", urlDeleteError);
    return;
  }
  console.log("File succesfully upload.");



 const timestamp = Date.now();
  const filePath = `profiles/${timestamp}-${file.value.name}`;
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return;
  }
  console.log("File succesfully upload.");

  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);
  console.log(urlData);
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  fileUrl.value = urlData.publicURL;
  console.log(fileUrl.value);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value })
    .eq("user_id", supabase.auth.user().id);

  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;
  }
  console.log("Profile successfully updated.");

  await userStore.fetchUser();
};

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const location = ref(null);
const bio = ref(null);

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
  location.value = userStore.profile.location;
  bio.value = userStore.profile.bio;
  avatar_url.value = userStore.profile.avatar_url;
}

watch(
  () => userStore.profile,
  (updatedProfileData) => {
    avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }
);

onMounted(() => {
  getProfile();
});

// =====================================================================
</script>

<style scoped>
/* .footer2 {
  position: inherit;
  margin-top: 55vh; 
} */

.imagen-avatar{
margin-bottom: 10px;
float: inline-end;
}
.container-account {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-top: 20vh;
}
.data {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: rgb(255, 255, 255);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-shadow: 2px 2px 4px rgba(107, 243, 191, 0.4);
}

.titulo-data-perfil {
  color: rgb(255, 255, 255);
  font-size: 48px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-shadow: 2px 2px 4px rgba(107, 243, 191, 0.4);
}
.titulo-AVATAR-perfil {
  color: rgb(255, 255, 255);
  font-size: 48px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-shadow: 2px 2px 4px rgba(107, 243, 191, 0.4);
}

.boton-upload-file {
  padding: 10px 20px;
  background-color:    gold;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.background-container {
  height: 115vh;
  width: 100%;
  background-size: cover;
  background-image: url("https://images2.alphacoders.com/100/1008542.jpg");
  background-repeat: no-repeat;
  background-position: center;
}

img {
  width: 200px;
  border-radius: 50%;
}

/* ==========MEDIA QUERIES========================================= */
@media (max-width: 768px) {
  /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */

  .container-account {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 5vh;
  }
  .data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: gold;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: 2px 2px 4px rgba(107, 243, 191, 0.4);
    margin-bottom: 50px;
  }

  .titulo-data-perfil {
    color: rgb(0, 132, 255);
    font-size: 48px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: 2px 2px 4px rgba(107, 243, 191, 0.4);
  }
  .titulo-AVATAR-perfil {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: rgb(0, 132, 255);
    font-size: 42px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: 2px 2px 4px rgba(107, 243, 191, 0.4);
    margin-top: 25px;
  }

  .background-container {
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-image: url("https://images2.alphacoders.com/100/1008542.jpg");
    background-repeat: no-repeat;
    background-position: center;
  }

  img {
    width: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>