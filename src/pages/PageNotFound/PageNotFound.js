import React from 'react';

export default function PageNotFound(props) {
	return (
		<div className='text-center' style={{ color: '#fff' }}>
			<p style={{ fontSize: '150px' }}>404</p>
			<p className='display-4' style={{ color: '#eb6440' }}>
				PAGE NOT FOUND
			</p>
			<h4>Không tìm thấy trang: {props.match.url}</h4>
		</div>
	);
}
