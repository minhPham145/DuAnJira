import React from 'react';
import { useDispatch } from 'react-redux';
import ReactHTMLParse from 'html-react-parser';
import { Avatar, Empty } from 'antd';
import { changeStatusTaskByDragAction, getTaskDetailAction } from '../../../redux/actions/CyberBugsAction';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function ContentMain(props) {
	const dispatch = useDispatch();

	const { lstTask, id } = props.projectDetail;

	const renderPriority = taskPriority => {
		return taskPriority.priority === 'High' ? <p className='mb-0 font-weight-bold text-danger'>{taskPriority.priority}</p> : taskPriority.priority === 'Medium' ? <p className='mb-0 font-weight-bold text-warning'>{taskPriority.priority}</p> : taskPriority.priority === 'Low' ? <p className='mb-0 font-weight-bold text-success'>{taskPriority.priority}</p> : <p className='mb-0 font-weight-bold text-primary'>{taskPriority.priority}</p>;
	};

	const handleDragEnd = result => {
		const { draggableId, destination, source } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId) {
			return;
		}
		dispatch(changeStatusTaskByDragAction(draggableId, destination, source, id));
	};

	const renderCardTaskList = () => {
		return (
			<DragDropContext onDragEnd={handleDragEnd}>
				{lstTask.map((cardTask, index) => {
					return (
						<Droppable droppableId={cardTask.statusId} key={index}>
							{provided => {
								return (
									<div className='card' style={{ height: 'auto' }}>
										<div className='card-header'>{cardTask.statusName}</div>
										<ul ref={provided.innerRef} {...provided.droppableProps} className='list-group list-group-flush'>
											{cardTask.lstTaskDeTail.map((taskDetail, index) => {
												return (
													<Draggable draggableId={taskDetail.taskId.toString()} key={taskDetail.taskId.toString()} index={index}>
														{provided => {
															return (
																<li
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	onClick={() => {
																		dispatch(getTaskDetailAction(taskDetail.taskId));
																	}}
																	className='list-group-item'
																	key={index}
																	data-toggle='modal'
																	data-target='#infoModal'>
																	<div className='text-muted description__task'>{ReactHTMLParse(taskDetail.taskName)}</div>
																	<div className='block d-flex align-items-center'>
																		{renderPriority(taskDetail.priorityTask)}
																		<Avatar.Group maxCount={3} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className='avatar-group'>
																			{taskDetail.assigness.map((user, index) => {
																				return <Avatar src={user.avatar} key={index} />;
																			})}
																		</Avatar.Group>
																	</div>
																</li>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</ul>
									</div>
								);
							}}
						</Droppable>
					);
				})}
			</DragDropContext>
		);
	};

	if (lstTask) {
		return (
			<div className='content' style={{ display: 'flex' }}>
				{renderCardTaskList()}
			</div>
		);
	} else {
		return (
			<div style={{ marginTop: '100px' }}>
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</div>
		);
	}
}
