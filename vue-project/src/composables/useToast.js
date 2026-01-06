import { reactive } from 'vue';

// State quản lý danh sách toast notifications
const state = reactive({ toasts: [] });

/**
 * Thêm toast notification vào danh sách
 * Tự động xóa sau 3.5 giây
 * @param {String} type - Loại toast: 'success' hoặc 'error'
 * @param {String} message - Nội dung thông báo
 * Created By Ban - 01/06/2026
 */
function push(type, message) {
  const id = Date.now() + Math.random();
  state.toasts.push({ id, type, message });
  // Tự động xóa toast sau 3.5 giây
  setTimeout(() => {
    const idx = state.toasts.findIndex(t => t.id === id);
    if (idx !== -1) state.toasts.splice(idx, 1);
  }, 3500);
}

/**
 * Composable useToast
 * Cung cấp hàm hiển thị toast thành công hoặc lỗi
 * Created By Ban - 01/06/2026
 */
export function useToast() {
  return {
    state,
    // Hiển thị toast thành công
    success(msg) { push('success', msg); },
    // Hiển thị toast lỗi
    error(msg) { push('error', msg); },
  };
}
