import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: () => import('../views/LoginPage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router