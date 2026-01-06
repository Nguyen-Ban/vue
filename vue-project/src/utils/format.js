/**
 * Utility: formatting helpers
 * Created By Ban - 01/06/2026
 */

/**
 * Chuyển đổi giá trị null/undefined/empty thành '--'
 * @param {any} v - Giá trị cần chuyển đổi
 * @returns {string|any} - Giá trị gốc hoặc '--'
 */
export function safe(v) {
  return (v === null || v === undefined || v === '') ? '--' : v;
}

/**
 * Định dạng ngày từ ISO string sang định dạng Việt Nam (dd/MM/yyyy)
 * @param {String} iso - Ngày theo định dạng ISO
 * @returns {String} - Ngày theo định dạng Việt Nam hoặc '--' nếu không hợp lệ
 */
export function fmtDate(iso) {
  if (!iso) return '--';
  const d = new Date(iso);
  return isNaN(d) ? '--' : d.toLocaleDateString('vi-VN');
}

/**
 * Lấy trạng thái hiển thị của ứng viên
 * Ưu tiên: RecruitmentRoundName > CandidateStatusName > DisplayStatus > IsNew
 * @param {Object} item - Đối tượng ứng viên
 * @returns {String} - Trạng thái hiển thị
 */
export function displayStatus(item) {
  return item?.RecruitmentRoundName ?? item?.CandidateStatusName ?? item?.DisplayStatus ?? (item?.IsNew ? 'Mới' : 'Ứng tuyển');
}
