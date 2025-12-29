import api from '@/apis/config/APIConfig.js';
import BaseAPI from '@/apis/base/BaseAPI.js';

class TodosAPI extends BaseAPI {
    constructor() {
        super('todos');
    }

    // POST /todos/check-duplicate
    checkDuplicate(payload) {
        return api.post(`${this.controller}/check-duplicate`, payload);
    }
}

export default new TodosAPI();
