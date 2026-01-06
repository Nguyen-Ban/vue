<template>
  <div class="sidebar" :class="{ collapsed }" id="sidebar">
    <div class="sidebar-list">
      <div class="sidebar-container">
        <div v-for="(item, i) in items" :key="i" class="sider-item display-flex align-items-center"
             :class="{ active: activeIndex === i }" @click="setActive(i)">
          <div class="sidebar-icon" :class="item.icon"></div>
          <div class="sidebar-content">{{ item.label }}</div>
        </div>
      </div>
      <div class="sidebar-bottom" id="btnToggleSidebar" @click="toggle()">
        <div class="collapse-btn display-flex align-items-center">
          <div class="icon icon-left"></div>
          <div class="text-content-bottom">Thu gọn</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '../composables/useStorage';

/**
 * Component TheSidebar
 * Menu sidebar trái của ứng dụng
 * Cho phép navigate tới các section khác nhau
 * Created By Ban - 01/06/2026
 */

// Emit sự kiện cập nhật item active
const emit = defineEmits(['update:active']);
const storage = useStorage();
const router = useRouter();

// Trạng thái sidebar (collapsed/expanded)
const collapsed = ref(false);
// Chỉ số item menu đang active
const activeIndex = ref(0);

/**
 * Danh sách menu items của sidebar
 */
const items = [
  { icon: 'icon-sb-recruiment', label: 'Tin tuyển dụng' },
  { icon: 'icon-sb-candidate', label: 'Ứng viên' },
  { icon: 'icon-sb-calendar', label: 'Lịch' },
  { icon: 'icon-sb-talent-pools', label: 'Kho tiềm năng' },
  { icon: 'icon-sb-campaign', label: 'Chiến dịch tuyển dụng' },
  { icon: 'icon-sb-task', label: 'Công việc' },
  { icon: 'icon-sb-email', label: 'aiMarketing' },
  { icon: 'icon-sb-chat', label: 'Trao đổi với ứng viên' },
  { icon: 'icon-sb-report', label: 'Báo cáo' },
  { icon: 'icon-sb-setting', label: 'Thiết lập' },
  { icon: 'icon-sb-knowledge', label: 'Kiến thức hữu ích' },
];

/**
 * Bật/tắt sidebar (collapse/expand)
 * Lưu trạng thái vào storage
 * Created By Ban - 01/06/2026
 */
function toggle() {
  collapsed.value = !collapsed.value;
  storage.saveSidebarState(collapsed.value);
}

/**
 * Đặt item menu active, lưu trạng thái và navigate
 * @param {Number} i - Chỉ số menu item
 * Created By Ban - 01/06/2026
 */
function setActive(i) {
  activeIndex.value = i;
  // Lưu chỉ số active vào storage
  storage.saveActiveSidebarIndex(i);
  // Map chỉ số tới route
  const routeMap = {
    1: '/candidates', // Ứng viên
    9: '/testcomponent' // Settings (test)
  };
  const target = routeMap[i];
  // Navigate nếu có route tương ứng
  if (target) router.push(target);
  // Emit sự kiện
  emit('update:active', i);
}

/**
 * Khởi tạo sidebar từ storage
 * Restore trạng thái collapsed và item active
 * Created By Ban - 01/06/2026
 */
onMounted(() => {
  // Restore trạng thái sidebar (collapsed hay không)
  collapsed.value = storage.getSidebarState();
  // Restore item active
  const idx = storage.getActiveSidebarIndex();
  activeIndex.value = idx >= 0 && idx < items.length ? idx : 0;
});
</script>
