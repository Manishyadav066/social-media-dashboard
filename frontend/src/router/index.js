import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Audience from '../views/Audience.vue';
import Analytics from '../views/Analytics.vue';
import Settings from '../views/Settings.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/audience',
        name: 'Audience',
        component: Audience,
        meta: { requiresAuth: true }
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics,
        meta: { requiresAuth: true }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Mock auth guard
router.beforeEach((to, from, next) => {
    //   const isAuthenticated = localStorage.getItem('token');
    //   if (to.meta.requiresAuth && !isAuthenticated) {
    //     next('/login');
    //   } else {
    next();
    //   }
});

export default router;
