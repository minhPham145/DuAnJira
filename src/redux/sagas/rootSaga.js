import { all } from 'redux-saga/effects';
import * as ToDoListSaga from './ToDoListSaga/ToDoListSaga';
import * as UserCyberbugsSaga from './Cyberbugs/UserCyberbugsSaga';
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';
import * as StatusSaga from './Cyberbugs/StatusSaga';
import * as CommentSaga from './Cyberbugs/CommentSaga';

export function* rootSaga() {
	yield all([
		//To do list saga....
		ToDoListSaga.watchGetTaskApiSaga(),
		ToDoListSaga.watchAddTaskApiSaga(),
		ToDoListSaga.watchDeleteTaskApiSaga(),
		ToDoListSaga.watchCheckTaskApiSaga(),
		ToDoListSaga.watchRejectTaskApiSaga(),

		//Cyberbugs saga...
		UserCyberbugsSaga.watchSignInSaga(),
		UserCyberbugsSaga.watchSignUpSaga(),
		UserCyberbugsSaga.watchGetUserSaga(),
		UserCyberbugsSaga.watchAssignUserProjectSaga(),
		UserCyberbugsSaga.watchRemoveUserProjectSaga(),
		UserCyberbugsSaga.watchGetUserByProjectIdSaga(),
		UserCyberbugsSaga.watchGetUserManagementSaga(),
		UserCyberbugsSaga.watchEditUserManagementSaga(),
		UserCyberbugsSaga.watchDeleteUserManagementSaga(),

		ProjectCategorySaga.watchGetAllProjectCategorySaga(),

		ProjectSaga.watchGetAllProjectSaga(),
		ProjectSaga.watchGetListProjectSaga(),

		ProjectSaga.watchCreateProjectSaga(),
		ProjectSaga.watchUpdateProjectSaga(),
		ProjectSaga.watchDeleteProjectSaga(),

		ProjectSaga.watchGetProjectDetailSaga(),

		TaskTypeSaga.watchGetAllTaskTypeSaga(),

		PrioritySaga.watchGetAllPrioritySaga(),

		TaskSaga.watchCreateTaskSaga(),
		TaskSaga.watchGetTaskDetailSaga(),
		TaskSaga.watchUpdateStatusTaskSaga(),
		TaskSaga.watchUpdateTaskSaga(),
		TaskSaga.watchUpdateStatusTaskByDragSaga(),

		StatusSaga.watchGetAllStatusSaga(),

		CommentSaga.watchInsertCommentSaga(),
		CommentSaga.watchUpdateCommentSaga(),
		CommentSaga.watchDeleteCommentSaga(),
	]);
}
