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

    <div class="data-grid-container flex1">
      <table class="data-table">
        <thead>
          <tr>
            <th class="col-checkbox" style="width: 50px"><input type="checkbox" /></th>
            <th style="min-width: 327px;">Số điện thoại</th>
            <th style="min-width: 150px;">Nguồn ứng viên</th>
            <th style="min-width: 167px;">Họ và tên</th>
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
          <tr v-if="!pageData.length"><td colspan="23" style="text-align:center; padding:20px">Không có dữ liệu</td></tr>
          <tr v-for="item in pageData" :key="item.CandidateID">
            <td class="col-checkbox text-align-center"><input type="checkbox" /></td>
            <td>{{ safe(item.Mobile) }}</td>
            <td>{{ safe(item.ChannelName ?? item.Source) }}</td>
            <td>
              <div class="grid-cell display-flex align-items-center">
                <div class="cell-info display-flex flex-direction-column justify-content-center gap-2">
                  <div class="text-primary-bold">{{ safe(item.CandidateName) }}</div>
                  <div v-if="safe(displayStatus(item)) !== '--'" class="display-flex">
                    <div class="icon icon-tick"></div>
                    <div class="candidate-status">{{ safe(displayStatus(item)) }}</div>
                  </div>
                </div>
              </div>
            </td>
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
          </tr>
        </tbody>
      </table>
    </div>

    <div class="paging-footer display-flex justify-content-between align-items-center">
      <div class="paging-info">Tổng: <b id="totalRecord">{{ filtered.length }}</b> bản ghi</div>
      <div class="paging-ctrl display-flex align-items-center gap-8">
        <span>Số bản ghi/trang</span>
        <div class="paging-size-dropdown">
          <MsButton
            id="pageSizeSelect"
            type="default"
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

const { state, filtered, pageData, totalPages, pagingRangeText } = useCandidates();

const keyword = ref(state.filterKeyword);
const pageSize = ref(state.pageSize);
const currentPage = computed(() => state.currentPage);
const showPageSizeMenu = ref(false);

const pageSizeOptions = [
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' }
];

watch(keyword, (v) => { state.filterKeyword = v; state.currentPage = 1; });
watch(pageSize, (v) => { state.pageSize = v; state.currentPage = 1; });

function prev() { if (state.currentPage > 1) state.currentPage -= 1; }
function next() { if (state.currentPage < totalPages.value) state.currentPage += 1; }

function togglePageSizeMenu() {
  showPageSizeMenu.value = !showPageSizeMenu.value;
}

function selectPageSize(value) {
  pageSize.value = value;
  showPageSizeMenu.value = false;
}
</script>

<style scoped>
/* Override MsInput to match original search styling */
:deep(.search-input-wrapper .ms-input__field) {
  border: none;
  background: transparent;
  padding: 0;
}

:deep(.search-input-wrapper .ms-input__field:focus) {
  border: none;
}

/* Page size dropdown styling */
.paging-size-dropdown {
  position: relative;
  display: inline-block;
}

:deep(.paging-size-btn) {
  background-color: white !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 4px !important;
  padding: 6px 28px 6px 10px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  font-size: 14px !important;
  color: #333 !important;
  cursor: pointer !important;
  min-width: 65px !important;
  height: 36px !important;
  box-sizing: border-box !important;
}

:deep(.paging-size-btn:hover) {
  border-color: #999 !important;
  background-color: #fafafa !important;
}

:deep(.paging-size-btn .ms-button__content) {
  flex: 1;
  text-align: left;
  line-height: 1;
}

:deep(.paging-size-btn .ms-button__icon) {
  margin: 0 0 0 4px !important;
  width: 12px !important;
  height: 12px !important;
  min-width: 12px !important;
}

.paging-size-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.paging-size-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.15s;
  text-align: left;
}

.paging-size-item:hover {
  background-color: #f5f5f5;
}

.paging-size-item--active {
  background-color: #e8f4fd;
  color: #1976d2;
  font-weight: 500;
}

/* Override MsButton to match paging nav styling */
:deep(.paging-nav-btn) {
  background: none !important;
  padding: 0 !important;
  border: none !important;
  cursor: pointer;
}

:deep(.paging-nav-btn:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

:deep(.paging-nav-btn .ms-button__icon) {
  margin: 0 !important;
}
</style>
