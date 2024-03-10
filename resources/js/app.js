import './bootstrap';
import { createApp } from 'vue'
import App from './components/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {routes} from './routes';
import {store} from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});


createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app');
