import { BaseService } from './BaseService';

class StatusService extends BaseService {
	getAllStatus = () => {
		return this.get(`Status/getAll`);
	};
}

export const statusService = new StatusService();
