<template>
  <div class="gird-container">
    <div class="toolbar-wrapper display-flex justify-content-between align-items-center">
      <div class="toolbar-left">
        <div class="search-box display-flex align-items-center">
          <div class="ai-search-container">
            <i class="ai-search-icon"></i>
          </div>
          <div class="search-content">
            <MsInput
              v-model="keyword"
              type="text"
              placeholder="Tìm kiếm hoặc nhờ AI trợ giúp"
              class="search-input-wrapper"
            />
          </div>
        </div>
      </div>
      <div class="toolbar-right display-flex gap-8">
        <div class="toolbar-box filter"><div class="icon-toolbar icon-filter"></div></div>
        <div class="toolbar-box export"><div class="icon-toolbar icon-export"></div></div>
        <div class="toolbar-box"><div class="icon-toolbar icon-history"></div></div>
        <div class="toolbar-box"><div class="icon-toolbar icon-toolbar-setting"></div></div>
      </div>
    </div>

    <div class="data-grid-container flex1" v-if="filtered.length">
      <table class="data-table">
        <thead>
          <tr>
            <th class="col-checkbox" style="width: 50px; text-align: center;"><input type="checkbox" /></th>
            <th style="min-width: 327px;">Họ và tên</th>
            <th style="min-width: 150px;">Nguồn ứng viên</th>
            <th style="min-width: 167px;">Số điện thoại</th>
            <th style="min-width: 217px;">Email</th>
            <th style="min-width: 220px;">Chiến dịch tuyển dụng</th>
            <th style="min-width: 200px;">Vị trí tuyển dụng</th>
            <th style="min-width: 150px;">Tin tuyển dụng</th>
            <th style="min-width: 180px;">Vòng tuyển dụng</th>
            <th style="min-width: 116px;">Đánh giá</th>
            <th style="min-width: 150px;">Ngày</th>
            <th style="min-width: 150px;">Trình độ đào tạo</th>
            <th style="min-width: 150px;">Nơi đào tạo</th>
            <th style="min-width: 150px;">Chuyên ngành</th>
            <th style="min-width: 150px;">Nơi làm việc gần đây</th>
            <th style="min-width: 150px;">Nhân sự khai thác</th>
            <th style="min-width: 150px;">Đơn vị sử dụng</th>
            <th style="min-width: 285px;">Phù hợp với chân dung</th>
            <th style="min-width: 200px;">Khu vực</th>
            <th style="min-width: 150px;">Người giới thiệu</th>
            <th style="min-width: 250px;">Thông tin tiếp nhận</th>
            <th style="min-width: 264px;">Nguồn ứng viên</th>
            <th style="min-width: 80px;">Thuộc kho tiềm năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageData" :key="item.CandidateID" class="table-row">
            <td class="col-checkbox text-align-center"><input type="checkbox" /></td>
            <!-- Swap: show CandidateName in the first data column (under current header width) -->
            <td>
              <div class="grid-cell display-flex align-items-center gap-8">
                <div class="avatar-initials" :style="{ backgroundColor: getAvatarColor(item.CandidateName) }">{{ getInitials(item.CandidateName) }}</div>
                <div class="cell-info display-flex flex-direction-column justify-content-center gap-2">
                  <div class="text-primary-bold">{{ safe(item.CandidateName) }}</div>
                  <div v-if="safe(displayStatus(item)) !== '--'" class="display-flex">
                    <div class="icon icon-tick"></div>
                    <div class="candidate-status">{{ safe(displayStatus(item)) }}</div>
                  </div>
                </div>
              </div>
            </td>
            <td>{{ safe(item.ChannelName ?? item.Source) }}</td>
            <!-- And show Mobile in the fourth column -->
            <td>{{ safe(item.Mobile) }}</td>
            <td>{{ safe(item.Email) }}</td>
            <td>{{ safe(item.RecruitmentCampaignNames ?? item.Campaign) }}</td>
            <td>{{ safe(item.JobPositionName) }}</td>
            <td>{{ safe(item.RecruitmentName) }}</td>
            <td>{{ safe(displayStatus(item)) }}</td>
            <td>{{ safe(item.Score) }}</td>
            <td>{{ fmtDate(item.ApplyDate) }}</td>
            <td>{{ safe(item.EducationDegreeName) }}</td>
            <td>{{ safe(item.EducationPlaceName) }}</td>
            <td>{{ safe(item.EducationMajorName) }}</td>
            <td>{{ safe(item.WorkPlaceRecent) }}</td>
            <td>{{ safe(item.AttractivePersonnel) }}</td>
            <td>{{ safe(item.OrganizationUnitName) }}</td>
            <td>{{ item.Overall != null ? `${item.Overall}%` : '--' }}</td>
            <td>{{ safe(item.AreaName) }}</td>
            <td>{{ safe(item.PresenterName) }}</td>
            <td>{{ item.ProbationInfoStatus === 1 ? 'Đã gửi' : item.ProbationInfoStatus === 0 ? 'Chưa gửi' : '--' }}</td>
            <td>{{ safe(item.ChannelName ?? item.Source) }}</td>
            <td>{{ item.IsTalentPoolDetail === 1 ? 'Có' : item.IsTalentPoolDetail === 0 ? 'Không' : '--' }}</td>
            <td class="row-edit-icon" @click="editRow(item)" title="Chỉnh sửa">
              <div class="icon-edit"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filtered.length" class="paging-footer display-flex justify-content-between align-items-center">
      <div class="paging-info">Tổng: <b id="totalRecord">{{ filtered.length }}</b> bản ghi</div>
      <div class="paging-ctrl display-flex align-items-center gap-8">
        <span>Số bản ghi/trang</span>
        <div class="paging-size-dropdown">
          <MsButton
            id="pageSizeSelect"
            type="primary"
            :icon="'icon icon-arrow-down'"
            position-icon="right"
            @click="togglePageSizeMenu"
            class="paging-size-btn"
          >
            {{ pageSize }}
          </MsButton>
          <div v-if="showPageSizeMenu" class="paging-size-menu">
            <div
              v-for="option in pageSizeOptions"
              :key="option.value"
              :class="['paging-size-item', { 'paging-size-item--active': pageSize === option.value }]"
              @click="selectPageSize(option.value)"
            >
              {{ option.label }}
            </div>
          </div>
        </div>
        <span class="paging-range" id="pagingRange">{{ pagingRangeText }}</span>
        <div class="paging-nav display-flex">
          <MsButton
            id="btnPrevPage"
            type="link"
            :icon="'icon icon-left-pag'"
            :disabled="currentPage === 1"
            @click="prev()"
            class="paging-nav-btn"
          />
          <MsButton
            id="btnNextPage"
            type="link"
            :icon="'icon icon-right-pag'"
            :disabled="currentPage >= totalPages"
            @click="next()"
            class="paging-nav-btn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCandidates } from '../../composables/useCandidates';
