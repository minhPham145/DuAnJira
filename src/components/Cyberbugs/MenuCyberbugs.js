import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CreditCardOutlined, FundProjectionScreenOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

export default function MenuCyberbugs() {
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);
	const { projectDetail } = useSelector(state => state.ProjectReducer);

	return (
		<div className='menu'>
			<div className='account'>
				<div className='avatar'>
					<img src={userLogin.avatar} alt='avatar' />
				</div>
				<div className='account-info'>
					<p>{userLogin.name}</p>
					<p>Report bugs</p>
				</div>
			</div>

			<div className='control'>
				<NavLink className='navLink' to={`/projectdetail/${projectDetail.id}`} activeClassName='actived'>
					<div>
						<CreditCardOutlined style={{ fontSize: '16px' }} />
						<span className='title'>Cyber Board</span>
					</div>
				</NavLink>
				<NavLink className='navLink' to='/projectmanagement' activeClassName='actived'>
					<div>
						<FundProjectionScreenOutlined style={{ fontSize: '16px' }} />
						<span className='title'>Project Management</span>
					</div>
				</NavLink>
				<NavLink className='navLink' to='/createproject' activeClassName='actived'>
					<div>
						<SettingOutlined style={{ fontSize: '16px' }} />
						<span className='title'>Create Project</span>
					</div>
				</NavLink>
				<NavLink className='navLink' to='/usermanagement' activeClassName='actived'>
					<div>
						<UserOutlined style={{ fontSize: '16px' }} />
						<span className='title'>User Management</span>
					</div>
				</NavLink>
			</div>
		</div>
	);
}
