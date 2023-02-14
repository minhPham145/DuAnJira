import {
	//DRAWER CONSTANTS
	CLOSE_DRAWER,
	OPEN_DRAWER,
	OPEN_DRAWER_FORM_CREATE_TASK,
	OPEN_DRAWER_FORM_EDIT_PROJECT,
	OPEN_DRAWER_FORM_EDIT_USER,
	SET_SUBMIT_DRAWER_CREATE_TASK,
	SET_SUBMIT_DRAWER_EDIT_PROJECT,
	SET_SUBMIT_DRAWER_EDIT_USER,
} from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	open: false,
	ComponentContentDrawer: <p>Default content</p>,
	title: '',
	callBackSubmit: () => {
		return alert('Demo!');
	},
};

const DrawerReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			return { ...state, open: true };

		case CLOSE_DRAWER:
			return { ...state, open: false };

		case OPEN_DRAWER_FORM_EDIT_PROJECT:
			return {
				...state,
				open: true,
				ComponentContentDrawer: action.Component,
				title: action.title,
			};

		case OPEN_DRAWER_FORM_CREATE_TASK:
			return {
				...state,
				open: true,
				ComponentContentDrawer: action.Component,
				title: action.title,
			};

		case OPEN_DRAWER_FORM_EDIT_USER:
			return {
				...state,
				open: true,
				ComponentContentDrawer: action.Component,
				title: action.title,
			};

		case SET_SUBMIT_DRAWER_EDIT_PROJECT:
			return { ...state, callBackSubmit: action.submitFunction };

		case SET_SUBMIT_DRAWER_CREATE_TASK:
			return { ...state, callBackSubmit: action.submitFunction };

		case SET_SUBMIT_DRAWER_EDIT_USER:
			return { ...state, callBackSubmit: action.submitFunction };

		default:
			return state;
	}
};

export default DrawerReducer;
