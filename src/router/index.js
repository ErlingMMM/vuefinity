import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import WhereIsWaldoPage from '../views/WhereIsWaldoPage.vue';
import ReactionTimePage from '../views/ReactionTimePage.vue';
import ColorTextPage from '../views/ColorTextPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: LoginPage
    },
    {
        path: '/where-is-waldo',
        name: 'where-is-waldo',
        component: WhereIsWaldoPage
    },
    {
        path: '/reaction-time',
        name: 'reaction-time',
        component: ReactionTimePage
    },
    {
        path: '/color-text',
        name: 'color-text',
        component: ColorTextPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router