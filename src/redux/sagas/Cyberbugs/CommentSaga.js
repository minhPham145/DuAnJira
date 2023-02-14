import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { commentService } from '../../../services/CommentService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { openNotificationWithIcon } from '../../../util/Notification/NotificationCyberbugs';
import { DELETE_COMMENT_SAGA, GET_TASK_DETAIL_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

//insert Comment
function* insertCommentSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(500);
	try {
		const { status } = yield call(() => commentService.insertComment(action.taskComment));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: action.taskComment.taskId,
			});
			openNotificationWithIcon('success', 'Add comment successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Add comment fail!');
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchInsertCommentSaga() {
	yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

//update Comment
function* updateCommentSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(500);
	try {
		const { status } = yield call(() => commentService.updateComment(action.idComment, action.contentComment));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: action.taskId,
			});
			openNotificationWithIcon('success', 'Update comment successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Update comment fail!');
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchUpdateCommentSaga() {
	yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

//delete Comment
function* deleteCommentSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(500);
	try {
		const { status } = yield call(() => commentService.deleteComment(action.idComment));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: action.taskId,
			});
			openNotificationWithIcon('success', 'Delete comment successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Delete comment fail!');
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchDeleteCommentSaga() {
	yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
