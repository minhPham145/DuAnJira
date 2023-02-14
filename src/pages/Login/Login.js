import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';

export default function Login(props) {
	const [userLogin, setUserLogin] = useState({ username: '', password: '', status: false });

	const handleChange = event => {
		const { name, value } = event.target;
		const newUserLogin = { ...userLogin, [name]: value };

		newUserLogin.status = false;
		for (let key in newUserLogin) {
			if (key !== 'status') {
				if (newUserLogin[key] === '') {
					newUserLogin.status = true;
				}
			}
		}

		setUserLogin(newUserLogin);
	};

	const handleLogin = event => {
		event.preventDefault();
		if (userLogin.username === 'minh' && userLogin.password === '12345') {
			//goBack: chuyển về trang trước
			//push: chuyển đến trang chỉ định
			//replace: thay đổi nội dung;

			// props.history.push('/home');
			// props.history.replace('/home');
			props.history.goBack();
			localStorage.setItem('userLogin', JSON.stringify(userLogin));
		} else {
			alert('Invalid username or password!');
			return;
		}
	};

	return (
		<form className='container' onSubmit={handleLogin}>
			<h3 className='display-4'>Login</h3>
			<div className='form-group'>
				<label>Username</label>
				<input name='username' className='form-control' onChange={handleChange} />
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input name='password' className='form-control' onChange={handleChange} />
			</div>
			<div className='form-group'>
				<button className='btn btn-primary'>Login</button>
			</div>
			<Prompt
				when={userLogin.status}
				message={location => {
					return 'Bạn có chắc muốn rời trang này ?';
				}}></Prompt>
		</form>
	);
}
