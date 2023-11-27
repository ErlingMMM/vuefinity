import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueConfetti from 'vue-confetti';

createApp(App).use(router).use(VueConfetti).mount('#app');