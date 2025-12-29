<template>
  <div class="ms-button">MsButton</div>
  <MsButton
    type="primary"
    icon="icon icon-add"
    position-icon="right"
    :disabled="!isAgree"
    >Primary Button</MsButton>
  <MsButton type="warning">Warning Button</MsButton>
  <MsButton type="danger">Danger Button</MsButton>
  <MsButton type="link">Link Button</MsButton>
  <MsButton type="primary" disabled>Disabled Button</MsButton>
  <div class="check-box">
    <input type="checkbox" name="" id="agree" v-model="isAgree">
  </div>
  <div class="ms-input">MsInput</div>
  <MsInput
    v-model="inputValue"
    label="Họ và tên"
    placeholder="Nhập họ và tên"
    @input="handleInput"
    required
  />
  <MsButton
    type="primary"
    :disabled="isDisable"
    @click="handleSubmit"
  >Submit</MsButton>

  <MsInput
    suffix-icon="icon icon-arrow-down"
    v-model="phoneNumber"
    label="Số điện thoại"
    placeholder="Nhập số điện thoại"
    :error="isPhoneError"
    error-message="Nhập số thôiiiiiiiiiiiiiiiiii"
  />
  <br>
  <div class="text-area">
    <h1>MsTextarea</h1>
    <MsTextarea
      v-model="discription"
      label="Mô tả"
      rows
    />
  </div>
</template>

<script setup>
import MsButton from '../components/ms-button/MsButton.vue';
import MsInput from '../components/ms-input/MsInput.vue';
import MsTextarea from '@/components/ms-textarea/MsTextarea.vue';

import { ref, computed, watch } from 'vue';
const isAgree = ref(false);
const inputValue = ref('');
const isDisable = computed(() => inputValue.value.trim().length === 0);
function handleSubmit() {
  alert(`Submitted value: ${inputValue.value}`);
}
function handleInput(event) {
  const value = event.target.value;
  console.log(`Input value: ${value}`);
}

const phoneNumber = ref('');
const isPhoneError = computed(() => {
  const phoneRegex = /^\d+$/;
  return phoneNumber.value && !phoneRegex.test(phoneNumber.value);
});

watch(phoneNumber, (oldValue, newValue) => {
  console.log(oldValue);
  console.log(newValue);
})
</script>
