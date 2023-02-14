import React from 'react';
import { Button, Drawer, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawerAction } from '../../redux/actions/CyberBugsAction';

export default function DrawerCyberbugs() {
	const dispatch = useDispatch();

	const { open, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerReducer);

	const onClose = () => {
		dispatch(closeDrawerAction());
	};

	return (
		<Drawer
			zIndex='5'
			placement='right'
			title={title}
			width={700}
			onClose={onClose}
			open={open}
			bodyStyle={{ paddingBottom: 80 }}
			footer={
				<Space>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={callBackSubmit} type='primary'>
						Submit
					</Button>
				</Space>
			}>
			{ComponentContentDrawer}
		</Drawer>
	);
}
