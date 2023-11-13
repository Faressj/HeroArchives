import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Hero from '../components/Hero.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hero/:id',
      name: 'hero',
      component: Hero
    }
  ]
});

export default router;
