import { BaseService } from './BaseService';

class CommentService extends BaseService {
	insertComment = taskComment => {
		return this.post(`Comment/insertComment`, taskComment);
	};

	updateComment = (id, contentComment) => {
		return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`);
	};

	deleteComment = idComment => {
		return this.delete(`Comment/deleteComment?idComment=${idComment}`);
	};
}

export const commentService = new CommentService();
