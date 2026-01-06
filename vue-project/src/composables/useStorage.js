// Các khóa lưu trữ trong localStorage
const STORAGE_KEY = 'MISA_CANDIDATES';
const SIDEBAR_KEY = 'MISA_SIDEBAR_STATE';
const SIDEBAR_ACTIVE_KEY = 'MISA_SIDEBAR_ACTIVE_INDEX';

/**
 * Composable useStorage
 * Quản lý tất cả dữ liệu lưu trữ trong localStorage
 * Created By Ban - 01/06/2026
 */
export function useStorage() {
  /**
   * Khởi tạo dữ liệu ứng viên mặc định nếu chưa tồn tại
   * @param {Array} seed - Dữ liệu mặc định
   * @param {Boolean} force - Bắt buộc ghi đè dữ liệu hiện có
   */
  const initCandidates = (seed, force = false) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data || force) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed ?? []));
    }
  };

  // Lấy danh sách ứng viên từ localStorage
  const getCandidates = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  // Lưu danh sách ứng viên vào localStorage
  const saveCandidates = (candidates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
  };

  // Lấy trạng thái sidebar (thu gọn hay không)
  const getSidebarState = () => localStorage.getItem(SIDEBAR_KEY) === 'true';

  // Lưu trạng thái sidebar
  const saveSidebarState = (isCollapsed) => localStorage.setItem(SIDEBAR_KEY, String(isCollapsed));

  /**
   * Lấy chỉ số menu active của sidebar
   * @returns {Number} - Chỉ số menu (mặc định -1 nếu không hợp lệ)
   */
  const getActiveSidebarIndex = () => {
    const raw = localStorage.getItem(SIDEBAR_ACTIVE_KEY);
    const idx = Number.parseInt(raw ?? '-1', 10);
    return Number.isNaN(idx) ? -1 : idx;
  };

  // Lưu chỉ số menu active của sidebar
  const saveActiveSidebarIndex = (index) => localStorage.setItem(SIDEBAR_ACTIVE_KEY, String(index));

  return {
    initCandidates,
    getCandidates,
    saveCandidates,
    getSidebarState,
    saveSidebarState,
    getActiveSidebarIndex,
    saveActiveSidebarIndex,
  };
}
