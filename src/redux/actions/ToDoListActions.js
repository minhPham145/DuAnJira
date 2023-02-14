import axios from 'axios';
import { GET_TASK_API } from '../constants/ToDoListConstants';


//action thunk
export const getTaskListApi = () => {
	return dispatch => {
		let promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
			method: 'GET',
		});

		promise.then(result => {
		
			dispatch({
				type: GET_TASK_API,
				taskList: result.data,
			});
		});
		promise.catch(error => {
			alert(error.response.data);
		});
	};
};

export const addTaskApi = (data, error) => {
	return dispatch => {
		const errors = { ...error };
		let valid = true;
		for (let key in errors) {
			if (errors[key] !== '') {
				valid = false;
			}
		}

		if (valid) {
			const promise = axios({
				url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
				method: 'POST',
				data: data,
			});

			promise.then(result => {
				alert('Add task success!');
				dispatch(getTaskListApi());
			});
			promise.catch(error => {
				alert(error.response.data);
			});
		}
	};
};

export const delTaskApi = taskName => {
	return dispatch => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/deleteTask',
			method: 'DELETE',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			dispatch(getTaskListApi());
		});
		promise.catch(error => {
			alert(error.response.data);
		});
	};
};

export const checkTaskApi = taskName => {
	return dispatch => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/doneTask',
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			dispatch(getTaskListApi());
		});

		promise.catch(error => {
			alert(error.response.data);
		});
	};
};

export const rejectTaskApi = taskName => {
	return dispatch => {
		const promise = axios({
			url: '	https://svcy.myclass.vn/api/ToDoList/rejectTask',
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			dispatch(getTaskListApi());
		});

		promise.catch(error => {
			alert(error.response.data);
		});
	};
};
