import axios from 'axios';
import React, { useEffect, useState } from 'react';
import bgTodolist from '../../assets/imgToDoList/bg.png';
import './ToDoList.css';

export default function ToDoListRFC() {
	const [state, setState] = useState({
		taskList: [],
		values: {
			taskName: '',
		},
		errors: {
			taskName: '',
		},
	});

	const getTaskList = () => {
		let promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
			method: 'GET',
		});

		promise.then(result => {
			setState({
				...state,
				taskList: result.data,
			});
		});
		promise.catch(error => {
			alert(error.response.data);
		});
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
			const promise = axios({
				url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
				method: 'POST',
				data: state.values,
			});

			promise.then(result => {
				alert('Add task success!');
				getTaskList();
			});
			promise.catch(error => {
				alert(error.response.data);
			});
		}
	};

	useEffect(() => {
		getTaskList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const delTask = taskName => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/deleteTask',
			method: 'DELETE',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			getTaskList();
		});
		promise.catch(error => {
			alert(error.response.data);
		});
	};

	const checkTask = taskName => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/doneTask',
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			getTaskList();
		});

		promise.catch(error => {
			alert(error.response.data);
		});
	};

	const rejectTask = taskName => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/rejectTask',
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			getTaskList();
		});

		promise.catch(error => {
			alert(error.response.data);
		});
	};

	const renderTaskTodo = () => {
		return state.taskList
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
		return state.taskList
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
