import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	taskDetailModal: {},
};

const TaskReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_TASK_DETAIL:
			state.taskDetailModal = action.taskDetailModal;
			return { ...state };

		case CHANGE_TASK_MODAL:
			const { name, value } = action;
			return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } };

		case CHANGE_ASSIGNESS:
			state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected];
			return { ...state };

		case REMOVE_USER_ASSIGN:
			state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)];
			return { ...state };
		default:
			return state;
	}
};

export default TaskReducer;
