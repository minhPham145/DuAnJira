import FormCreateTask from '../../components/Form/FormCreateTask/FormCreateTask';
import FormEditProject from '../../components/Form/FormEditProject/FormEditProject';
import FormEditUser from '../../components/Form/FormEditUser/FormEditUser';
import {
	CLOSE_DRAWER,
	OPEN_DRAWER_FORM_EDIT_PROJECT,
	SET_SUBMIT_DRAWER_EDIT_PROJECT,
	CREATE_PROJECT_SAGA,
	EDIT_PROJECT,
	GET_ALL_PROJECT_CATEGORY_SAGA,
	UPDATE_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	USER_SIGNIN_SAGA,
	GET_USER_SAGA,
	ASSIGN_USER_PROJECT_SAGA,
	REMOVE_USER_PROJECT_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	OPEN_DRAWER_FORM_CREATE_TASK,
	GET_ALL_PROJECT_SAGA,
	GET_LIST_PROJECT_SAGA,
	GET_ALL_TASK_TYPE_SAGA,
	GET_ALL_PRIORITY_SAGA,
	CREATE_TASK_SAGA,
	GET_ALL_STATUS_SAGA,
	GET_USER_BY_PROJECT_ID_SAGA,
	SET_SUBMIT_DRAWER_CREATE_TASK,
	GET_TASK_DETAIL_SAGA,
	UPDATE_STATUS_TASK_SAGA,
	CHANGE_TASK_MODAL,
	CHANGE_ASSIGNESS,
	REMOVE_USER_ASSIGN,
	HANDLE_CHANGE_POST_API_SAGA,
	UPDATE_STATUS_TASK_BY_DRAG_SAGA,
	USER_SIGNUP_SAGA,
	GET_USER_MANAGEMENT_SAGA,
	OPEN_DRAWER_FORM_EDIT_USER,
	SET_SUBMIT_DRAWER_EDIT_USER,
	GET_USER_EDIT,
	EDIT_USER_MANAGEMENT_SAGA,
	DELETE_USER_MANAGEMENT_SAGA,
	INSERT_COMMENT_SAGA,
	UPDATE_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
} from '../constants/Cyberbugs/CyberbugsConst';

//--------------------------DRAWER--------------------------
export const closeDrawerAction = () => ({
	type: CLOSE_DRAWER,
});

export const openDrawerFormEditProjectAction = () => ({
	type: OPEN_DRAWER_FORM_EDIT_PROJECT,
	Component: <FormEditProject />,
	title: 'Edit project',
});

export const openDrawerFormCreateTaskAction = () => ({
	type: OPEN_DRAWER_FORM_CREATE_TASK,
	Component: <FormCreateTask />,
	title: 'Create task',
});

export const openDrawerFormEditUserAction = () => ({
	type: OPEN_DRAWER_FORM_EDIT_USER,
	Component: <FormEditUser />,
	title: 'Edit user',
});

export const setSubmitDrawerEditProjectAction = handleSubmit => ({
	type: SET_SUBMIT_DRAWER_EDIT_PROJECT,
	submitFunction: handleSubmit,
});

export const setSubmitDrawerCreateTaskAction = handleSubmit => ({
	type: SET_SUBMIT_DRAWER_CREATE_TASK,
	submitFunction: handleSubmit,
});

export const setSubmitDrawerEditUserAction = handleSubmit => ({
	type: SET_SUBMIT_DRAWER_EDIT_USER,
	submitFunction: handleSubmit,
});
//--------------------------------------------------------

//--------------------------USER--------------------------
export const signInCyberbugsAction = (email, password) => ({
	type: USER_SIGNIN_SAGA,
	userLogin: {
		email: email,
		password: password,
	},
});

export const signUpCyberbugsAction = userSignUp => ({
	type: USER_SIGNUP_SAGA,
	userSignUp,
});

export const getUserAction = keyWord => ({
	type: GET_USER_SAGA,
	keyWord,
});

export const assignUserProjectAction = (projectId, userId) => ({
	type: ASSIGN_USER_PROJECT_SAGA,
	userProject: {
		projectId,
		userId,
	},
});

