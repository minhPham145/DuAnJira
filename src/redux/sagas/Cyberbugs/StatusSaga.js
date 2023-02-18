import { call, put, takeLatest } from 'redux-saga/effects';
import { statusService } from '../../../services/StatusService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';

function* getAllStatusSaga() {
	try {
		const { data, status } = yield call(() => statusService.getAllStatus());
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_STATUS,
				arrStatus: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetAllStatusSaga() {
	yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
