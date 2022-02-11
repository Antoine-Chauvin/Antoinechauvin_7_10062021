import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Connexion from '../views/Connexion.vue';
import inscription from '../views/Inscription.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/Connexion',
    name: 'Connexion',
    component: Connexion,
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: inscription,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
