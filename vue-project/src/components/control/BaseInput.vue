<template>
  <input class="form-control" :type="type" :placeholder="placeholder" v-model="model"
         @input="$emit('update:modelValue', model)" />
</template>

<script setup>
import { computed } from 'vue';

/**
 * Component BaseInput
 * Input field đơn giản sử dụng v-model
 * Created By Ban - 01/06/2026
 */

const props = defineProps({
  modelValue: { type: [String, Number], default: '' }, // Giá trị input
  type: { type: String, default: 'text' }, // Loại input (text, email, password, etc.)
  placeholder: { type: String, default: '' }, // Placeholder text
});

const emit = defineEmits(['update:modelValue']);

// Đồng bộ hóa v-model
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});
</script>
