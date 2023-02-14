import { BaseService } from './BaseService';

class PriorityService extends BaseService {
	getAllPriority = () => {
		return this.get(`Priority/getAll`);
	};
}

export const priorityService = new PriorityService();
