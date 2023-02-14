/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import bgTodolist from '../../assets/imgToDoList/bg.png';

import { useDispatch, useSelector } from 'react-redux';

import { addTaskApi, checkTaskApi, delTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListActions';

export default function TodolistRedux(props) {
	const { taskList } = useSelector(state => state.ToDoListReducer);
	const dispatch = useDispatch();

	const [state, setState] = useState({
		values: {
			taskName: '',
		},
		errors: {
			taskName: '',
		},
	});

	const getTaskList = () => {
		dispatch(getTaskListApi());
	};

	const handleChange = e => {
		const { name, value } = e.target;
		const newValues = { ...state.values, [name]: value };
		let newErrors = { ...state.errors };

		let regexString = /^[a-z A-Z]+$/;

		if (!regexString.test(value)) {
			newErrors[name] = name + ' invalid !';
		} else {
			newErrors[name] = '';
		}

		setState({
			...state,
			values: newValues,
			errors: newErrors,
		});
	};

	useEffect(() => {
		getTaskList();
	}, []);

	const addTask = e => {
		e.preventDefault();
		dispatch(addTaskApi(state.values, state.errors));
	};

	const delTask = taskName => {
		dispatch(delTaskApi(taskName));
	};

	const checkTask = taskName => {
		dispatch(checkTaskApi(taskName));
	};

	const rejectTask = taskName => {
		dispatch(rejectTaskApi(taskName));
	};

	const renderTaskTodo = () => {
		return taskList
			.filter(item => !item.status)
			.map((item, index) => {
				return (
					<li key={index}>
						<span>{item.taskName}</span>
						<div className='buttons'>
							<button
								className='remove'
								type='button'
								onClick={() => {
									delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									checkTask(item.taskName);
								}}>
								<i className='far fa-check-circle' />
							</button>
						</div>
					</li>
				);
			});
	};

	const renderTaskTodoDone = () => {
		return taskList
			.filter(item => item.status)
			.map((item, index) => {
				return (
					<li key={index}>
						<span>{item.taskName}</span>
						<div className='buttons'>
							<button
								className='remove'
								type='button'
								onClick={() => {
									delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									rejectTask(item.taskName);
								}}>
								<i className='fa fa-undo'></i>
							</button>
						</div>
					</li>
				);
			});
	};

	return (
		<div className='toDoList'>
			<div className='card__toDoList'>
				<div className='card__header'>
					<img src={bgTodolist} alt='bg' />
				</div>
				{/* <h2>hello!</h2> */}
				<form className='card__body' onSubmit={addTask}>
					<div className='card__content'>
						<div className='card__title'>
							<h2>My Tasks</h2>
							<p>September 9,2020</p>
						</div>
						<div className='card__add'>
							<input id='newTask' name='taskName' type='text' placeholder='Enter an activity...' onChange={handleChange} />
							<button id='addItem'>
								<i className='fa fa-plus' />
							</button>
						</div>
						<div className='text-danger' style={{ height: '15px' }}>
							{state.errors.taskName}
						</div>
						<div className='card__todo'>
							{/* Uncompleted tasks */}
							<ul className='todo' id='todo'>
								{renderTaskTodo()}
							</ul>
							{/* Completed tasks */}
							<ul className='todo' id='completed'>
								{renderTaskTodoDone()}
							</ul>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
