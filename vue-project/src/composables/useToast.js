import { reactive } from 'vue';

const state = reactive({ toasts: [] });

function push(type, message) {
  const id = Date.now() + Math.random();
  state.toasts.push({ id, type, message });
  setTimeout(() => {
    const idx = state.toasts.findIndex(t => t.id === id);
    if (idx !== -1) state.toasts.splice(idx, 1);
  }, 3500);
}

export function useToast() {
  return {
    state,
    success(msg) { push('success', msg); },
    error(msg) { push('error', msg); },
  };
}
