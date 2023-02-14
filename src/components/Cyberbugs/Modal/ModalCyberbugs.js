import { Popconfirm, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHTMLParse from 'html-react-parser';
import { Editor } from '@tinymce/tinymce-react';
import { CloseOutlined } from '@ant-design/icons';
import {
	//action
	changeAssignessAction,
	changeTaskModalAction,
	removeAssignessAction,
	getAllPriorityAction,
	getAllStatusAction,
	getAllTaskTypeAction,
	insertCommentAction,
	updateCommentAction,
	deleteCommentAction,
} from '../../../redux/actions/CyberBugsAction';

export default function ModalCyberbugs(props) {
	const dispatch = useDispatch();

	const { taskDetailModal } = useSelector(state => state.TaskReducer);
	const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
	const { arrStatus } = useSelector(state => state.StatusReducer);
	const { arrPriority } = useSelector(state => state.PriorityReducer);
	const { projectDetail } = useSelector(state => state.ProjectReducer);
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);

	const [visibleEditor, setVisibleEditor] = useState(false);
	const [visibleComment, setVisibleComment] = useState(false);
	const [visibleEditComment, setVisibleEditComment] = useState(false);
	const [idEditComment, setIdEditComment] = useState();

	const editorRef = useRef(null);
	const commentRef = useRef(null);
	const editCommentRef = useRef(null);
	const modalRef = useRef(null);

	const renderDescription = () => {
		const jsxDescription = taskDetailModal.description ? ReactHTMLParse(taskDetailModal.description) : '';
		return visibleEditor ? (
			<div>
				<Editor
					name='description'
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue={taskDetailModal.description}
					init={{
						height: 180,
						menubar: false,
						plugins: 'emoticons help lists code advlist table',
						toolbar: `blocks bold italic underline |forecolor backcolor | code emoticons | strikethrough table | numlist bullist | alignleft aligncenter alignright alignjustify | removeformat help`,
					}}
				/>
				<button
					className='btn btn-primary mr-2 mt-2'
					onClick={() => {
						setVisibleEditor(false);
						dispatch(changeTaskModalAction('description', editorRef.current.getContent()));
					}}>
					save
				</button>
				<button className='btn btn-outline-primary mt-2' onClick={() => setVisibleEditor(false)}>
					close
				</button>
			</div>
		) : (
			<div style={{ wordBreak: 'break-word' }} onClick={() => setVisibleEditor(true)}>
				{jsxDescription}
			</div>
		);
	};

	const renderTimeTracking = () => {
		const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
		const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
		const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
		return (
			<div>
				<div style={{ display: 'flex' }}>
					<i className='fa fa-clock mr-2' style={{ fontSize: '10px' }} />
					<div style={{ width: '100%' }}>
						<div className='progress' style={{ height: '5px' }}>
							<div className='progress-bar' role='progressbar' style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<p className='logged'>{Number(timeTrackingSpent)}h logged</p>
							<p className='estimate-time'>{Number(timeTrackingRemaining)}h remaining</p>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
						<input type='number' className='form-control' name='timeTrackingSpent' value={timeTrackingSpent || ''} onChange={handleChange} />
					</div>
					<div className='col-6'>
						<input type='number' className='form-control' name='timeTrackingRemaining' value={timeTrackingRemaining || ''} onChange={handleChange} />
					</div>
				</div>
			</div>
		);
	};

	const renderBlockComment = () => {
		return visibleComment ? (
			<div>
				<Editor
					name='addComment'
					onInit={(evt, editor) => (commentRef.current = editor)}
					init={{
						height: 150,
						menubar: false,
						plugins: 'emoticons help lists code advlist table',
						toolbar: `blocks bold italic underline |forecolor backcolor | code emoticons | strikethrough table | numlist bullist | alignleft aligncenter alignright alignjustify | removeformat help`,
					}}
				/>
				<button
					className='btn btn-primary mr-2 mt-2'
					onClick={() => {
						setVisibleComment(false);
						dispatch(insertCommentAction(taskDetailModal.taskId, commentRef.current.getContent()));
					}}>
					save
				</button>
				<button
					className='btn btn-outline-primary mt-2'
					onClick={() => {
						setVisibleComment(false);
					}}>
					close
				</button>
			</div>
		) : (
			<div onClick={() => setVisibleComment(true)} className='input-comment' style={{ width: '100%', cursor: 'pointer' }}>
				<input style={{ pointerEvents: 'none' }} className='form-control inputComment' defaultValue={'Add a comment ...'} />
				<p>
					<span style={{ fontWeight: 500 }}>Protip: </span>
					<span>
						press <span style={{ fontWeight: 'bold', background: '#E4E4E4', color: '#045757', padding: '0px 2px' }}>M</span> to comment
					</span>
				</p>
			</div>
		);
	};

	const renderComment = () => {
		return taskDetailModal.lstComment?.map((comment, index) => {
			return (
				<div key={index} className='comment-item' style={{ marginTop: '25px' }}>
					<div className='display-comment d-flex'>
						<div className='avatar'>
							<img style={{ marginRight: '1rem' }} src={comment.avatar} alt='avatar' />
						</div>
						{visibleEditComment && idEditComment === comment.id ? (
							<div>
								<Editor
									name='editComment'
									onInit={(evt, editor) => (editCommentRef.current = editor)}
									initialValue={comment.commentContent}
									init={{
										height: 150,
										menubar: false,
										plugins: 'emoticons help lists code advlist table',
										toolbar: `blocks bold italic underline |forecolor backcolor | code emoticons | strikethrough table | numlist bullist | alignleft aligncenter alignright alignjustify | removeformat help`,
									}}
								/>
								<button
									className='btn btn-primary mr-2 mt-2'
									onClick={() => {
										setVisibleEditComment(false);
										dispatch(updateCommentAction(comment.id, editCommentRef.current.getContent(), taskDetailModal.taskId));
									}}>
									save
								</button>
								<button
									className='btn btn-outline-primary mt-2'
									onClick={() => {
										setVisibleEditComment(false);
									}}>
									close
								</button>
							</div>
						) : (
							<div>
								<h6 style={{ marginBottom: 5 }}>{comment.name}</h6>
								<div style={{ marginBottom: 5 }}>{ReactHTMLParse(comment.commentContent)}</div>

								<div>
									<span
										className='actionCommentBtn'
										onClick={() => {
											setIdEditComment(comment.id);
											setVisibleEditComment(true);
										}}>
										Edit
									</span>{' '}
									•{' '}
									<Popconfirm
										title='Delete comment'
										description='Are you sure to delete this comment?'
										okText='Yes'
										cancelText='No'
										onConfirm={() => {
											dispatch(deleteCommentAction(comment.id, taskDetailModal.taskId));
										}}>
										<span className='actionCommentBtn'>Delete</span>
									</Popconfirm>
								</div>
							</div>
						)}
					</div>
				</div>
			);
		});
	};

	const handleChange = e => {
		const { name, value } = e.target;
		dispatch(changeTaskModalAction(name, value));
	};

	useEffect(() => {
		dispatch(getAllTaskTypeAction());
		dispatch(getAllStatusAction());
		dispatch(getAllPriorityAction());

		document.addEventListener('keydown', e => {
			if (document.activeElement.className === 'form-control') {
				return;
			}

			if (modalRef.current && modalRef.current.classList.contains('show')) {
				if (e.key === 'm') {
					setVisibleComment(true);
				}
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div ref={modalRef} className='modal fade' id='infoModal' tabIndex={-1} role='dialog' aria-labelledby='infoModal' aria-hidden='true'>
			<div className='modal-dialog modal-info modal-xl'>
				<div className='modal-content'>
					<div className='modal-header' style={{ padding: '2rem', border: 'none' }}>
						<div className='task-title'>
							<div className='d-flex align-items-center'>
								<i className='fa fa-bookmark mr-2' style={{ color: '#045757', fontSize: '20px' }} />
								<select className='form-control p-0 mr-2' name='typeId' value={taskDetailModal.typeId} style={{ height: '24px' }} onChange={handleChange}>
									{arrTaskType.map((tp, index) => {
										return (
											<option key={index} value={tp.id}>
												{tp.taskType}
											</option>
										);
									})}
								</select>
								<div style={{ whiteSpace: 'nowrap' }}>TASK-{taskDetailModal.taskId}</div>
							</div>
						</div>
						<div className='task-click' style={{ display: 'flex', alignItems: 'center' }}>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>×</span>
							</button>
						</div>
					</div>

					<div className='modal-body' style={{ padding: '2rem', paddingTop: 0 }}>
						<div className='row'>
							<div className='col-8'>
								<h3 className='mb-5'>{taskDetailModal.taskName}</h3>
								<div className='description mb-5'>
									<h6 className='mb-2' onClick={() => setVisibleEditor(true)} style={{ cursor: 'pointer' }}>
										Description
									</h6>
									{renderDescription()}
								</div>

								<div className='comment'>
									<h6 className='mb-4'>Comment</h6>
									<div className='block-comment' style={{ display: 'flex' }}>
										<div className='avatar'>
											<img style={{ marginRight: '1rem' }} src={userLogin.avatar} alt='avatar' />
										</div>
										{renderBlockComment()}
									</div>
									<div className='lastest-comment'>{renderComment()}</div>
								</div>
							</div>

							<div className='col-4'>
								<div className='status' style={{ marginBottom: '20px' }}>
									<h6>STATUS</h6>
									<select className='form-control' name='statusId' value={taskDetailModal.statusId} onChange={handleChange}>
										{arrStatus.map((status, index) => {
											return (
												<option key={index} value={status.statusId}>
													{status.statusName}
												</option>
											);
										})}
									</select>
								</div>

								<div className='assignees' style={{ marginBottom: '20px' }}>
									<h6>ASSIGNEES</h6>
									<div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
										{taskDetailModal.assigness?.map((user, index) => {
											return (
												<div className='item mr-1 mb-1' key={index} style={{ display: 'flex', alignItems: 'center' }}>
													<div className='avatar'>
														<img src={user.avatar} alt={user.avatar} />
													</div>
													<p className='name'>{user.name}</p>
													<CloseOutlined className='m-1' onClick={() => dispatch(removeAssignessAction(user.id))} />
												</div>
											);
										})}
										<div className='item addmores mb-1'>
											<Select
												value='+ Add more'
												name='lstUser'
												style={{ height: 30, width: '100%' }}
												options={projectDetail.members
													?.filter(mem => {
														let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
														if (index !== -1) {
															return false;
														}
														return true;
													})
													.map(member => {
														return { value: member.userId, label: member.name };
													})}
												onSelect={value => {
													let userSelected = projectDetail.members.find(mem => mem.userId === value);
													userSelected = { ...userSelected, id: userSelected.userId };
													dispatch(changeAssignessAction(userSelected));
												}}></Select>
										</div>
									</div>
								</div>

								<div className='priority' style={{ marginBottom: 20 }}>
									<h6>PRIORITY</h6>
									<select className='form-control' name='priorityId' value={taskDetailModal.priorityId} onChange={handleChange} style={{ background: '#f2f3f7' }}>
										{arrPriority.map((priority, index) => {
											return (
												<option key={index} value={priority.priorityId}>
													{priority.priority}
												</option>
											);
										})}
									</select>
								</div>

								<div className='estimate' style={{ marginBottom: 20 }}>
									<h6>ORIGINAL ESTIMATE (HOURS)</h6>
									<input type='number' className='form-control' name='originalEstimate' value={taskDetailModal.originalEstimate || ''} onChange={handleChange} />
								</div>

								<div className='time-tracking' style={{ marginBottom: '20px' }}>
									<h6>TIME TRACKING</h6>
									{renderTimeTracking()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
