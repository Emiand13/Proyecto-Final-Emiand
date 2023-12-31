<template>
  <div :class="{ 'modo-claro': modoClaro }">
    <Nav :modoClaro="modoClaro" @cambiarModoClaro="handleCambiarModoClaro" />

    <!-- ============================= LOADING ==================================== -->
    <div
      v-if="loading"
      class="container d-flex justify-content-center align-items-center mb-5 gap-15 flex-column"
      style="height: 460px"
    >
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- =============================================================================== -->
    <div class="container-account text-center" v-else>
      <div class="data">
        <!-- ==================== TITULO PERFIL USUARIO=================================== -->
        <h1 class="titulo-data-perfil">Your Profile</h1>
        <div class="datos">
          <h4>
            <!-- ================== NOMBRE USUARIO + IMAGEN =============================== -->
            <img
                width="64"
                height="64"
                src="https://img.icons8.com/arcade/64/name.png"
                alt="name"
              />
            <p class="image-name">

              {{ username }}
            </p>
          </h4>
          <h4>
            <!-- =============== WEBSITE USUARIO + IMAGEN =================================== -->
            <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/arcade/64/internet.png"
                  alt="internet"
                />
            <p>
              <a target="_blank" :href="website" class="link-website"
                >
                {{ website }}</a
              >
            </p>
          </h4>

          <h4>
            <!-- ================ BIO USUARIO + IMAGEN ============================================== -->
            <img
                width="64"
                height="64"
                src="https://img.icons8.com/arcade/64/book.png"
                alt="book"
              />
            <p>

              {{ bio }}
            </p>
          </h4>
          <h4>
            <!-- ====================== LOCATION USUARIO + IMAGEN ====================================== -->
            <img
                width="64"
                height="64"
                src="https://img.icons8.com/arcade/64/user-location.png"
                alt="user-location"
              />
            <p>
             {{ location }}
            </p>
          </h4>
       

          <!-- =========================================== -->
        </div>
      </div>

      <Profile @updateProfileEmit="hundleUpdateProfile" />
    <div class="background">
      <h3 class="titulo-AVATAR-perfil">Select your avatar</h3>
      <div class="select-avatar">

        <img
          :src="avatar_url"
          v-if="avatar_url"
          alt="Profile picture"
          class="imagen-avatar"
        />

        <!-- <img src="../components/images/th.jpg" class="img-avatar-default">  -->
       
      </div>
      <input
          @change="fileManager"
          type="file"
          class="boton-select-file fade-in-button"
        />
        <button @click="uploadFile" class="boton-upload-file fade-in-button">
          Upload File
        </button>
    </div>
  </div>
    <br />
  </div>
  <Footer />
</template>

<script setup>
import { supabase } from "../supabase";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";
import Footer from "../components/Footer.vue";

// =======MODO CLARO=======================================
const modoClaro = ref(false);

// Método para manejar el evento cambiarModoClaro emitido desde Nav.vue
const handleCambiarModoClaro = () => {
  // Lógica para cambiar el modo claro en el componente padre (About.vue)
  modoClaro.value = !modoClaro.value;
};

// ========================================================

const userStore = useUserStore();

const file = ref();
const fileUrl = ref();
// const loading = ref(true);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const location = ref(null);
const bio = ref(null);

// Esta función permite capturar el archivo seleccionado por el usuario y almacenarlo en la referencia file.value para su posterior procesamiento, como en el caso de cargar el archivo en un servicio de almacenamiento en la nube.
const fileManager = (event) => {
  file.value = event.target.files[0];
};

// Esta función se encarga de asignar los valores actualizados del perfil del usuario a las referencias correspondientes.
const hundleUpdateProfile = (updatedProfileData) => {
  username.value = updatedProfileData.full_name;
  website.value = updatedProfileData.website;
  location.value = updatedProfileData.location;
  bio.value = updatedProfileData.bio;


  //Alerta cuando editas perfil de usuario diciendote que los cambios se han guardado
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your changes have been saved.",
    showConfirmButton: false,
    timer: 1600,
  });
  // avatar_url.value = updatedProfileData.avatar_url;
  //Esto es lo que hace que cuando edites la imagen tambien haga el update profile de todo
};

