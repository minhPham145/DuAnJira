import { GET_ALL_TASK_TYPE } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	arrTaskType: [],
};

const TaskTypeReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_ALL_TASK_TYPE:
			state.arrTaskType = action.arrTaskType;
			return { ...state };

		default:
			return state;
	}
};

export default TaskTypeReducer;
