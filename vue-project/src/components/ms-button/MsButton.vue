<template>
  <button :class="[
    'ms-button',
    `ms-button--${type}`
  ]" :disabled="disabled">
    <i v-if="icon && positionIcon === 'left'" class="ms-button__icon ms-button__icon--left" :class="icon"></i>

    <span class="ms-button__content">
      <slot></slot>
    </span>

    <i v-if="icon && positionIcon === 'right'" class="ms-button__icon ms-button__icon--right" :class="icon"></i>
  </button>
</template>

<script setup>
//#region Props
defineProps({
  icon: {
    // Pass any project-specific icon class (e.g., 'icon icon-plus')
    type: [String, Object],
    default: null,
  },
  positionIcon: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  type: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
//#endregion
</script>

<style scoped>
.ms-button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.ms-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ms-button--primary {
  background-color: #1976d2;
  color: white;
}

.ms-button--primary:hover:not(:disabled) {
  background-color: #1565c0;
}

.ms-button--link {
  background: none;
  color: #1976d2;
  padding: 0;
}

.ms-button--link:hover:not(:disabled) {
  text-decoration: underline;
}

.ms-button--warning {
  background-color: #ff9800;
  color: white;
}

.ms-button--warning:hover:not(:disabled) {
  background-color: #f57c00;
}

.ms-button--danger {
  background-color: #dc3545;
  color: white;
}

.ms-button--danger:hover:not(:disabled) {
  background-color: #c82333;
}

.ms-button__content {
  white-space: nowrap;
}

.ms-button__icon {
  display: inline-flex;
  align-items: center;
}

.ms-button__icon--left {
  margin-right: 8px;
}

.ms-button__icon--right {
  margin-left: 8px;
}
</style>
