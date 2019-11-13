import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersList from '../views/UsersList.vue';
import User from '../views/User.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'users',
        component: UsersList,
    },
    {
        path: '/user/:id',
        component: User,
        name: 'user',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
