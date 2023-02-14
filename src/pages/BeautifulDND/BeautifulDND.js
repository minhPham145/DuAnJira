import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function BeautifulDND() {
	const [state, setState] = useState({
		toDo: {
			id: 'toDo',
			items: [
				{ id: '1', taskName: 'Task 1' },
				{ id: '2', taskName: 'Task 2' },
				{ id: '3', taskName: 'Task 3' },
			],
		},

		inProgress: {
			id: 'inProgress',
			items: [
				{ id: '4', taskName: 'Task 4' },
				{ id: '5', taskName: 'Task 5' },
				{ id: '6', taskName: 'Task 6' },
			],
		},

		done: {
			id: 'done',
			items: [
				{ id: '7', taskName: 'Task 7' },
				{ id: '8', taskName: 'Task 8' },
				{ id: '9', taskName: 'Task 9' },
			],
		},
	});

	const onDragEnd = result => {
		let { destination, source } = result;

		if (!destination) {
			return;
		}

		if (destination.index === source.index && destination.droppableId === source.droppableId) {
			return;
		}

		//tao ra 1 tag drag
		let itemCopy = { ...state[source.droppableId].items[source.index] };

		//droppable bat dau keo
		let dropSource = state[source.droppableId].items.filter(item => item.id !== itemCopy.id);
		state[source.droppableId].items = dropSource;

		//droppable tha vao
		let dropDestination = state[destination.droppableId].items;
		dropDestination.splice(destination.index, 0, itemCopy);
		state[destination.droppableId].items = dropDestination;
	};

	return (
		<div className='container mt-5'>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className='row'>
					{_.map(state, (statusTask, index) => {
						return (
							<Droppable droppableId={statusTask.id} key={index}>
								{provided => {
									return (
										<div className='col-4'>
											<div className='bg-dark p-5' ref={provided.innerRef} {...provided.droppableProps}>
												{statusTask.items.map((item, index) => {
													return (
														<Draggable key={item.id} index={index} draggableId={item.id}>
															{provided => {
																return (
																	<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='p-2 text-center'>
																		<div className='p-3 bg-white'> {item.taskName}</div>
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										</div>
									);
								}}
							</Droppable>
						);
					})}
				</div>
			</DragDropContext>
		</div>
	);
}
