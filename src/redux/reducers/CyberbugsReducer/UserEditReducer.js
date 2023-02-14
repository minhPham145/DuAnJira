import { GET_USER_EDIT } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	userEdit: {
		userId: '',
		name: '',
		phoneNumber: '',
		email: '',
	},
};

const UserEditReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_USER_EDIT:
			state.userEdit = action.userEditModel;
			return { ...state };

		default:
			return state;
	}
};

export default UserEditReducer;
