import api from '@/apis/config/APIConfig.js';

export default class BaseAPI {
    constructor(controller) {
        this.controller = controller;
    }

    // GET /controller
    getAll(params) {
        return api.get(this.controller, { params });
    }

    // GET /controller/:id
    getById(id) {
        return api.get(`${this.controller}/${id}`);
    }

    // POST /controller/paging
    paging(payload) {
        return api.post(`${this.controller}/paging`, payload);
    }

    // POST /controller
    create(body) {
        return api.post(this.controller, body);
    }

    // PUT /controller/:id
    update(id, body) {
        return api.put(`${this.controller}/${id}`, body);
    }

    // DELETE /controller/:id
    delete(id) {
        return api.delete(`${this.controller}/${id}`);
    }
}
