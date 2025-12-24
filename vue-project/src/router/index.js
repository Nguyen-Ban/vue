import { createRouter, createWebHistory } from 'vue-router'
import CandidatesView from '../views/candidate/CandidatesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/candidates',
    },
    {
      path: '/candidates',
      name: 'candidates',
      component: CandidatesView,
    },
  ],
})

export default router
