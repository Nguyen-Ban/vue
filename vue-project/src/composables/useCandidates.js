import { reactive, computed } from 'vue';
import { useStorage } from './useStorage';
import { defaultCandidates } from '../data/defaultCandidates';

export function useCandidates() {
  const storage = useStorage();
  // Đặt true nếu muốn luôn nạp lại defaultCandidates, false để giữ dữ liệu đã lưu
  storage.initCandidates(defaultCandidates, false);

  const state = reactive({
    candidates: [],
    currentPage: 1,
    pageSize: 25,
    filterKeyword: '',
  });

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

  const load = () => {
    const raw = storage.getCandidates();
    state.candidates = Array.isArray(raw) ? raw.map(normalize) : [];
  };

  load();

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

  const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / state.pageSize)));
  const start = computed(() => (state.currentPage - 1) * state.pageSize);
  const end = computed(() => start.value + state.pageSize);
  const pageData = computed(() => filtered.value.slice(start.value, end.value));
  const pagingRangeText = computed(() => filtered.value.length ? `${start.value + 1} - ${Math.min(end.value, filtered.value.length)} bản ghi` : '0 bản ghi');

  function saveCandidate(formData) {
    const existing = state.candidates.findIndex(c => c.CandidateID == formData.CandidateID);
    if (existing !== -1) {
      state.candidates[existing] = { ...state.candidates[existing], ...formData };
    } else {
      state.candidates.unshift({ ...formData, CandidateID: Date.now() });
    }
    storage.saveCandidates(state.candidates);
  }

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
