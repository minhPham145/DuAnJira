import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { toDoListService } from '../../../services/ToDoListService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { GET_TASK_API, ADD_TASK_API_SAGA, CHECK_TASK_API_SAGA, DELETE_TASK_API_SAGA, GET_TASKLIST_API_SAGA, REJECT_TASK_API_SAGA } from '../../constants/ToDoListConstants';

//----------------GET TASK API------------------
function* getTaskApiSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(500);

	try {
		let { data, status } = yield call(toDoListService.getTaskApi);
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASK_API,
				taskList: data,
			});
		}
	} catch (error) {}

	yield put({ type: HIDE_LOADING });
}

export function* watchGetTaskApiSaga() {
	yield takeLatest(GET_TASKLIST_API_SAGA, getTaskApiSaga);
}

//----------------ADD TASK API------------------
function* addTaskApiSaga({ taskName }) {
	try {
		const { status } = yield call(() => toDoListService.addTaskApi(taskName));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_TASKLIST_API_SAGA });
			alert('Add task successfuly!');
		}
	} catch (error) {}
}

export function* watchAddTaskApiSaga() {
	yield takeLatest(ADD_TASK_API_SAGA, addTaskApiSaga);
}

//----------------DELETE TASK API------------------
function* deleteTaskApiSaga({ taskName }) {
	try {
		const { status } = yield call(() => toDoListService.deleteTaskApi(taskName));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_TASKLIST_API_SAGA });
		}
	} catch (error) {}
}

export function* watchDeleteTaskApiSaga() {
	yield takeLatest(DELETE_TASK_API_SAGA, deleteTaskApiSaga);
}

//----------------CHECK TASK API------------------
function* checkTaskApiSaga({ taskName }) {
	try {
		const { status } = yield call(() => toDoListService.checkTaskApi(taskName));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_TASKLIST_API_SAGA });
		}
	} catch (error) {}
}

export function* watchCheckTaskApiSaga() {
	yield takeLatest(CHECK_TASK_API_SAGA, checkTaskApiSaga);
}

//----------------REJECT TASK API------------------
function* rejectTaskApiSaga({ taskName }) {
	try {
		const { status } = yield call(() => toDoListService.rejectTaskApi(taskName));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_TASKLIST_API_SAGA });
		}
	} catch (error) {}
}

export function* watchRejectTaskApiSaga() {
	yield takeLatest(REJECT_TASK_API_SAGA, rejectTaskApiSaga);
}
