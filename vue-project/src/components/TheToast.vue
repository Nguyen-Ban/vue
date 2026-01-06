<template>
  <div class="toast-box" id="toast-box">
    <div v-for="t in toasts" :key="t.id" :class="['toast', t.type === 'success' ? 'toast-success' : 'toast-error']">
      <div class="toast-icon" :class="t.type === 'success' ? 'toast-icon--success' : 'toast-icon--error'">
        <span>{{ t.type === 'success' ? '✓' : '✕' }}</span>
      </div>
      <div class="toast-msg">{{ t.message }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useToast } from '../composables/useToast';

/**
 * Component ToastHost
 * Hiển thị danh sách toast notifications (thành công/lỗi)
 * Created By Ban - 01/06/2026
 */

const { state } = useToast();
// Danh sách toast hiện tại
const toasts = computed(() => state.toasts);
</script>

<style scoped>
.toast-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  z-index: 3000;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  min-width: 280px;
  max-width: 420px;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.16);
  color: #ffffff;
  border: none;
  pointer-events: auto;
}

.toast-success {
  background: #2ecc71;
}

.toast-error {
  background: #e74c3c;
}

.toast-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
}

.toast-icon span {
  font-size: 16px;
  line-height: 1;
}

.toast-icon--success span {
  color: #2ecc71;
}

.toast-icon--error span {
  color: #e74c3c;
}

.toast-msg {
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
}
</style>