export const removeUserProjectAction = (projectId, userId) => ({
	type: REMOVE_USER_PROJECT_SAGA,
	userProject: {
		projectId,
		userId,
	},
});

export const getUserByProjectIdAction = projectId => ({
	type: GET_USER_BY_PROJECT_ID_SAGA,
	projectId,
});

export const getUserManagementAction = keyWord => ({
	type: GET_USER_MANAGEMENT_SAGA,
	keyWord,
});

export const getUserEditAction = userEditModel => ({
	type: GET_USER_EDIT,
	userEditModel,
});

export const editUserAction = userEditModel => ({
	type: EDIT_USER_MANAGEMENT_SAGA,
	userEditModel,
});

export const deleteUserAction = userId => ({
	type: DELETE_USER_MANAGEMENT_SAGA,
	userId,
});
//-----------------------------------------------------------

//--------------------------PROJECT--------------------------
export const getAllProjectCategoryAction = () => ({
	type: GET_ALL_PROJECT_CATEGORY_SAGA,
});

export const createProjectAction = newProject => ({
	type: CREATE_PROJECT_SAGA,
	newProject,
});

export const getAllProjectAction = () => ({
	type: GET_ALL_PROJECT_SAGA,
});

export const getListProjectAction = () => ({
	type: GET_LIST_PROJECT_SAGA,
});

export const editProjectAction = projectEditModel => ({
	type: EDIT_PROJECT,
	projectEditModel,
});

export const updateProjectAction = projectUpdate => ({
	type: UPDATE_PROJECT_SAGA,
	projectUpdate,
});

export const deleteProjectAction = projectId => ({
	type: DELETE_PROJECT_SAGA,
	projectId,
});

export const getProjectDetailAction = projectId => ({
	type: GET_PROJECT_DETAIL_SAGA,
	projectId,
});
//--------------------------------------------------------

//--------------------------TASK--------------------------
export const getAllTaskTypeAction = () => ({
	type: GET_ALL_TASK_TYPE_SAGA,
});

export const createTaskAction = taskObject => ({
	type: CREATE_TASK_SAGA,
	taskObject,
});

export const getTaskDetailAction = taskId => ({
	type: GET_TASK_DETAIL_SAGA,
	taskId,
});

export const updateStatusTaskAction = (taskId, statusId, projectId) => ({
	type: UPDATE_STATUS_TASK_SAGA,
	taskStatusUpdate: {
		taskId,
		statusId,
		projectId,
	},
});

export const changeTaskModalAction = (name, value) => ({
	type: HANDLE_CHANGE_POST_API_SAGA,
	actionType: CHANGE_TASK_MODAL,
	name,
	value,
});

export const changeAssignessAction = userSelected => ({
	type: HANDLE_CHANGE_POST_API_SAGA,
	actionType: CHANGE_ASSIGNESS,
	userSelected,
});

export const removeAssignessAction = userId => ({
	type: HANDLE_CHANGE_POST_API_SAGA,
	actionType: REMOVE_USER_ASSIGN,
	userId,
});

export const changeStatusTaskByDragAction = (draggableId, destination, source, projectId) => ({
	type: UPDATE_STATUS_TASK_BY_DRAG_SAGA,
	draggableId,
	destination,
	source,
	projectId,
});
//------------------------------------------------------------

//--------------------------PRIORITY--------------------------
export const getAllPriorityAction = () => ({
	type: GET_ALL_PRIORITY_SAGA,
});
//----------------------------------------------------------

//--------------------------STATUS--------------------------
export const getAllStatusAction = () => ({
	type: GET_ALL_STATUS_SAGA,
});
//-----------------------------------------------------------

//--------------------------COMMENT--------------------------
export const insertCommentAction = (taskId, contentComment) => ({
	type: INSERT_COMMENT_SAGA,
	taskComment: {
		taskId,
		contentComment,
	},
});

export const updateCommentAction = (idComment, contentComment, taskId) => ({
	type: UPDATE_COMMENT_SAGA,
	idComment,
	contentComment,
	taskId,
});

export const deleteCommentAction = (idComment, taskId) => ({
	type: DELETE_COMMENT_SAGA,
	idComment,
	taskId,
});