// Esta verificación condicional al comienzo de la función uploadFile garantiza que no se realice la carga del archivo si no hay ningún archivo seleccionado
const uploadFile = async () => {
  if (!file.value) return;

  // Este fragmento de código realiza una consulta a la tabla "profiles" en la base de datos utilizando supabase, para obtener la URL del avatar del usuario actualmente autenticado. Los resultados de la consulta se almacenan en la variable data.
  const { data } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", supabase.auth.user().id);

  // Esta línea de código extrae la URL del avatar del primer elemento de los resultados de la consulta y la asigna a la variable deleteUrl para su posterior uso.
  const deleteUrl = data[0].avatar_url;

  // Este bloque de código se encarga de eliminar un archivo en el almacenamiento utilizando supabase.storage. Si se produce algún error durante la eliminación, se muestra un mensaje de error. Si la eliminación es exitosa, se muestra un mensaje de éxito en la consola.
  const { error: urlDeleteError } = await supabase.storage
    .from("profile-img")
    .remove([deleteUrl]);

  if (urlDeleteError) {
    console.error("Error deleting file:", urlDeleteError);
    return;
  }
  // console.log("File succesfully upload.");

  // Esta línea de código se utiliza para obtener la marca de tiempo actual en milisegundos y almacenarla en la variable timestamp.
  const timestamp = Date.now();

  // Esta línea de código construye una ruta de archivo combinando el directorio "profiles", la marca de tiempo actual y el nombre del archivo seleccionado
  const filePath = `profiles/${timestamp}-${file.value.name}`;

  // Este bloque de código se encarga de cargar un archivo en el almacenamiento utilizando supabase.storage.
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);
  // Si se produce algún error durante la carga, se muestra un mensaje de error
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return;
  }
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your file has been saved",
    showConfirmButton: false,
    timer: 1600,
  });
  // Si la carga es exitosa, se muestra un mensaje de éxito en la consola.
  // console.log("File succesfully upload.");

  // Este bloque de código se utiliza para obtener la URL pública de un archivo en el almacenamiento utilizando supabase.storage
  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);
  // Si se produce algún error al obtener la URL, se muestra un mensaje de error.
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  // Este bloque de código asigna la URL pública obtenida a la referencia fileUrl.value y la imprime en la consola para verificar su valor.
  fileUrl.value = urlData.publicURL;
  // console.log(fileUrl.value);

  // Este bloque de código actualiza el perfil del usuario en la tabla "profiles" con la nueva URL del avatar.
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value })
    .eq("user_id", supabase.auth.user().id);

  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;
  }
  // console.log("Profile successfully updated.");

  // Luego, se actualizan los datos del perfil del usuario en el almacén utilizando userStore.fetchUser().
  await userStore.fetchUser();
};

// Esta función asincrónica se utiliza para obtener los datos del perfil del usuario y asignarlos a las referencias correspondientes. Esto permite actualizar los valores en la interfaz de usuario para reflejar los datos del perfil actualizados obtenidos de algún origen de datos.
async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
  bio.value = userStore.profile.bio;
  location.value = userStore.profile.location;
  avatar_url.value = userStore.profile.avatar_url;
  // loading.value = false;

  // Este setTimeout esta puesto por ESTETICA porque hay pocos datos que traer de SUPABASE en caso de haber mas datos usariamos loading.value = false; como esta justo arriba comentado
  // setTimeout(() => {
  //   loading.value = false;
  // }, 1200);
}

// Esta parte del código establece una observación en la propiedad userStore.profile y, cada vez que cambie, asigna el valor de updatedProfileData.avatar_url a avatar_url.value. Esto permite mantener actualizada la referencia avatar_url con el valor más reciente de la URL del avatar del perfil.
watch(
  () => userStore.profile,
  (updatedProfileData) => {
    avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }
);

// Este bloque de código utiliza onMounted para ejecutar getProfile() cuando el componente se monte por primera vez. Esto asegura que los datos del perfil se obtengan y asignen inicialmente para su uso en el componente o vista.
onMounted(() => {
  getProfile();
});

// =====================================================================
</script>

<style scoped>
/* ==================== imagen datos del perfil ====================== */
.datos img {
  width: 64px;
  height: 64px;
}

