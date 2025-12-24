<template>
  <button :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  splitArrow: { type: Boolean, default: false },
});

const classes = computed(() => {
  const base = ['btn'];
  if (props.variant === 'primary') base.push('btn-primary');
  if (props.splitArrow) base.push('btn-split-arrow'); else base.push('btn-split-main');
  return base.join(' ');
});
</script>
