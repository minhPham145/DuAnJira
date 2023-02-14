import React from 'react';
import { useSelector } from 'react-redux';

export default function HeaderMain(props) {
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);
	const { projectName } = props.projectDetail;

	return (
		<div className='header'>
			<nav aria-label='breadcrumb'>
				<ol className='breadcrumb' style={{ backgroundColor: 'white' }}>
					<li className='breadcrumb-item'>cyberbugs</li>
					<li className='breadcrumb-item'>{userLogin.name}</li>
					<li className='breadcrumb-item'>cyber board</li>
					<li className='breadcrumb-item active'>{projectName}</li>
				</ol>
			</nav>
			<h3>{projectName}</h3>
		</div>
	);
}
