import { GET_ALL_PROJECT, GET_LIST_PROJECT } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	projectList: [], //get all project
	arrProject: [], //get list project
};

const ProjectCyberbugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_ALL_PROJECT:
			state.projectList = action.projectList;
			return { ...state };

		case GET_LIST_PROJECT:
			state.arrProject = action.arrProject;
			return { ...state };

		default:
			return state;
	}
};

export default ProjectCyberbugsReducer;
