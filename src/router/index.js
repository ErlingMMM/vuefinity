import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import WhereIsWaldoPage from '../views/WhereIsWaldoPage.vue';
import ReactionTimePage from '../views/ReactionTimePage.vue';
import ColorTextPage from '../views/ColorTextPage.vue';
import LeaderboardPage from '../views/LeaderboardPage.vue';

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
    },
    {
        path: '/leaderboard',
        name: 'leaderboard',
        component: LeaderboardPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router