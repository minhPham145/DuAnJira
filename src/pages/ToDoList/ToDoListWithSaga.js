import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bgTodolist from '../../assets/imgToDoList/bg.png';
import { ADD_TASK_API_SAGA, CHECK_TASK_API_SAGA, DELETE_TASK_API_SAGA, GET_TASKLIST_API_SAGA, REJECT_TASK_API_SAGA } from '../../redux/constants/ToDoListConstants';

export default function ToDoListWithSaga() {
	const dispatch = useDispatch();
	const { taskList } = useSelector(state => state.ToDoListReducer);

	const [state, setState] = useState({
		taskList: [],
		values: {
			taskName: '',
		},
		errors: {
			taskName: '',
		},
	});

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

	const getTaskList = () => {
		dispatch({ type: GET_TASKLIST_API_SAGA });
	};

	const addTask = e => {
		e.preventDefault();

		const errors = { ...state.errors };
		let valid = true;
		for (let key in errors) {
			if (errors[key] !== '') {
				valid = false;
			}
		}

		if (valid) {
			dispatch({
				type: ADD_TASK_API_SAGA,
				taskName: state.values.taskName,
			});
		}
	};

	const delTask = taskName => {
		dispatch({
			type: DELETE_TASK_API_SAGA,
			taskName,
		});
	};

	const checkTask = taskName => {
		dispatch({
			type: CHECK_TASK_API_SAGA,
			taskName,
		});
	};

	const rejectTask = taskName => {
		dispatch({
			type: REJECT_TASK_API_SAGA,
			taskName,
		});
	};

	useEffect(() => {
		getTaskList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

				<form className='card__body' onSubmit={addTask}>
					<div className='card__content'>
						<div className='card__title'>
							<h2>My Tasks</h2>
							<p>September 9,2020</p>
						</div>
						<div className='card__add'>
							<input id='newTask' name='taskName' type='text' placeholder='Enter an activity...' onChange={handleChange} />
							<button id='addItem' onClick={addTask}>
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
