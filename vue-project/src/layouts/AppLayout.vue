<template>
  <div class="container display-flex flex-direction-column">
    <Navbar />
    <div class="content display-flex flex1">
      <Sidebar v-model:active="activeSidebar" />
      <div class="main-content flex1">
        <slot />
      </div>
    </div>
    <ToastHost />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './TheNavbar.vue';
import Sidebar from './TheSidebar.vue';
import ToastHost from '../components/ToastHost.vue';

const activeSidebar = ref(0);
</script>
