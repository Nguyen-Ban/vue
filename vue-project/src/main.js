// Nhập CSS chính của ứng dụng
import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/**
 * Khởi tạo Vue app instance
 * Cấu hình router và gắn ứng dụng vào DOM
 * Created By Ban - 01/06/2026
 */
const app = createApp(App)

// Đăng ký router cho ứng dụng
app.use(router)

// Gắn ứng dụng vào phần tử #app trong index.html
app.mount('#app')
