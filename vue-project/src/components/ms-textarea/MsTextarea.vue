<template>
  <div :class="[
    'ms-textarea',
    { 'ms-textarea--disabled': disabled },
    { 'ms-textarea--error': error }
  ]">
    <label v-if="label" class="ms-textarea__label">
      {{ label }}
      <span v-if="required" class="ms-textarea__required">*</span>
    </label>

    <div class="ms-textarea__wrapper">
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :cols="cols"
        :maxlength="maxlength"
        class="ms-textarea__field"
      ></textarea>

      <span v-if="maxlength" class="ms-textarea__counter">
        {{ modelValue?.length || 0 }}/{{ maxlength }}
      </span>
    </div>

    <span v-if="error" class="ms-textarea__error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
//#region Props
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  cols: {
    type: Number,
    default: null
  },
  maxlength: {
    type: Number,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})
//#endregion

//#region Emits
defineEmits(['update:modelValue'])
//#endregion
</script>

<style scoped>
.ms-textarea {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ms-textarea__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.ms-textarea__required {
  color: #dc3545;
  margin-left: 2px;
}

.ms-textarea__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.ms-textarea__field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.ms-textarea__field:focus {
  outline: none;
  border-color: #1976d2;
}

.ms-textarea__field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ms-textarea--disabled .ms-textarea__field {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ms-textarea--error .ms-textarea__field {
  border-color: #dc3545;
}

.ms-textarea__counter {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  color: #666;
  background-color: white;
  padding: 2px 4px;
}

.ms-textarea__error-message {
  font-size: 12px;
  color: #dc3545;
}
</style>
