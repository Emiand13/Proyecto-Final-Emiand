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

const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');


//Fill Listeners 

fill.addEventListener('dragstart', dragStart);

fill.addEventListener('dragend', dragEnd);


//Loop through empties and drag events 

for (const empty of empties) {

    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);

}

//Drag Functions

function dragStart() {
    this.className += ' hold';
    setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd() {
    this.className = 'fill';
}


function dragOver(e) {
    e.preventDefault();

}


function dragEnter(e) {
   e.preventDefault(); 
   this.className += ' hovered';

}

function dragLeave() {
this.className = 'empty';
}

function dragDrop() {
    this.className = 'empty';
    this.append(fill);
}
