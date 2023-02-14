import axios from 'axios';
import { DOMAIN_CYBERBUGS, TOKEN } from '../util/constants/settingSystem';

export class BaseService {
	put = (url, model) => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/${url}`,
			method: 'PUT',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
			data: model,
		});
	};

	post = (url, model) => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/${url}`,
			method: 'POST',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
			data: model,
		});
	};

	get = url => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/${url}`,
			method: 'GET',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
		});
	};

	delete = url => {
		return axios({
			url: `${DOMAIN_CYBERBUGS}/${url}`,
			method: 'DELETE',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
		});
	};
}
