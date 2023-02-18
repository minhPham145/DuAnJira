import { call, put, takeLatest } from 'redux-saga/effects';
import { projectService } from '../../../services/ProjectService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';

function* getAllProjectCategorySaga() {
	try {
		const { data, status } = yield call(() => projectService.getAllProjectCategory());

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_PROJECT_CATEGORY,
				data: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetAllProjectCategorySaga() {
	yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
