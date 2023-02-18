import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { taskService } from '../../../services/TaskService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { openNotificationWithIcon } from '../../../util/Notification/NotificationCyberbugs';

import { CHANGE_ASSIGNESS, CHANGE_STATUS_TASK, CHANGE_TASK_MODAL, CLOSE_DRAWER, CREATE_TASK_SAGA, GET_PROJECT_DETAIL_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_BY_DRAG_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

function* createTaskSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);

	try {
		const { status } = yield call(() => taskService.createTask(action.taskObject));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: CLOSE_DRAWER });
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: action.taskObject.projectId,
			});
			openNotificationWithIcon('success', 'create task successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'create task fail!');
	}

	yield put({ type: HIDE_LOADING });
}

export function* watchCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//get task detail
function* getTaskDetailSaga(action) {
	try {
		const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId));
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASK_DETAIL,
				taskDetailModal: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetTaskDetailSaga() {
	yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

//cap nhat status task..
function* updateStatusTaskSaga(action) {
	try {
		const { status } = yield call(() => taskService.updateStatusTask(action.taskStatusUpdate));
		if (status === STATUS_CODE.SUCCESS) {
			openNotificationWithIcon('success', 'Update status task successfully!');
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: action.taskStatusUpdate.taskId,
			});

			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: action.taskStatusUpdate.projectId,
			});
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Update status task fail!');
	}
}

export function* watchUpdateStatusTaskSaga() {
	yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}

//update task saga
function* updateTaskSaga(action) {
	switch (action.actionType) {
		case CHANGE_TASK_MODAL: {
			const { name, value } = action;
			yield put({ type: CHANGE_TASK_MODAL, name, value });
			break;
		}

		case CHANGE_ASSIGNESS: {
			const { userSelected } = action;
			yield put({ type: CHANGE_ASSIGNESS, userSelected });
			break;
		}

		case REMOVE_USER_ASSIGN: {
			const { userId } = action;
			yield put({ type: REMOVE_USER_ASSIGN, userId });
			break;
		}
		default:
			return;
	}

	const { taskDetailModal } = yield select(state => state.TaskReducer);
	const listUserAsign = taskDetailModal.assigness.map(user => user.id);
	const taskUpdate = { ...taskDetailModal, listUserAsign };

	try {
		const { status } = yield call(() => taskService.updateTask(taskUpdate));
		if (status === STATUS_CODE.SUCCESS) {
			openNotificationWithIcon('success', 'Update task successfully!');
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: taskUpdate.taskId,
			});

			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: taskUpdate.projectId,
			});
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Update task fail!');
	}
}

export function* watchUpdateTaskSaga() {
	yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, updateTaskSaga);
}

//update status saga by drag
function* updateStatusTaskByDragSaga(action) {
	const { draggableId, destination, source, projectId } = action;

	yield put({
		type: CHANGE_STATUS_TASK,
		draggableId,
		destination,
		source,
	});

	yield put({
		type: UPDATE_STATUS_TASK_SAGA,
		taskStatusUpdate: {
			taskId: draggableId,
			statusId: destination.droppableId,
			projectId: projectId,
		},
	});
}

export function* watchUpdateStatusTaskByDragSaga() {
	yield takeLatest(UPDATE_STATUS_TASK_BY_DRAG_SAGA, updateStatusTaskByDragSaga);
}
