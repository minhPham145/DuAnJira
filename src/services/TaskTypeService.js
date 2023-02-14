import { BaseService } from './BaseService';

class TaskTypeService extends BaseService {
	getAllTaskType = () => {
		return this.get(`TaskType/getAll`);
	};
}

export const taskTypeService = new TaskTypeService();
