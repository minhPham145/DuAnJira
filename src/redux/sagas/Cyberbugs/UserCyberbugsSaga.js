import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { userService } from '../../../services/UserService';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { history } from '../../../util/history';
import { openNotificationWithIcon } from '../../../util/Notification/NotificationCyberbugs';
import { ASSIGN_USER_PROJECT_SAGA, CLOSE_DRAWER, DELETE_USER_MANAGEMENT_SAGA, EDIT_USER_MANAGEMENT_SAGA, GET_ALL_PROJECT_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_MANAGEMENT, GET_USER_MANAGEMENT_SAGA, GET_USER_SAGA, GET_USER_SEARCH, REMOVE_USER_PROJECT_SAGA, USER_SIGNIN_SAGA, USER_SIGNUP_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

//SIGN IN
function* signInSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);

	try {
		const { data, status } = yield call(() => userService.signInCyberBugs(action.userLogin));

		if (status === STATUS_CODE.SUCCESS) {
			//Lưu vào localStorage
			localStorage.setItem(TOKEN, data.content.accessToken);
			localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

			history.push('/home');
			openNotificationWithIcon('success', 'Logged in successfully!');

			yield put({
				type: USER_LOGIN,
				userLogin: data.content,
			});
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Incorrect username or password');
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchSignInSaga() {
	yield takeLatest(USER_SIGNIN_SAGA, signInSaga);
}

//GET USER
function* getUserSaga(action) {
	try {
		const { data, status } = yield call(() => userService.getUser(action.keyWord));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USER_SEARCH,
				lstUserSearch: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetUserSaga() {
	yield takeLatest(GET_USER_SAGA, getUserSaga);
}

//ASSIGN USER
function* assignUserProjectSaga(action) {
	try {
		const { status } = yield call(() => userService.assignUserProject(action.userProject));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_ALL_PROJECT_SAGA });
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchAssignUserProjectSaga() {
	yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

//REMOVE USER
function* removeUserProjectSaga(action) {
	try {
		const { status } = yield call(() => userService.removeUserFromProject(action.userProject));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: GET_ALL_PROJECT_SAGA });
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchRemoveUserProjectSaga() {
	yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga);
}

//GET USER BY PROJECT ID
function* getUserByProjectIdSaga(action) {
	try {
		const { data, status } = yield call(() => userService.getUserByProjectId(action.projectId));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USER_BY_PROJECT_ID,
				arrUser: data.content,
			});
		}
	} catch (error) {
		if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
			yield put({
				type: GET_USER_BY_PROJECT_ID,
				arrUser: [],
			});
		}
	}
}

export function* watchGetUserByProjectIdSaga() {
	yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

//SIGN UP USER
function* signUpSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);

	try {
		const { status } = yield call(() => userService.signUpCyberBugs(action.userSignUp));

		if (status === STATUS_CODE.SUCCESS) {
			openNotificationWithIcon('success', 'Sign up successfully!');
			history.push('/login');
		}
	} catch (error) {
		const messageError = error.response?.data.message;
		openNotificationWithIcon('error', messageError);
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchSignUpSaga() {
	yield takeLatest(USER_SIGNUP_SAGA, signUpSaga);
}

//GET USER MANAGEMENT
function* getUserManagementSaga(action) {
	try {
		const { data, status } = yield call(() => userService.getUser(action.keyWord));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USER_MANAGEMENT,
				userManagement: data.content,
			});
		}
	} catch (error) {
		alert(error);
	}
}

export function* watchGetUserManagementSaga() {
	yield takeLatest(GET_USER_MANAGEMENT_SAGA, getUserManagementSaga);
}

//EDIT USER MANAGEMENT
function* editUserManagementSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(1000);
	try {
		const { status } = yield call(() => userService.editUser(action.userEditModel));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: CLOSE_DRAWER });
			yield put({
				type: GET_USER_MANAGEMENT_SAGA,
				keyWord: '',
			});
			openNotificationWithIcon('success', 'Update user successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Update user fail!');
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchEditUserManagementSaga() {
	yield takeLatest(EDIT_USER_MANAGEMENT_SAGA, editUserManagementSaga);
}

//DELETE USER MANAGEMENT
function* deleteUserManagementSaga(action) {
	yield put({ type: DISPLAY_LOADING });
	yield delay(500);
	try {
		const { status } = yield call(() => userService.deleteUser(action.userId));

		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: CLOSE_DRAWER });
			yield put({
				type: GET_USER_MANAGEMENT_SAGA,
				keyWord: '',
			});
			openNotificationWithIcon('success', 'Delete user successfully!');
		}
	} catch (error) {
		openNotificationWithIcon('error', 'Delete user fail!');
	}
	yield put({ type: HIDE_LOADING });
}

export function* watchDeleteUserManagementSaga() {
	yield takeLatest(DELETE_USER_MANAGEMENT_SAGA, deleteUserManagementSaga);
}
