<template>
  <div class="text-center">
    <div class="row g-3">
      <div class="col">
  
         <button
          @click="editToggleProfile"
          class="boton-edit-profile fade-in-button"
        >
          Edit Profile
        </button> 

        <form v-if="inputUpdate" class="col g-3 form" action="">
          <div class="col-md-12">
            <!-- <label for="">Full name</label> -->
            <br />
            <input
              v-model="profile.full_name"
              placeholder="Full name"
              type="text"
              class="form-control"
            />
          </div>
          <br />
          <!-- <label for="">Website</label> -->
          <div class="col-md-12">
            <input
              v-model="profile.website"
              placeholder="Website"
              type="text"
              class="form-control"
            />
          </div>
          <br />
          <!-- <label for="">Biography</label> -->
          <div class="col-md-12">
            <textarea
              rows="10"
              cols="50"
              v-model="profile.bio"
              placeholder="Biography"
              type="text-area"
              class="form-control"
            ></textarea>
          </div>
          <br />
          <!-- <label for="">Location</label> -->
          <div class="col-md-12">
            <input
              v-model="profile.location"
              placeholder="Location"
              type="text"
              class="form-control"
            />
          </div>

          <br />
          <button
            type="button"
            @click="updateProfile"
            class="boton-actualizar-perfil fade-in-button"
          >
            Update profile
          </button>
        </form>
      </div>
    </div>
  </div>
 
</template>
  
<script setup>
import { ref,  onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

// defineEmits se utiliza para definir los eventos que puede emitir el componente.
const emit = defineEmits(["updateProfileEmit"]);

// Utilizamos la función defineProps para definir las propiedades del componente
const props = defineProps({
  profile: {
    type: Object,
  },
  inputUpdate: {
    type: Boolean,
  },
});

// Esta línea declara una variable llamada userStore y la inicializa con el resultado de la función useUserStore(). Probablemente, useUserStore() es una función que devuelve una instancia del almacén de usuarios utilizado en este código.
const userStore = useUserStore();

// Aquí se declara una variable llamada inputUpdate y se inicializa con un valor booleano false. La función ref() se utiliza para crear una referencia reactiva en Vue.js, lo que significa que su valor puede cambiar y se reflejará automáticamente en el componente que la utiliza.
const inputUpdate = ref(false);

// Se declara una función llamada editToggleProfile que se utiliza para cambiar el valor de inputUpdate. Cuando se llama a esta función, el valor de inputUpdate se invierte, es decir, si era true, se convierte en false, y viceversa.
const editToggleProfile = () => {
  inputUpdate.value = !inputUpdate.value;
};

// Aquí se declara una variable llamada profile y se inicializa con un valor computado. Un valor computado es un valor que se calcula en función de uno o más valores reactivos. En este caso, el valor computado se basa en userStore.profile. Si userStore.profile existe, se asigna a profile, de lo contrario, se asigna un objeto vacío {}.
const profile = computed(() => (userStore.profile ? userStore.profile : {}));

// Aquí se declara una función asíncrona llamada updateProfile, que se utiliza para actualizar el perfil del usuario. Comienza creando un objeto updatedProfile que contiene los campos a actualizar del perfil.
// Luego, se registra el perfil actualizado en la tabla "profiles" utilizando Supabase.
const updateProfile = async () => {
  const updatedProfileData = {
    full_name: profile.value.full_name,
    bio: profile.value.bio,
    location: profile.value.location,
    website: profile.value.website,
  };
  console.log(updatedProfileData);
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    // La condición .eq("user_id", supabase.auth.user().id) indica que se debe actualizar el perfil del usuario actualmente autenticado.
    .eq("user_id", supabase.auth.user().id);
  // Después de actualizar el perfil, se llama a editToggleProfile() para invertir el valor de inputUpdate, lo que probablemente ocultará o mostrará un formulario de edición de perfil en la interfaz de usuario.
  editToggleProfile();
  // Si hay un error durante la actualización, se muestra un mensaje de error en la consola. De lo contrario, se muestra un mensaje de éxito en la consola.
  if (error) {
    console.error(error);
  } else {
    console.log("Perfil actualizado correctamente");
    emit("updateProfileEmit", updatedProfileData);
  }
};
// Aquí se utiliza el hook onMounted de Vue.js para ejecutar una función asíncrona cuando el componente se monta en el DOM. Dentro de la función, se llama a userStore.fetchUser() para recuperar los datos del usuario. Es posible que fetchUser() sea un método del almacén de usuarios que realiza una solicitud para obtener los datos del usuario actual.
onMounted(async () => {
  await userStore.fetchUser();
});
</script>
  
  <style scoped>
.fade-in-button {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.fade-in-button:hover {
  opacity: 0.7;
}
.boton-actualizar-perfil {
  padding: 10px 20px;
  background-color: rgba(255, 217, 0, 0.675);
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.text-center {
  display: flex;
  justify-content: center;
}

.boton-edit-profile {
  padding: 10px 20px;
  background-color: rgba(255, 217, 0, 0.763);
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  margin-bottom: 0.8rem;
}

.form {
  padding: 15px;
  background-color: #00000086;
  border-radius: 15px;
}
/* ==========MEDIA QUERIES========================================= */
@media (max-width: 768px) {
  /* Estilos que se aplican cuando el ancho de la pantalla es menor o igual a 768px */

  .boton-actualizar-perfil {
    padding: 10px 20px;
    background-color: gold;
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }

  .text-center {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .boton-edit-profile {
    padding: 10px 20px;
    background-color: gold;
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
}
</style>