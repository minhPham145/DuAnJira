import { Popconfirm, Space, Table, Input, Tag } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, getUserEditAction, getUserManagementAction, openDrawerFormEditUserAction } from '../../../redux/actions/CyberBugsAction';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function UserManagement() {
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);
	const { userManagement } = useSelector(state => state.UserCyberbugsReducer);

	const dispatch = useDispatch();

	const searchRef = useRef(null);

	const columns = [
		{
			title: 'id',
			dataIndex: 'userId',
			key: 'userId',
			sortDirections: ['descend'],
			sorter: (itemNext, item) => {
				return itemNext.userId - item.userId;
			},
		},

		{
			width: 300,
			title: 'name',
			dataIndex: 'name',
			key: 'name',
			sortDirections: ['descend'],
			render: (text, record, index) => {
				return <Tag color='geekblue'>{text}</Tag>;
			},
			sorter: (itemNext, item) => {
				let nameNext = itemNext.name.trim().toLowerCase();
				let name = item.name.trim().toLowerCase();
				if (nameNext < name) {
					return -1;
				}
				return 1;
			},
		},
		{
			width: 300,
			title: 'email',
			dataIndex: 'email',
			key: 'email',
			sortDirections: ['descend'],
			sorter: (itemNext, item) => {
				let emailNext = itemNext.email.trim().toLowerCase();
				let email = item.email.trim().toLowerCase();
				if (emailNext < email) {
					return -1;
				}
				return 1;
			},
		},
		{
			width: 300,
			title: 'phoneNumber',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
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
							dispatch(openDrawerFormEditUserAction());
							dispatch(getUserEditAction(record));
						}}
					/>

					<Popconfirm
						title='Delete user'
						description='Are you sure to delete this user?'
						okText='Yes'
						cancelText='No'
						onConfirm={() => {
							dispatch(deleteUserAction(record.userId));
						}}>
						<DeleteOutlined style={{ fontSize: '18px' }} />
					</Popconfirm>
				</Space>
			),
		},
	];

	useEffect(() => {
		dispatch(getUserManagementAction(''));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='userManagement' style={{ padding: '0% 2%' }}>
			<div className='header'>
				<nav aria-label='breadcrumb'>
					<ol className='breadcrumb' style={{ backgroundColor: 'white' }}>
						<li className='breadcrumb-item'>cyberbugs</li>
						<li className='breadcrumb-item'>{userLogin.name}</li>
						<li className='breadcrumb-item active' aria-current='page'>
							user management
						</li>
					</ol>
				</nav>
			</div>

			<h3>User Management</h3>

			<Search
				placeholder='search user...'
				size='middle'
				style={{ width: '25%', marginBottom: '1rem' }}
				onSearch={value => {
					dispatch(getUserManagementAction(value));
				}}
				onChange={e => {
					if (searchRef.current) {
						clearTimeout(searchRef.current);
					}
					searchRef.current = setTimeout(() => {
						dispatch(getUserManagementAction(e.target.value));
					}, 300);
				}}
			/>
			<Table bordered={true} style={{ color: '#112D4E' }} rowKey={'userId'} columns={columns} dataSource={userManagement} pagination={{ pageSize: 5, showSizeChanger: false }} />
		</div>
	);
}