import { safe, fmtDate, displayStatus } from '../../utils/formatter';
import MsInput from '../../components/ms-input/MsInput.vue';
import MsButton from '../../components/ms-button/MsButton.vue';

// Lấy state và computed properties từ composable
const { state, filtered, pageData, totalPages, pagingRangeText } = useCandidates();

// Từ khóa tìm kiếm
const keyword = ref(state.filterKeyword);
// Số bản ghi mỗi trang
const pageSize = ref(state.pageSize);
// Trang hiện tại
const currentPage = computed(() => state.currentPage);
// Hiển thị menu chọn số bản ghi
const showPageSizeMenu = ref(false);

// Các tùy chọn kích thước trang
const pageSizeOptions = [
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' }
];

// Cập nhật từ khóa lọc và reset về trang 1
watch(keyword, (v) => { state.filterKeyword = v; state.currentPage = 1; });
// Cập nhật kích thước trang và reset về trang 1
watch(pageSize, (v) => { state.pageSize = v; state.currentPage = 1; });

/**
 * Chuyển tới trang trước
 * Created By Ban - 01/06/2026
 */
function prev() { if (state.currentPage > 1) state.currentPage -= 1; }

/**
 * Chuyển tới trang tiếp theo
 * Created By Ban - 01/06/2026
 */
function next() { if (state.currentPage < totalPages.value) state.currentPage += 1; }

// Bật/tắt menu chọn kích thước trang
function togglePageSizeMenu() {
  showPageSizeMenu.value = !showPageSizeMenu.value;
}

/**
 * Chọn kích thước trang và đóng menu
 * @param {Number} value - Kích thước trang được chọn
 * Created By Ban - 01/06/2026
 */
function selectPageSize(value) {
  pageSize.value = value;
  showPageSizeMenu.value = false;
}

// Emit sự kiện khi chỉnh sửa ứng viên
const emit = defineEmits(['edit']);

// Màu sắc palette cho avatar
const AVATAR_COLORS = [
  '#FF6B6B', // Đỏ
  '#FFA500', // Cam
  '#FFD93D', // Vàng
  '#6BCB77', // Xanh lá
  '#4D96FF', // Xanh dương
  '#9B59B6', // Tím
  '#E91E63', // Hồng
  '#00BCD4', // Cyan
  '#FF7043', // Đỏ cam
  '#29B6F6'  // Xanh biển
];

/**
 * Generate màu avatar từ tên (nhất quán cho mỗi tên)
 * @param {String} name - Tên ứng viên
 * @returns {String} - Mã màu hex
 * Created By Ban - 01/06/2026
 */
function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const colorIndex = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[colorIndex];
}

/**
 * Xử lý sự kiện chỉnh sửa hàng
 * @param {Object} item - Dữ liệu ứng viên được chọn
 * Created By Ban - 01/06/2026
 */
function editRow(item) {
  emit('edit', item);
}

/**
 * Lấy ký tự đầu của tên ứng viên để hiển thị avatar
 * Nếu có 2 từ trở lên: lấy ký tự đầu của 2 từ đầu tiên
 * @param {String} name - Tên ứng viên
 * @returns {String} - Ký tự viết hoa (2 ký tự max)
 * Created By Ban - 01/06/2026
 */
function getInitials(name) {
  if (!name) return '--';
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
</script>

<style scoped>
@import './CandidateTable.css';

/* Search input styling overrides */
:deep(.search-input-wrapper .ms-input__field) {
  border: none;
  padding: 8px 12px;
  font-size: 13px;
  width: 100%;
  min-width: 200px;
}

:deep(.search-input-wrapper .ms-input__field::placeholder) {
  color: #7a8188;
  opacity: 1;
  font-size: 13px;
}

:deep(.search-input-wrapper .ms-input__field:focus) {
  border: none;
  background: rgba(0, 0, 0, 0.03);
}
</style>
