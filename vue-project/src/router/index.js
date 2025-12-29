import { createRouter, createWebHistory } from 'vue-router'
import CandidatesView from '../views/candidate/CandidatesView.vue'
import TestComponent from '../views/TestComponent.vue'

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
    {
      path: '/testcomponent',
      name: 'testcomponent',
      component: TestComponent,
    },
  ],
})

export default router
