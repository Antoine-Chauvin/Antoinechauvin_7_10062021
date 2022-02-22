import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import accueil from '../views/Accueil.vue';
import Chanel from '../views/Chanel.vue';
import Status from '../views/Status.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/accueil',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'accueil',
    component: accueil,
  },

  {
    path: '/chanel/:id',
    name: 'Chanel',
    component: Chanel,
  },
  {
    path: '/status/:id',
    name: 'Status',
    component: Status,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
