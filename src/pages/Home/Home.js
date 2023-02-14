import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
export default function Home() {
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);

	if (userLogin.id) {
		return (
			<div className='container' style={{ padding: '50px', color: '#fff' }}>
				<Avatar className='mb-3' shape='square' size={60} src={userLogin.avatar} alt='avatar' />
				<p>id: {userLogin.id}</p>
				<p>name: {userLogin.name}</p>
				<p>email: {userLogin.email}</p>
				<p>phone: {userLogin.phoneNumber}</p>
			</div>
		);
	}
}
