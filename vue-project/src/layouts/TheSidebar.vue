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

const emit = defineEmits(['update:active']);
const storage = useStorage();
const router = useRouter();

const collapsed = ref(false);
const activeIndex = ref(0);

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

function toggle() {
  collapsed.value = !collapsed.value;
  storage.saveSidebarState(collapsed.value);
}

function setActive(i) {
  activeIndex.value = i;
  storage.saveActiveSidebarIndex(i);
  const routeMap = {
    1: '/candidates',
    9: '/testcomponent'
  };
  const target = routeMap[i];
  if (target) router.push(target);
  emit('update:active', i);
}

onMounted(() => {
  collapsed.value = storage.getSidebarState();
  const idx = storage.getActiveSidebarIndex();
  activeIndex.value = idx >= 0 && idx < items.length ? idx : 0;
});
</script>
