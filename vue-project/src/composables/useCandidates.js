import { reactive, computed } from 'vue';
import { useStorage } from './useStorage';
import { defaultCandidates } from '../data/defaultCandidates';

// Singleton storage + state để giữ các component đồng bộ
const storage = useStorage();
storage.initCandidates(defaultCandidates, false);

/**
 * State quản lý dữ liệu ứng viên, phân trang và lọc
 */
const state = reactive({
  candidates: [], // Danh sách tất cả ứng viên
  currentPage: 1, // Trang hiện tại
  pageSize: 25, // Số bản ghi mỗi trang
  filterKeyword: '', // Từ khóa tìm kiếm
});

/**
 * Chuẩn hóa dữ liệu ứng viên từ API/Storage
 * @param {Object} r - Dữ liệu ứng viên từ nguồn
 * @returns {Object} - Dữ liệu ứng viên đã chuẩn hóa
 * Created By Ban - 01/06/2026
 */
const normalize = (r) => ({
  ...r,
  CandidateID: r.CandidateID,
  Source: r.ChannelName ?? '--',
  Campaign: r.RecruitmentCampaignNames ?? r.JobPositionName ?? r.RecruitmentName ?? '--',
  CandidateName: r.CandidateName ?? '--',
  Email: r.Email ?? '--',
  Mobile: r.Mobile ?? '--',
  DisplayStatus: r.RecruitmentRoundName ?? r.CandidateStatusName ?? (r.IsNew ? 'Mới' : 'Ứng tuyển'),
});

/**
 * Tải dữ liệu ứng viên từ storage vào state
 * Created By Ban - 01/06/2026
 */
const load = () => {
  const raw = storage.getCandidates();
  state.candidates = Array.isArray(raw) ? raw.map(normalize) : [];
};

// Tải dữ liệu ban đầu khi khởi tạo
load();

/**
 * Lọc ứng viên theo từ khóa tìm kiếm
 * Tìm kiếm trong: tên, điện thoại, email, kênh, chiến dịch
 */
const filtered = computed(() => {
  const keyword = (state.filterKeyword || '').toLowerCase();
  return state.candidates.filter(c => (
    c.CandidateName?.toLowerCase().includes(keyword) ||
    (typeof c.Mobile === 'string' ? c.Mobile.toLowerCase().includes(keyword) : c.Mobile?.includes?.(keyword)) ||
    c.Email?.toLowerCase().includes(keyword) ||
    c.ChannelName?.toLowerCase().includes(keyword) ||
    c.RecruitmentName?.toLowerCase().includes(keyword)
  ));
});

// Tính tổng số trang dựa trên kích thước trang
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / state.pageSize)));

// Vị trí bắt đầu của trang hiện tại
const start = computed(() => (state.currentPage - 1) * state.pageSize);

// Vị trí kết thúc của trang hiện tại
const end = computed(() => start.value + state.pageSize);

// Dữ liệu của trang hiện tại
const pageData = computed(() => filtered.value.slice(start.value, end.value));

// Hiển thị text phân trang: "1 - 25 bản ghi"
const pagingRangeText = computed(() => filtered.value.length ? `${start.value + 1} - ${Math.min(end.value, filtered.value.length)} bản ghi` : '0 bản ghi');

/**
 * Lưu hoặc cập nhật ứng viên
 * Nếu ứng viên đã tồn tại thì cập nhật, nếu không thì thêm mới
 * @param {Object} formData - Dữ liệu form của ứng viên
 * Created By Ban - 01/06/2026
 */
function saveCandidate(formData) {
  const existing = state.candidates.findIndex(c => c.CandidateID == formData.CandidateID);
  if (existing !== -1) {
    // Cập nhật ứng viên hiện có
    state.candidates[existing] = { ...state.candidates[existing], ...formData };
  } else {
    // Thêm ứng viên mới vào đầu danh sách
    state.candidates.unshift({ ...formData, CandidateID: Date.now() });
  }
  // Lưu vào storage
  storage.saveCandidates(state.candidates);
}

/**
 * Composable useCandidates
 * Cung cấp state, dữ liệu phân trang, và hàm quản lý ứng viên
 * Created By Ban - 01/06/2026
 */
export function useCandidates() {
  // Trả về các ref chia sẻ để tất cả component cùng theo dõi dữ liệu
  return {
    state,
    filtered,
    pageData,
    totalPages,
    pagingRangeText,
    load,
    saveCandidate,
  };
}
