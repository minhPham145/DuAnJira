import { GET_TASK_API } from '../../constants/ToDoListConstants';

const stateDefault = {
	taskList: [],
};

const ToDoListReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_TASK_API:
			state.taskList = action.taskList;
			return { ...state };
		default:
			return state;
	}
};

export default ToDoListReducer;
