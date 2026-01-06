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

    <CandidateTable @edit="openEdit" />

    <ModalCandidate v-model="showModal" :candidate="editing" @saved="onSaved" />
</template>

<script setup>
import { ref } from 'vue';
import CandidateTable from './CandidateTable.vue';
import ModalCandidate from './CandidateForm.vue';

/**
 * Component CandidatesView
 * View chính quản lý danh sách ứng viên
 * Gồm: nút thêm ứng viên, bảng danh sách, form modal
 * Created By Ban - 01/06/2026
 */

// Hiển thị/ẩn modal form
const showModal = ref(false);
// Lưu ứng viên đang chỉnh sửa (null = thêm mới)
const editing = ref(null);

/**
 * Mở form thêm ứng viên mới
 * Created By Ban - 01/06/2026
 */
function openAdd() {
  editing.value = null;
  showModal.value = true;
}

/**
 * Mở form chỉnh sửa ứng viên
 * @param {Object} row - Dữ liệu ứng viên được chọn
 * Created By Ban - 01/06/2026
 */
function openEdit(row) {
  editing.value = row;
  showModal.value = true;
}

/**
 * Xử lý sự kiện lưu ứng viên
 * Bảng tự động cập nhật qua composable state
 * Created By Ban - 01/06/2026
 */
function onSaved() { /* table reacts via composable state */ }
</script>

<style scoped>
  /* Title Header */
.title-header {
  height: 50px;
  justify-content: space-between;
  padding: 16px 24px 0 24px;
}
.title-left {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.btn-group .btn {
  margin: 0;
  height: 36px;
  border: none;
  box-shadow: none;
  cursor: pointer;
}
.btn-primary {
  background-color: #1E88E5;
  color: #fff;
}
.btn-split-main {
  border-radius: 4px 0 0 4px;
  padding: 0 12px 0 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  gap: 8px;
  border-left: 1px solid #176cd1;
}
.btn-split-main span {
  font-weight: 600;
  white-space: nowrap;
}
.btn-split-arrow {
  border-radius: 0 4px 4px 0;
  width: 36px;
  padding-left: 8px;
  border-left: 1px solid #176cd1;
}
.btn-split-main:hover, .btn-split-arrow:hover {
  background-color: #1565C0;
}
</style>
