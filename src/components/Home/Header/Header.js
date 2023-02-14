import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

import './Header.css';

export default function Header() {
	return (
		<nav className='navbar navbar-expand-sm'>
			<NavLink className='navbar-brand' to='/'>
				Nav<span style={{ color: '#eb6440' }}>bar</span>
			</NavLink>
			<button className='navbar-toggler d-lg-none' type='button' data-toggle='collapse' data-target='#collapsibleNavId'>
				<MenuOutlined className='text-white' />
			</button>
			<div className='collapse navbar-collapse' id='collapsibleNavId'>
				<ul className='navbar-nav mt-2 mt-sm-0'>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/login'>
							Login
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/signup'>
							Signup
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/projectmanagement'>
							Cyber Bugs
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/todolist'>
							Todo list
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}
