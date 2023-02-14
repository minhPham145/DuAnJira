import React from 'react';
import { useSelector } from 'react-redux';
import './Loading.css';

export default function Loading() {
	const { isLoading } = useSelector(state => state.LoadingReducer);
	if (isLoading) {
		return (
			<div className='bgLoading'>
				<div className='spinner-border text-primary' style={{ width: '2rem', height: '2rem' }} role='status'></div>
			</div>
		);
	}
}
