
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Slider from 'primevue/slider';
import App from './App.vue'

const app = createApp(App);

app.use(PrimeVue);

app.component('Slider', Slider);

app.mount('#app');