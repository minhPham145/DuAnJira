import { GET_USER_BY_PROJECT_ID, GET_USER_MANAGEMENT, GET_USER_SEARCH, USER_LOGIN } from '../../constants/Cyberbugs/CyberbugsConst';

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
	usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
	userLogin: usLogin,
	userSearch: [],
	arrUser: [],
	userManagement: [],
};

const UserCyberbugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case USER_LOGIN:
			state.userLogin = action.userLogin;
			return { ...state };

		case GET_USER_SEARCH:
			state.userSearch = action.lstUserSearch;
			return { ...state };

		case GET_USER_BY_PROJECT_ID:
			state.arrUser = action.arrUser;
			return { ...state };

		case GET_USER_MANAGEMENT:
			state.userManagement = action.userManagement;
			return { ...state };

		default:
			return state;
	}
};

export default UserCyberbugsReducer;
