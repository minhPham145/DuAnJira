import { Avatar } from 'antd';
import React from 'react';
import ReactHTMLParse from 'html-react-parser';

export default function InfoMain(props) {
	const { members, description } = props.projectDetail;

	const renderAvatar = () => {
		return members?.map((member, index) => {
			return <Avatar className='avatar__user__info' src={member.avatar} key={index} />;
		});
	};

	if (members) {
		return (
			<>
				<section>{description ? ReactHTMLParse(description) : ''}</section>
				<div className='info' style={{ display: 'flex' }}>
					<div className='search-block'>
						<input className='search form-control' />
						<i className='fa fa-search' />
					</div>

					<Avatar.Group className='avatar-group'>{renderAvatar()}</Avatar.Group>

					<div style={{ marginLeft: 20 }} className='text'>
						Only My Issues
					</div>
					<div style={{ marginLeft: 20 }} className='text'>
						Recently Updated
					</div>
				</div>
			</>
		);
	}
}
