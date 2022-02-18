import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import accueil from '../views/Accueil.vue';
import Chanel from '../views/Chanel'


Vue.use(VueRouter);

const routes = [
  {
    path: '/accueil',
    name: 'Home',
    component: Home,
  },
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( webpackChunkName: "about"  '../views/About.vue'),
  },*/
  {
    path: '/',
    name: 'accueil',
    component: accueil,
  },
  
  {
    path:'/chanel/:id',
    name:'Chanel',
    component: Chanel,
  }, 
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