/* ==================== LOADING ===================== */
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: rgb(255, 238, 0);
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* ================================================================= */
.datos {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  padding: 15px 20px 15px 20px;
  background-color: rgba(190, 190, 190, 0.49);
  border-radius: 15px;
  height: AUTO;
  width: 470px;
  margin-bottom: 2rem;

}

.background{
  padding: 15px;
  background-color: #00000086;
  border-radius: 15px;
}
.select-avatar {
  padding: 15px;
  background-color: rgba(190, 190, 190, 0.49);
  border-radius: 15px;
}

/* =================== FILE SELECTED  ============================ */
img {
  height: 200px;
  width: 200px;
  border-radius: 15px;
}
.imagen-avatar {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-bottom: 2rem;
  float: inline-end;
  max-height: 250px;
  max-width: 200px;
}
/* =============================================================== */
.container-account {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.link-website {
  color: blue;
  text-decoration: none;
}
.data {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  color: rgb(255, 255, 255);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  background-color: #00000086;
  padding: 15px 15px 15px 15px;
  border-radius: 15px;
  width: 500px;
  height: auto;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
    margin-top: 1.5rem;
    
}
.datos a {
  color: white;
}

.titulo-data-perfil {
  margin-top: 1rem;
  color: rgb(255, 255, 255);
  font-size: 48px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.4), 1px -1px 0 rgba(0, 0, 0, 0.4),
    -1px 10px 0 rgba(0, 0, 0, 0.4), 1px 10px 0 rgba(0, 0, 0, 0.4);
}
.titulo-AVATAR-perfil {
  color: rgb(255, 255, 255);
  font-size: 48px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.4), 1px -1px 0 rgba(0, 0, 0, 0.4),
    -1px 10px 0 rgba(0, 0, 0, 0.4), 1px 10px 0 rgba(0, 0, 0, 0.4);
    margin-bottom: 1rem;
}

.boton-select-file {
  padding: 8px 15px;
  background-color: rgba(251, 0, 255, 0.49);
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  margin-right: 25px;
  margin-top: 1rem;
}
.boton-upload-file {
  padding: 10px 20px;
  background-color: rgba(255, 217, 0, 0.675);
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.modo-claro {
  height: AUTO;
  width: 100%;
  background-size: cover;
  background-image: url("https://th.bing.com/th/id/R.eb7133b0843bfb621b2c71669eb11663?rik=1WOmWabtON9j4g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f5%2fb%2f6%2f935134-cool-bubble-backgrounds-1920x1280-for-mobile-hd.jpg&ehk=WyUDi6%2fpVqhRgRZxkeM5vq5bvGudbGx3d2e2pzF4Y4o%3d&risl=&pid=ImgRaw&r=0");
  background-repeat: no-repeat;
  background-position: center;
}

/* ==========MEDIA QUERIES========================================= */
@media (max-width: 765px) {
  /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */

  .datos img {
  width: 64px;
  height: 64px;
  margin-left: 130px;
}
  .select-avatar {
    margin-top: 1rem;
    padding: 15px;
    background-color: #00000086;
    border-radius: 15px;
  }

  .imagen-avatar {
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    margin-left: 115px;
  }
  .container-account {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 5vh;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    margin-bottom: 50px;
    color: rgb(255, 255, 255);
    width: 360px;
  }

  .titulo-data-perfil {
    color: rgb(255, 255, 255);
    font-size: 40px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.4), 1px -1px 0 rgba(0, 0, 0, 0.4),
      -1px 10px 0 rgba(0, 0, 0, 0.4), 1px 10px 0 rgba(0, 0, 0, 0.4);
  }

  .titulo-AVATAR-perfil {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 40px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.4), 1px -1px 0 rgba(0, 0, 0, 0.4),
      -1px 10px 0 rgba(0, 0, 0, 0.4), 1px 10px 0 rgba(0, 0, 0, 0.4);
    margin-top: 25px;
  }

  img {
    width: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .boton-upload-file {
    padding: 10px 20px;
    background-color: rgba(255, 217, 0, 0.675);
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-left: 8rem;
  }

  .datos {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  padding: 10px;
  background-color: rgba(190, 190, 190, 0.49);
  border-radius: 15px;
  height: AUTO;
  width: 350px;

}

  .datos a {
    color: white;
  }
}
</style>