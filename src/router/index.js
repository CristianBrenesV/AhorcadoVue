import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../components/MenuPrincipal.vue';
import Jugar from '../components/Jugar.vue';
import Puntuaciones from '../components/TablaPuntuaciones.vue';

const routes = [
  { path: '/', name: 'Menu', component: Menu },
  { path: '/jugar', name: 'Jugar', component: Jugar },
  { path: '/puntuaciones', name: 'Puntuaciones', component: Puntuaciones }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
