import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Space, Table, Tag, Popconfirm, Avatar, Popover, Button, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';

import {
	//action
	editProjectAction,
	getAllProjectAction,
	deleteProjectAction,
	openDrawerFormEditProjectAction,
	getUserAction,
	assignUserProjectAction,
	removeUserProjectAction,
} from '../../../redux/actions/CyberBugsAction';

export default function ProjectManagement() {
	const dispatch = useDispatch();
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);
	const { projectList } = useSelector(state => state.ProjectCyberbugsReducer);
	const { userSearch } = useSelector(state => state.UserCyberbugsReducer);

	const [valueAutoComplete, setValueAutoComplete] = useState('');

	const searchRef = useRef(null);

	const renderMembersAvatar = (text, record) => {
		return text.map((member, index) => {
			return (
				<Popover
					key={index}
					placement='top'
					content={
						<div className='card__user__assign'>
							<Avatar size={'large'} src={member.avatar} />
							<div className='px-2'>
								<p className='mb-0 text-muted'>{member.userId}</p>
								<p className='mb-0'>{member.name}</p>
							</div>
							<Button
								type='primary'
								danger
								size='small'
								icon={<CloseOutlined />}
								onClick={() => {
									dispatch(removeUserProjectAction(record.id, member.userId));
								}}
							/>
						</div>
					}>
					<Avatar src={member.avatar} />
				</Popover>
			);
		});
	};

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			sortDirections: ['descend'],
			sorter: (itemNext, item) => {
				return itemNext.id - item.id;
			},
		},
		{
			width: 300,
			title: 'projectName',
			dataIndex: 'projectName',
			key: 'projectName',
			render: (text, record, index) => {
				return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
			},
			sortDirections: ['descend'],
			sorter: (itemNext, item) => {
				let projectNameNext = itemNext.projectName.trim().toLowerCase();
				let projectName = item.projectName.trim().toLowerCase();
				if (projectNameNext < projectName) {
					return -1;
				}
				return 1;
			},
		},
		{
			width: 200,
			title: 'creator',
			dataIndex: 'creator',
			key: 'creator',
			render: (text, record, index) => {
				return <Tag color='geekblue'>{text.name}</Tag>;
			},
			sortDirections: ['descend'],
			sorter: (itemNext, item) => {
				let creatorNext = itemNext.creator.name.trim().toLowerCase();
				let creator = item.creator.name.trim().toLowerCase();
				if (creatorNext < creator) {
					return -1;
				}
				return 1;
			},
		},
		{
			width: 200,
			title: 'category',
			dataIndex: 'categoryName',
			key: 'categoryName',
			sortDirections: ['descend'],
			sorter: (itemNext, item) => {
				let categoryNameNext = itemNext.categoryName.trim().toLowerCase();
				let categoryName = item.categoryName.trim().toLowerCase();
				if (categoryNameNext < categoryName) {
					return -1;
				}
				return 1;
			},
		},
		{
			width: 200,
			title: 'members',
			dataIndex: 'members',
			key: 'members',
			render: (text, record, index) => {
				return (
					<div className='d-flex'>
						<Avatar.Group maxCount={3} maxStyle={{ backgroundColor: '#fde3cf' }}>
							{renderMembersAvatar(text, record)}
						</Avatar.Group>

						<Popover
							placement='rightTop'
							title={'add user'}
							trigger='click'
							content={
								<AutoComplete
									style={{ width: '100%' }}
									value={valueAutoComplete}
									options={userSearch.map(user => ({ label: user.name, value: user.userId.toString() }))}
									onChange={value => setValueAutoComplete(value)}
									onSearch={value => {
										if (searchRef.current) {
											clearTimeout(searchRef.current);
										}
										searchRef.current = setTimeout(() => {
											dispatch(getUserAction(value));
										}, 300);
									}}
									onSelect={(value, option) => {
										setValueAutoComplete(option.label);
										dispatch(assignUserProjectAction(record.id, value));
									}}
								/>
							}>
							<Button shape='circle'>+</Button>
						</Popover>
					</div>
				);
			},
		},
		{
			width: 200,
			title: 'action',
			dataIndex: '',
			key: 'x',
			render: (text, record, index) => (
				<Space>
					<EditOutlined
						style={{ fontSize: '18px' }}
						onClick={() => {
							dispatch(openDrawerFormEditProjectAction());
							dispatch(editProjectAction(record));
						}}
					/>

					<Popconfirm
						title='Delete project'
						description='Are you sure to delete this project?'
						onConfirm={() => {
							dispatch(deleteProjectAction(record.id));
						}}
						okText='Yes'
						cancelText='No'>
						<DeleteOutlined style={{ fontSize: '18px' }} />
					</Popconfirm>
				</Space>
			),
		},
	];

	useEffect(() => {
		dispatch(getAllProjectAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='projectManagement' style={{ padding: '0% 2%' }}>
			<div className='header'>
				<nav aria-label='breadcrumb'>
					<ol className='breadcrumb' style={{ backgroundColor: 'white' }}>
						<li className='breadcrumb-item'>cyberbugs</li>
						<li className='breadcrumb-item'>{userLogin.name}</li>
						<li className='breadcrumb-item active' aria-current='page'>
							project management
						</li>
					</ol>
				</nav>
			</div>

			<h3 style={{ marginBottom: '56px' }}>Project Management</h3>
			<Table bordered={true} rowKey={'id'} columns={columns} dataSource={projectList} pagination={{ pageSize: 5, showSizeChanger: false }} />
		</div>
	);
}
