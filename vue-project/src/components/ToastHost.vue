<template>
  <div class="toast-box" id="toast-box">
    <div v-for="t in toasts" :key="t.id" :class="['toast', t.type === 'success' ? 'toast-success' : 'toast-error']">
      <div class="toast-icon" v-html="t.type === 'success' ? '&#10004;' : '&#10005;'" />
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
