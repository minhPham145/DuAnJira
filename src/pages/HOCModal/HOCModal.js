import { Space } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import SlideDown from '../../components/GlobalSetting/SlideDown/SlideDown';
import { OPEN_FORM } from '../../redux/constants/ModalConstants';
import Login from '../Login/Login';
import Register from '../Register/Register';

export default function HOCModal() {
	const LoginWithSlideDown = () => SlideDown(Login);

	const dispatch = useDispatch();
	return (
		<div className='d-flex justify-content-center mt-5'>
			<Space className='mr-5'>
				<button onClick={() => dispatch({ type: OPEN_FORM, Component: <Login /> })} type='button' className='btn btn-primary btn-lg' data-toggle='modal' data-target='#modelId'>
					Đăng nhập
				</button>
				<button onClick={() => dispatch({ type: OPEN_FORM, Component: <Register /> })} type='button' className='btn btn-primary btn-lg' data-toggle='modal' data-target='#modelId'>
					Đăng ký
				</button>
			</Space>

			<div style={{ width: '30%' }}>
				<LoginWithSlideDown />
			</div>
		</div>
	);
}
