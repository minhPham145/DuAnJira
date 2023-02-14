import axios from 'axios';
import { DOMAIN_CYBERBUGS, TOKEN } from '../util/constants/settingSystem';

export const cyberbugsService = {
	signInCyberBugs: userLogin => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/users/signin`,
			method: 'POST',
			data: userLogin,
		});
	},

	getAllProjectCategory: () => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/ProjectCategory`,
			method: 'GET',
		});
	},

	createProject: newProject => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/Project/createProject`,
			method: 'POST',
			data: newProject,
		});
	},

	createProjectAuthorization: newProject => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/Project/createProjectAuthorize`,
			method: 'POST',
			data: newProject,
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
		});
	},

	getAllProject: () => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/Project/getAllProject`,
			method: 'GET',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
		});
	},
	
	updateProject: projectUpdate => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/Project/updateProject`,
			method: 'PUT',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
			params: {
				projectId: projectUpdate.id,
			},
			data: projectUpdate,
		});
	},
};
