<template>
  <div :class="[
    'ms-select',
    { 'ms-select--disabled': disabled },
    { 'ms-select--error': error }
  ]">
    <label v-if="label" class="ms-select__label">
      {{ label }}
      <span v-if="required" class="ms-select__required">*</span>
    </label>

    <div class="ms-select__wrapper">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        class="ms-select__field"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <i class="ms-select__icon"></i>
    </div>

    <span v-if="error" class="ms-select__error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
/**
 * Component MsSelect
 * Select dropdown với label, error message
 * Hỗ trợ disabled, required validation
 * Created By Ban - 01/06/2026
 */

// Props: Các tham số đầu vào
defineProps({
  modelValue: {
    type: [String, Number],
    default: '' // Giá trị select
  },
  options: {
    type: Array,
    default: () => [] // Danh sách options: [{value, label}, ...]
  },
  label: {
    type: String,
    default: '' // Nhãn hiển thị trên select
  },
  placeholder: {
    type: String,
    default: '' // Placeholder text
  },
  disabled: {
    type: Boolean,
    default: false // Disable select
  },
  required: {
    type: Boolean,
    default: false // Đánh dấu required
  },
  error: {
    type: Boolean,
    default: false // Trạng thái lỗi
  },
  errorMessage: {
    type: String,
    default: '' // Tin nhắn lỗi
  }
})

// Emit sự kiện v-model
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ms-select {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ms-select__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.ms-select__required {
  color: #dc3545;
  margin-left: 2px;
}

.ms-select__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ms-select__field {
  width: 100%;
  padding: 8px 36px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.ms-select__field:focus {
  outline: none;
  border-color: #1976d2;
}

.ms-select__field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ms-select--disabled .ms-select__field {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ms-select--error .ms-select__field {
  border-color: #dc3545;
}

.ms-select__icon {
  position: absolute;
  right: 12px;
  pointer-events: none;
  color: #666;
  font-size: 12px;
}

.ms-select__icon::before {
  content: '▾';
}

.ms-select__error-message {
  font-size: 12px;
  color: #dc3545;
}
</style>
