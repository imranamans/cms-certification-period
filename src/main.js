import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './index.css';
import storeConfig from './Store.js';

const store = createStore(storeConfig);

const app = createApp(App);

// The 'app.use(store)' has to be before 'app.mount()'
app.use(store);

app.mount('#app');
