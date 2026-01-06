<template>
  <div class="ms-table">
    <div class="ms-table__container">
      <table class="ms-table__element">
        <thead class="ms-table__head">
          <tr class="ms-table__row">
            <th
              v-for="column in columns"
              :key="column.key"
              :style="{ width: column.width, minWidth: column.minWidth }"
              :class="[
                'ms-table__header',
                { 'ms-table__header--sortable': column.sortable }
              ]"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="ms-table__header-content">
                <span>{{ column.label }}</span>
                <span
                  v-if="column.sortable"
                  class="ms-table__sort-icon"
                >{{ getSortIcon(column.key) }}</span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="ms-table__body">
          <tr
            v-if="!data.length"
            class="ms-table__row ms-table__row--empty"
          >
            <td :colspan="columns.length" class="ms-table__cell ms-table__cell--empty">
              {{ emptyText }}
            </td>
          </tr>

          <tr
            v-for="(row, index) in data"
            :key="row[rowKey] || index"
            class="ms-table__row ms-table__row--body"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="ms-table__cell"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :column="column"
                :index="index"
              >
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination" class="ms-table__pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Component MsTable
 * Bảng dữ liệu với support sắp xếp
 * Hỗ trợ custom cell render via slots
 * Created By Ban - 01/06/2026
 */

// Props: Các tham số đầu vào
defineProps({
  columns: {
    type: Array,
    required: true // Danh sách cột: [{key, label, width, minWidth, sortable}, ...]
  },
  data: {
    type: Array,
    default: () => [] // Dữ liệu hàng
  },
  rowKey: {
    type: String,
    default: 'id' // Khóa duy nhất của mỗi hàng
  },
  emptyText: {
    type: String,
    default: 'Không có dữ liệu' // Text khi bảng trống
  },
  pagination: {
    type: Boolean,
    default: false // Hiển thị phân trang
  }
})

// Emit sự kiện sort
const emit = defineEmits(['sort'])

// State
const sortBy = ref(null) // Cột đang sort
const sortOrder = ref(null) // 'asc' | 'desc' | null

/**
 * Xử lý sự kiện sort khi click vào header
 * Cycle: asc -> desc -> null (unsorted)
 * @param {String} key - Khóa cột
 * Created By Ban - 01/06/2026
 */
const handleSort = (key) => {
  if (sortBy.value === key) {
    // Cycle through: asc -> desc -> null
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else if (sortOrder.value === 'desc') {
      sortOrder.value = null
      sortBy.value = null
    } else {
      sortOrder.value = 'asc'
    }
  } else {
    sortBy.value = key
    sortOrder.value = 'asc'
  }

  // Emit sự kiện sort
  emit('sort', { key: sortBy.value, order: sortOrder.value })
}

/**
 * Lấy icon hiển thị trạng thái sort của cột
 * @param {String} key - Khóa cột
 * @returns {String} - Icon sort
 * Created By Ban - 01/06/2026
 */
const getSortIcon = (key) => {
  if (sortBy.value !== key) {
    return '⇅' // Unsorted icon
  }
  return sortOrder.value === 'asc' ? '▲' : '▼' // Ascending or Descending
}
</script>

<style scoped>
.ms-table {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ms-table__container {
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.ms-table__element {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.ms-table__head {
  background-color: #f5f5f5;
}

.ms-table__row {
  border-bottom: 1px solid #ddd;
}

.ms-table__row:last-child {
  border-bottom: none;
}

.ms-table__row--body:hover {
  background-color: #f9f9f9;
}

.ms-table__header {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.ms-table__header--sortable {
  cursor: pointer;
  user-select: none;
}

.ms-table__header--sortable:hover {
  background-color: #ebebeb;
}

.ms-table__header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ms-table__sort-icon {
  color: #999;
  font-size: 12px;
}

.ms-table__cell {
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
}

.ms-table__cell--empty {
  text-align: center;
  padding: 40px 16px;
  color: #999;
}

.ms-table__pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
