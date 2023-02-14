import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DoubleRightOutlined, DoubleLeftOutlined, FileAddOutlined, HomeOutlined } from '@ant-design/icons';
import { openDrawerFormCreateTaskAction } from '../../redux/actions/CyberBugsAction';
import { NavLink } from 'react-router-dom';

export default function SidebarCyberbugs() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className={open ? 'sideBar' : 'sideBarClosed'}>
			<div className='itemSidebar mt-5' onClick={toggleOpen}>
				{open ? <DoubleLeftOutlined className='iconCollapse' /> : <DoubleRightOutlined className='iconCollapse' />}
			</div>

			<NavLink className='navLink' to='/home'>
				<div className='itemSidebar'>
					<HomeOutlined className='iconItem' />
					<span className='title'>Home</span>
				</div>
			</NavLink>

			<div className='itemSidebar' onClick={() => dispatch(openDrawerFormCreateTaskAction())}>
				<FileAddOutlined className='iconItem' />
				<span className='title'>Create Task</span>
			</div>
		</div>
	);
}
