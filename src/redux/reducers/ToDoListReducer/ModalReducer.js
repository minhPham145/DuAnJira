import { OPEN_FORM } from '../../constants/ModalConstants';

const stateDefault = {
	Component: <p>Nội dung mặc định</p>,
};

const ModalReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case OPEN_FORM:
			state.Component = action.Component;
			return { ...state };

		default:
			return state;
	}
};
export default ModalReducer;
