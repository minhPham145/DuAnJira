/* eslint-disable no-useless-constructor */
import axios from 'axios';
import { DOMAIN } from '../util/constants/settingSystem';

class ToDoListService {
	constructor() {}

	getTaskApi = () => {
		return axios({
			url: `${DOMAIN}/ToDoList/GetAllTask`,
			method: 'GET',
		});
	};

	addTaskApi = taskName => {
		return axios({
			url: `${DOMAIN}/ToDoList/AddTask`,
			method: 'POST',
			data: {
				taskName: taskName,
			},
		});
	};

	deleteTaskApi = taskName => {
		return axios({
			url: `${DOMAIN}/ToDoList/deleteTask`,
			method: 'DELETE',
			params: {
				taskName: taskName,
			},
		});
	};

	checkTaskApi = taskName => {
		return axios({
			url: `${DOMAIN}/ToDoList/doneTask`,
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});
	};

	rejectTaskApi = taskName => {
		return axios({
			url: `${DOMAIN}/ToDoList/rejectTask`,
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});
	};
}

export const toDoListService = new ToDoListService();
