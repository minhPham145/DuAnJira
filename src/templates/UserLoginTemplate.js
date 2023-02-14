import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import jirabg from '../assets/imgCyberbugs/jirabg.jpg';

const { Sider, Content } = Layout;

export const UserLoginTemplate = props => {
	const { Component, ...restParam } = props;

	const [width, setSize] = useState(window.innerWidth);

	useEffect(() => {
		window.onresize = () => {
			setSize(window.innerWidth);
		};
	}, []);

	return (
		<Route
			{...restParam}
			render={propsRoute => (
				<Layout style={{ height: '100vh' }}>
					<Sider width={width / 1.5} style={{ backgroundImage: `url(${jirabg})`, backgroundSize: '100% 100%' }}></Sider>

					<Content style={{ padding: '0px 30px' }}>
						<Component {...propsRoute} />
					</Content>
				</Layout>
			)}
		/>
	);
};
