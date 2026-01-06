import { createRouter, createWebHistory } from 'vue-router'
import CandidatesView from '../views/candidate/CandidatesView.vue'
import TestComponent from '../views/TestComponent.vue'

/**
 * Cấu hình router chính cho ứng dụng
 * Định nghĩa các route và component tương ứng
 * Created By Ban - 01/06/2026
 */
const router = createRouter({
  // Sử dụng history mode với base URL từ biến môi trường
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Chuyển hướng trang chủ tới danh sách ứng viên
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
