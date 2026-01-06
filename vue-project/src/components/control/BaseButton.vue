<template>
  <button :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

/**
 * Component BaseButton
 * Nút bấm cơ bản với variant khác nhau
 * Created By Ban - 01/06/2026
 */

const props = defineProps({
  variant: { type: String, default: 'primary' }, // Kiểu nút: primary, secondary, etc.
  splitArrow: { type: Boolean, default: false }, // Có mũi tên split hay không
});

/**
 * Tính toán class CSS cho nút
 * @returns {String} - Các class CSS được áp dụng
 * Created By Ban - 01/06/2026
 */
const classes = computed(() => {
  const base = ['btn'];
  if (props.variant === 'primary') base.push('btn-primary');
  if (props.splitArrow) base.push('btn-split-arrow'); else base.push('btn-split-main');
  return base.join(' ');
});
</script>
