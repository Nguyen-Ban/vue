/**
 * Utility: validation helpers
 * Created By Ban - 01/06/2026
 */

/**
 * Kiểm tra chuỗi có nội dung (sau khi trim)
 * @param {any} v
 * @returns {boolean}
 */
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * Validate email đơn giản
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!isNonEmptyString(email)) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.trim());
}

/**
 * Validate số điện thoại
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhoneVN(phone) {
  if (!isNonEmptyString(phone)) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 11;
}

/**
 * Kiểm tra các field bắt buộc, trả về danh sách field thiếu
 * @param {object} obj
 * @param {string[]} fields
 * @returns {string[]} - danh sách key thiếu/empty
 */
export function missingRequired(obj = {}, fields = []) {
  if (!obj || typeof obj !== 'object') return fields;
  return fields.filter(key => !isNonEmptyString(obj[key]));
}
