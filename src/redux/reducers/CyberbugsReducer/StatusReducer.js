import { GET_ALL_STATUS } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	arrStatus: [],
};

const StatusReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_ALL_STATUS:
			return { ...state, arrStatus: action.arrStatus };

		default:
			return state;
	}
};

export default StatusReducer;
