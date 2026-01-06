import api from '@/apis/config/APIConfig.js';

/**
 * Lớp BaseAPI cung cấp các phương thức REST API tiêu chuẩn
 * Tự động xây dựng URL từ controller name
 * Created By Ban - 01/06/2026
 */
export default class BaseAPI {
    constructor(controller) {
        this.controller = controller;
    }

    /**
     * Lấy tất cả dữ liệu từ controller
     * @param {Object} params - Tham số query
     * @returns {Promise} - Response từ API
     */
    getAll(params) {
        return api.get(this.controller, { params });
    }

    /**
     * Lấy dữ liệu theo ID
     * @param {Number|String} id - ID của dữ liệu
     * @returns {Promise} - Response từ API
     */
    getById(id) {
        return api.get(`${this.controller}/${id}`);
    }

    /**
     * Lấy dữ liệu với phân trang
     * @param {Object} payload - Payload chứa thông tin phân trang
     * @returns {Promise} - Response từ API
     */
    paging(payload) {
        return api.post(`${this.controller}/paging`, payload);
    }

    /**
     * Tạo dữ liệu mới
     * @param {Object} body - Dữ liệu mới
     * @returns {Promise} - Response từ API
     */
    create(body) {
        return api.post(this.controller, body);
    }

    /**
     * Cập nhật dữ liệu
     * @param {Number|String} id - ID của dữ liệu cần cập nhật
     * @param {Object} body - Dữ liệu cập nhật
     * @returns {Promise} - Response từ API
     */
    update(id, body) {
        return api.put(`${this.controller}/${id}`, body);
    }

    /**
     * Xóa dữ liệu
     * @param {Number|String} id - ID của dữ liệu cần xóa
     * @returns {Promise} - Response từ API
     */
    delete(id) {
        return api.delete(`${this.controller}/${id}`);
    }
}
