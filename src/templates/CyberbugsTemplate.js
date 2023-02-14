import React from 'react';
import { Route } from 'react-router-dom';
import MenuCyberbugs from '../components/Cyberbugs/MenuCyberbugs';
import SidebarCyberbugs from '../components/Cyberbugs/SidebarCyberbugs';

export const CyberbugsTemplate = props => {
	const { Component, ...restParam } = props;

	return (
		<Route
			{...restParam}
			render={propsRoute => {
				return (
					<div className='jira'>
						<SidebarCyberbugs />
						<MenuCyberbugs />
						<div style={{ minWidth: '65%', width: '100%', background: '#fff' }}>
							<Component {...propsRoute} />
						</div>
					</div>
				);
			}}
		/>
	);
};
