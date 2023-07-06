import { createApp } from "vue";
import { createPinia } from "pinia";
import Swal from "sweetalert2";
import App from "./App.vue";
import router from "./router";

import './assets/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);


// Configurar SweetAlert2 como una propiedad global de la aplicación
app.config.globalProperties.$swal = Swal;


app.mount("#app");
