<template>
  <div :class="[
    'ms-input',
    { 'ms-input--disabled': disabled },
    { 'ms-input--error': error }
  ]">
    <label v-if="label" class="ms-input__label">
      {{ label }}
      <span v-if="required" class="ms-input__required">*</span>
    </label>

    <div class="ms-input__wrapper">
      <i v-if="prefixIcon" class="ms-input__icon ms-input__icon--prefix" :class="prefixIcon"></i>

      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="ms-input__field"
      />

      <i v-if="suffixIcon" class="ms-input__icon ms-input__icon--suffix" :class="suffixIcon"></i>
    </div>

    <span v-if="error" class="ms-input__error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
/**
 * Component MsInput
 * Input field với label, icon, error message
 * Hỗ trợ readonly, disabled, required validation
 * Created By Ban - 01/06/2026
 */

// Props: Các tham số đầu vào
defineProps({
  modelValue: {
    type: [String, Number],
    default: '' // Giá trị input
  },
  type: {
    type: String,
    default: 'text' // Loại input (text, email, password, etc.)
  },
  label: {
    type: String,
    default: '' // Nhãn hiển thị trên input
  },
  placeholder: {
    type: String,
    default: '' // Placeholder text
  },
  prefixIcon: {
    type: [String, Object],
    default: null // Icon hiển thị bên trái input
  },
  suffixIcon: {
    type: [String, Object],
    default: null // Icon hiển thị bên phải input
  },
  disabled: {
    type: Boolean,
    default: false // Disable input
  },
  readonly: {
    type: Boolean,
    default: false // Chỉ đọc, không thể chỉnh sửa
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
.ms-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ms-input__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.ms-input__required {
  color: #dc3545;
  margin-left: 2px;
}

.ms-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ms-input__field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.ms-input__field:focus {
  outline: none;
  border-color: #1976d2;
}

.ms-input__field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ms-input--disabled .ms-input__field {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ms-input--error .ms-input__field {
  border-color: #dc3545;
}

.ms-input__icon {
  position: absolute;
  display: flex;
  align-items: center;
  color: #666;
}

.ms-input__icon--prefix {
  left: 12px;
}

.ms-input__icon--suffix {
  right: 12px;
}

.ms-input__wrapper:has(.ms-input__icon--prefix) .ms-input__field {
  padding-left: 36px;
}

.ms-input__wrapper:has(.ms-input__icon--suffix) .ms-input__field {
  padding-right: 36px;
}

.ms-input__error-message {
  font-size: 12px;
  color: #dc3545;
}
</style>
