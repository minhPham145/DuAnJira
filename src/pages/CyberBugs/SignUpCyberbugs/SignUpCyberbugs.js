import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { PHONE_REGEX } from '../../../util/constants/settingSystem';
import { signUpCyberbugsAction } from '../../../redux/actions/CyberBugsAction';
import { NavLink } from 'react-router-dom';

function SignUpCyberbugs(props) {
	const { errors, touched, handleChange, handleSubmit, handleBlur } = props;

	return (
		<form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
			<h3 className='mb-5 text-center' style={{ fontWeight: 300 }}>
				Signup
			</h3>

			{errors.name && touched.name && <span className='text-danger'>{errors.name}</span>}
			<Input className='mb-2' onChange={handleChange} onBlur={handleBlur} name='name' placeholder='Name' size='large' prefix={<UserOutlined className='site-form-item-icon' />} />

			{errors.phoneNumber && touched.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}
			<Input className='mb-2' onChange={handleChange} onBlur={handleBlur} name='phoneNumber' placeholder='Phone' size='large' prefix={<PhoneOutlined className='site-form-item-icon' />} />

			{errors.email && touched.email && <span className='text-danger'>{errors.email}</span>}
			<Input className='mb-2' onChange={handleChange} onBlur={handleBlur} name='email' placeholder='Email' size='large' prefix={<MailOutlined className='site-form-item-icon' />} />

			{errors.passWord && touched.passWord && <span className='text-danger'>{errors.passWord}</span>}
			<Input className='mb-2' onChange={handleChange} onBlur={handleBlur} name='passWord' placeholder='Password' size='large' prefix={<LockOutlined className='site-form-item-icon' />} type='password' />

			<div className='text-center'>
				<Button className='mb-2 mt-3 mr-3' type='primary' htmlType='submit' size='large' style={{ width: '30%' }}>
					Sign up
				</Button>

				<NavLink to='/login'>
					<Button type='default' htmlType='submit' size='large' style={{ width: '30%' }}>
						Log in
					</Button>
				</NavLink>
			</div>
		</form>
	);
}

const SignUpCyberBugsForm = withFormik({
	mapPropsToValues: () => ({
		name: '',
		phoneNumber: '',
		email: '',
		passWord: '',
	}),

	validationSchema: Yup.object().shape({
		name: Yup.string().required('Name is required !').max(40, 'Name have max 40 characters !'),
		phoneNumber: Yup.string().required('Phone number is required !').matches(PHONE_REGEX, 'Phone number is invalid !'),
		email: Yup.string().required('Email is required !').email('Email is invalid !'),
		passWord: Yup.string().required('Password is required !').min(6, 'Password must have min 6 characters !').max(32, 'Password have max 32 characters !'),
	}),

	handleSubmit: (values, { props }) => {
		props.dispatch(signUpCyberbugsAction(values));
	},

	displayName: 'SignUpCyberbugsFormik',
})(SignUpCyberbugs);

export default connect()(SignUpCyberBugsForm);
