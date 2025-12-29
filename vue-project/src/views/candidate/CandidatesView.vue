<template>
    <div class="title-header display-flex justify-content-between align-items-center">
      <div class="title-left">Ứng viên</div>
      <div class="title-right">
        <div class="btn-group display-flex">
          <button
            class="btn btn-primary btn-split-main display-flex justify-content-between align-items-center"
            id="btnAddCandidate"
            @click="openAdd"
          >
            <div class="icon icon-add"></div>
            <span>Thêm ứng viên</span>
          </button>

          <button
            class="btn btn-primary btn-split-arrow"
            style="border-left: 1px solid #176cd1;"
          >
            <div class="icon icon-arrow-down"></div>
          </button>
        </div>
      </div>
    </div>

    <CandidateTable />

    <ModalCandidate v-model="showModal" :candidate="editing" @saved="onSaved" />
</template>

<script setup>
import { ref } from 'vue';
import CandidateTable from './CandidateTable.vue';
import ModalCandidate from './CandidateForm.vue';

const showModal = ref(false);
const editing = ref(null);

function openAdd() { editing.value = null; showModal.value = true; }
function onSaved() { /* table reacts via composable state */ }
</script>
