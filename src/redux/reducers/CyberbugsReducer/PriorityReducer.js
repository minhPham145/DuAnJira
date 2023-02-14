import { GET_ALL_PRIORITY } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	arrPriority: [],
};

const PriorityReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_ALL_PRIORITY:
			state.arrPriority = action.arrPriority;
			return { ...state };

		default:
			return state;
	}
};

export default PriorityReducer;
