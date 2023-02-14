import { CHANGE_STATUS_TASK, EDIT_PROJECT, GET_PROJECT_DETAIL } from '../../constants/Cyberbugs/CyberbugsConst';

const stateDefault = {
	projectEdit: {
		id: 0,
		projectName: '',
		creator: 0,
		description: '',
		categoryId: 1,
	},

	projectDetail: {},
};

const ProjectReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case EDIT_PROJECT:
			state.projectEdit = action.projectEditModel;
			return { ...state };

		case GET_PROJECT_DETAIL:
			state.projectDetail = action.projectDetail;
			return { ...state };

		case CHANGE_STATUS_TASK: {
			//itemDrag
			let dropSourceIndex = state.projectDetail.lstTask.findIndex(dopStatus => dopStatus.statusId === action.source.droppableId);
			let itemDrag = state.projectDetail.lstTask[dropSourceIndex].lstTaskDeTail.find(task => task.taskId.toString() === action.draggableId);

			//droppable listTask bắt đầu kéo
			let listTaskSource = state.projectDetail.lstTask[dropSourceIndex].lstTaskDeTail.filter(task => task.taskId !== itemDrag.taskId);
			state.projectDetail.lstTask[dropSourceIndex].lstTaskDeTail = listTaskSource;

			//droppable listTask thả vào
			let dropDestinationIndex = state.projectDetail.lstTask.findIndex(dopStatus => dopStatus.statusId === action.destination.droppableId);
			let listTaskDestination = state.projectDetail.lstTask[dropDestinationIndex].lstTaskDeTail;

			listTaskDestination.push(itemDrag);
			state.projectDetail.lstTask[dropDestinationIndex].lstTaskDeTail = listTaskDestination;

			return { ...state };
		}
		default:
			return state;
	}
};

export default ProjectReducer;
