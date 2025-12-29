<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import Navbar from './layouts/TheNavbar.vue';
import Sidebar from './layouts/TheSidebar.vue';
import ToastHost from './components/ToastHost.vue';

const activeSidebar = ref(0);
</script>

<template>
  <div class="container display-flex flex-direction-column">
    <Navbar />
    <div class="content display-flex flex1">
      <Sidebar v-model:active="activeSidebar" />
      <div class="main-content flex1">
        <RouterView />
      </div>
    </div>
    <ToastHost />
  </div>


</template>

<style scoped>
/* Minimal root: content handled by views/layouts */
</style>
