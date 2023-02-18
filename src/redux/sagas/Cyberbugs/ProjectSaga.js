import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { history } from '../../../util/history';
import { projectService } from '../../../services/ProjectService';
import { openNotificationWithIcon } from '../../../util/Notification/NotificationCyberbugs';

import {
	CLOSE_DRAWER,
	//CONSTANTS CYBERBUGS
	CREATE_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	GET_ALL_PROJECT,
	GET_ALL_PROJECT_SAGA,
	GET_LIST_PROJECT,
	GET_LIST_PROJECT_SAGA,
	GET_PROJECT_DETAIL,
	GET_PROJECT_DETAIL_SAGA,
	GET_USER_BY_PROJECT_ID_SAGA,
	UPDATE_PROJECT_SAGA,
} from '../../constants/Cyberbugs/CyberbugsConst';

function* createProjectSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);

	try {
		const { status } = yield call(() => projectService.createProject(action.newProject));

		if (status === STATUS_CODE.SUCCESS) {
			history.push('/projectmanagement');
			openNotificationWithIcon('success', 'Create project successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Create project fail!');
	}

	yield put({ type: HIDE_LOADING });
}

export function* watchCreateProjectSaga() {
	yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//saga get all project
function* getAllProjectSaga() {
	try {
		const { data, status } = yield call(() => projectService.getAllProject());

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_PROJECT,
				projectList: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetAllProjectSaga() {
	yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

//get list project
function* getListProjectSaga(action) {
	try {
		const { data, status } = yield call(() => projectService.getAllProject());

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_LIST_PROJECT,
				arrProject: data.content,
			});

			yield put({
				type: GET_USER_BY_PROJECT_ID_SAGA,
				projectId: data.content[0].id,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetListProjectSaga() {
	yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//saga update project
function* updateProjectSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);

	try {
		const { status } = yield call(() => projectService.updateProject(action.projectUpdate));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_ALL_PROJECT_SAGA });
			yield put({ type: CLOSE_DRAWER });
			openNotificationWithIcon('success', 'Update project successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Update project fail!');
	}

	yield put({ type: HIDE_LOADING });
}

export function* watchUpdateProjectSaga() {
	yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

//delete project
function* deleteProjectSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);

	try {
		const { status } = yield call(() => projectService.deleteProject(action.projectId));

		if (status === STATUS_CODE.SUCCESS) {
			openNotificationWithIcon('success', 'Delete project successfully!');
			yield put({ type: GET_ALL_PROJECT_SAGA });
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Delete project fail!');
	}

	yield put({ type: HIDE_LOADING });
}

export function* watchDeleteProjectSaga() {
	yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//get project detail
function* getProjectDetailSaga(action) {
	try {
		const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL,
				projectDetail: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetProjectDetailSaga() {
	yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}
