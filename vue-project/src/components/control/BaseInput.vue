<template>
  <input class="form-control" :type="type" :placeholder="placeholder" v-model="model"
         @input="$emit('update:modelValue', model)" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});
</script>
