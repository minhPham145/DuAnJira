import { BaseService } from './BaseService';

class UserService extends BaseService {
	signInCyberBugs = userLogin => {
		return this.post(`users/signin`, userLogin);
	};

	getUser = keyWord => {
		return this.get(`Users/getUser?keyword=${keyWord}`);
	};

	assignUserProject = userProject => {
		return this.post(`Project/assignUserProject`, userProject);
	};

	removeUserFromProject = userProject => {
		return this.post(`Project/removeUserFromProject`, userProject);
	};

	getUserByProjectId = projectId => {
		return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
	};

	signUpCyberBugs = userSignUp => {
		return this.post(`Users/signup`, userSignUp);
	};

	editUser = editUserModel => {
		return this.put(`Users/editUser`, editUserModel);
	};

	deleteUser = userId => {
		return this.delete(`Users/deleteUser?id=${userId}`);
	};
}

export const userService = new UserService();
