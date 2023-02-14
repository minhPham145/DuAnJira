import React from 'react';
import { connect } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { signInCyberbugsAction } from '../../../redux/actions/CyberBugsAction';
import { NavLink } from 'react-router-dom';

function LoginCyberBugs(props) {
	const { errors, touched, handleChange, handleSubmit, handleBlur } = props;

	return (
		<form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
			<h3 className='mb-5 text-center' style={{ fontWeight: 300 }}>
				Login to continue
			</h3>
			{errors.email && touched.email && <span className='text-danger'>{errors.email}</span>}
			<Input className='mb-2' onChange={handleChange} onBlur={handleBlur} name='email' size='large' prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />

			{errors.password && touched.password && <span className='text-danger'>{errors.password}</span>}
			<Input className='mb-2' onChange={handleChange} onBlur={handleBlur} name='password' size='large' prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password' type='password' />

			<div className='text-center'>
				<Button className='mb-2 mt-3 mr-3' type='primary' htmlType='submit' size='large' style={{ width: '30%' }}>
					Login
				</Button>
				<NavLink to='/signup'>
					<Button type='default' htmlType='submit' size='large' style={{ width: '30%' }}>
						Sign Up
					</Button>
				</NavLink>
			</div>
		</form>
	);
}

const LoginCyberBugsForm = withFormik({
	mapPropsToValues: () => ({
		email: '',
		password: '',
	}),

	validationSchema: Yup.object().shape({
		email: Yup.string().required('Email is required !').email('Email is invalid !'),
		password: Yup.string().required('Password is required !').min(6, 'Password must have min 6 characters !').max(32, 'Password have max 32 characters !'),
	}),

	handleSubmit: ({ email, password }, { props }) => {
		props.dispatch(signInCyberbugsAction(email, password));
	},

	displayName: 'LoginCyberBugsFormik',
})(LoginCyberBugs);

export default connect()(LoginCyberBugsForm);
