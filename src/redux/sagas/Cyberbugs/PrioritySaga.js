import { call, put, takeLatest } from 'redux-saga/effects';
import { priorityService } from '../../../services/PriorityService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';

function* getAllPrioritySaga() {
	try {
		const { data, status } = yield call(() => priorityService.getAllPriority());

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_PRIORITY,
				arrPriority: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetAllPrioritySaga() {
	yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
