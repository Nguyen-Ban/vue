<template>
  <div class="components-demo">
    <h1>MS Components Demo</h1>

    <!-- Button Examples -->
    <section class="demo-section">
      <h2>MsButton</h2>
      <div class="demo-group">
        <MsButton type="primary">Primary Button</MsButton>
        <MsButton type="warning">Warning Button</MsButton>
        <MsButton type="danger">Danger Button</MsButton>
        <MsButton type="link">Link Button</MsButton>
        <MsButton type="primary" disabled>Disabled Button</MsButton>
      </div>

      <div class="demo-group">
        <MsButton type="primary"><span class="ms-button__content">Tìm kiếm</span></MsButton>
        <MsButton type="primary"><span class="ms-button__content">Thêm mới</span></MsButton>
        <MsButton type="warning"><span class="ms-button__content">Sửa</span></MsButton>
        <MsButton type="danger"><span class="ms-button__content">Xóa</span></MsButton>
      </div>
    </section>

    <!-- Input Examples -->
    <section class="demo-section">
      <h2>MsInput</h2>
      <div class="demo-group-vertical">
        <MsInput
          v-model="inputValue"
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          required
        />

        <MsInput
          v-model="emailValue"
          type="email"
          label="Email"
          placeholder="example@email.com"
        />

        <MsInput
          v-model="searchValue"
          label="Tìm kiếm"
          placeholder="Tìm kiếm..."
        />

        <MsInput
          v-model="errorValue"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          error
          errorMessage="Số điện thoại không hợp lệ"
        />
      </div>
    </section>

    <!-- Textarea Examples -->
    <section class="demo-section">
      <h2>MsTextarea</h2>
      <div class="demo-group-vertical">
        <MsTextarea
          v-model="textareaValue"
          label="Mô tả"
          placeholder="Nhập mô tả..."
          :rows="4"
        />

        <MsTextarea
          v-model="textareaWithLimit"
          label="Ghi chú"
          placeholder="Nhập ghi chú (tối đa 200 ký tự)"
          :maxlength="200"
          :rows="3"
        />
      </div>
    </section>

    <!-- Select Examples -->
    <section class="demo-section">
      <h2>MsSelect</h2>
      <div class="demo-group-vertical">
        <MsSelect
          v-model="selectValue"
          label="Vị trí"
          placeholder="Chọn vị trí"
          :options="positionOptions"
          required
        />

        <MsSelect
          v-model="statusValue"
          label="Trạng thái"
          :options="statusOptions"
        />
      </div>
    </section>

    <!-- Table Examples -->
    <section class="demo-section">
      <h2>MsTable</h2>
      <MsTable
        :columns="tableColumns"
        :data="tableData"
        rowKey="id"
        @sort="handleSort"
      >
        <template #cell-name="{ row }">
          <strong>{{ row.name }}</strong>
        </template>

        <template #cell-status="{ row }">
          <span :class="`status-badge status-badge--${row.status}`">
            {{ row.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
          </span>
        </template>

        <template #cell-actions="{ row }">
          <div class="action-buttons">
            <MsButton type="link" icon="fa-edit" @click="editRow(row)">Sửa</MsButton>
            <MsButton type="link" icon="fa-trash" @click="deleteRow(row)">Xóa</MsButton>
          </div>
        </template>
      </MsTable>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MsButton from '../ms-button/MsButton.vue'
import MsInput from '../ms-input/MsInput.vue'
import MsTextarea from '../ms-textarea/MsTextarea.vue'
import MsSelect from '../ms-select/MsSelect.vue'
import MsTable from '../ms-table/MsTable.vue'

//#region State
const inputValue = ref('')
const emailValue = ref('')
const searchValue = ref('')
const errorValue = ref('')
const textareaValue = ref('')
const textareaWithLimit = ref('')
const selectValue = ref('')
const statusValue = ref('active')

const positionOptions = ref([
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'tester', label: 'Tester' }
])

const statusOptions = ref([
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' }
])

const tableColumns = ref([
  { key: 'id', label: 'ID', width: '80px', sortable: true },
  { key: 'name', label: 'Họ và tên', minWidth: '200px', sortable: true },
  { key: 'email', label: 'Email', minWidth: '250px' },
  { key: 'phone', label: 'Số điện thoại', minWidth: '150px' },
  { key: 'status', label: 'Trạng thái', width: '150px' },
  { key: 'actions', label: 'Thao tác', width: '150px' }
])

const tableData = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'active' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0987654321', status: 'inactive' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', phone: '0369852147', status: 'active' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', phone: '0147852369', status: 'active' }
])
//#endregion

//#region Methods
const handleSort = ({ key, order }) => {
  console.log('Sort:', key, order)
}

const editRow = (row) => {
  console.log('Edit row:', row)
}

const deleteRow = (row) => {
  console.log('Delete row:', row)
}
//#endregion
</script>

<style scoped>
.components-demo {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 32px;
  color: #333;
}

.demo-section {
  margin-bottom: 48px;
}

.demo-section h2 {
  margin-bottom: 16px;
  color: #666;
  font-size: 20px;
}

.demo-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.demo-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge--active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-badge--inactive {
  background-color: #ffebee;
  color: #c62828;
}

.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
