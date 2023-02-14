import { BaseService } from './BaseService';

class ProjectService extends BaseService {
	getAllProjectCategory = () => {
		return this.get(`ProjectCategory`);
	};

	createProject = newProject => {
		return this.post(`Project/createProjectAuthorize`, newProject);
	};

	getAllProject = () => {
		return this.get(`Project/getAllProject`);
	};

	updateProject = projectUpdate => {
		return this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
	};

	deleteProject = id => {
		return this.delete(`Project/deleteProject?projectId=${id}`);
	};

	getProjectDetail = projectId => {
		return this.get(`Project/getProjectDetail?id=${projectId}`);
	};
}

export const projectService = new ProjectService();
