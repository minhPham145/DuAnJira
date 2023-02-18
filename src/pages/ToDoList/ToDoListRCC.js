import React, { Component } from 'react';
import bgTodolist from '../../assets/imgToDoList/bg.png';
import axios from 'axios';

export default class ToDoListRCC extends Component {
	state = {
		taskList: [],
		values: {
			taskName: '',
		},
		errors: {
			taskName: '',
		},
	};

	getTaskList = () => {
		let promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
			method: 'GET',
		});

		promise.then(result => {
			this.setState({
				taskList: result.data,
			});
		});
		promise.catch(error => {
			alert(error);
		});
	};

	renderTaskToDo = () => {
		return this.state.taskList
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
									this.delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									this.checkTask(item.taskName);
								}}>
								<i className='far fa-check-circle' />
							</button>
						</div>
					</li>
				);
			});
	};

	renderTaskToDoDone = () => {
		return this.state.taskList
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
									this.delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									this.rejectTask(item.taskName);
								}}>
								<i className='fa fa-undo'></i>
							</button>
						</div>
					</li>
				);
			});
	};

	componentDidMount() {
		this.getTaskList();
	}

	handleChange = e => {
		let { value, name } = e.target;

		let newValues = { ...this.state.values };
		newValues = { ...newValues, [name]: value };

		let newErrors = { ...this.state.errors };
		let regexString = /^[a-z A-Z]+$/;

		if (!regexString.test(value)) {
			newErrors[name] = name + ' invalid !';
		} else {
			newErrors[name] = '';
		}

		this.setState({
			...this.state,
			values: newValues,
			errors: newErrors,
		});
	};

	addTask = e => {
		e.preventDefault();

		const errors = { ...this.state.errors };
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
				data: this.state.values,
			});

			promise.then(result => {
				alert('Add task success!');
				this.getTaskList();
			});
			promise.catch(error => {
				alert(error.response.data);
			});
		}
	};

	delTask = taskName => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/deleteTask',
			method: 'DELETE',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			this.getTaskList();
		});
		promise.catch(error => {
			alert(error.response.data);
		});
	};

	checkTask = taskName => {
		const promise = axios({
			url: 'https://svcy.myclass.vn/api/ToDoList/doneTask',
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			this.getTaskList();
		});

		promise.catch(error => {
			alert(error.response.data);
		});
	};

	rejectTask = taskName => {
		const promise = axios({
			url: '	https://svcy.myclass.vn/api/ToDoList/rejectTask',
			method: 'PUT',
			params: {
				taskName: taskName,
			},
		});

		promise.then(result => {
			alert(result.data);
			this.getTaskList();
		});

		promise.catch(error => {
			alert(error.response.data);
		});
	};

	render() {
		return (
			<div className='toDoList'>
				<form onSubmit={this.addTask}>
					{/* <button onClick={() => this.getTaskList()} className='btn btn-primary'>
					GET TASK LIST
				</button> */}
					<div className='card__toDoList'>
						<div className='card__header'>
							<img src={bgTodolist} alt='bg' />
						</div>
						{/* <h2>hello!</h2> */}
						<div className='card__body'>
							<div className='card__content'>
								<div className='card__title'>
									<h2>My Tasks</h2>
									<p>September 9,2020</p>
								</div>
								<div className='card__add'>
									<input name='taskName' id='newTask' type='text' placeholder='Enter an activity...' onChange={this.handleChange} />
									<button id='addItem' onClick={this.addTask}>
										<i className='fa fa-plus' />
									</button>
								</div>
								<div className='text-danger' style={{ height: '15px' }}>
									{this.state.errors.taskName}
								</div>

								<div className='card__todo'>
									{/* Uncompleted tasks */}
									<ul className='todo' id='todo'>
										{this.renderTaskToDo()}
									</ul>
									{/* Completed tasks */}
									<ul className='todo' id='completed'>
										{this.renderTaskToDoDone()}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
