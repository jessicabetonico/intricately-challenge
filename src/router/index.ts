import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/deck/new',
  },
  {
    path: '/deck',
    redirect: '/deck/new',
  },
  {
    path: '/deck/new',
    name: 'newDeck',
    component: () => import('../views/NewDeck/index.vue'),
  },
  {
    path: '/deck/:deckId',
    name: 'deck',
    component: () => import('../views/DeckDetails/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
