import { call, put, takeLatest } from 'redux-saga/effects';
import { taskTypeService } from '../../../services/TaskTypeService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';

function* getAllTaskTypeSaga() {
	try {
		const { data, status } = yield call(() => taskTypeService.getAllTaskType());

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_TASK_TYPE,
				arrTaskType: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetAllTaskTypeSaga() {
	yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
