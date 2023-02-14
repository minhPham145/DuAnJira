import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { PHONE_REGEX } from '../../../util/constants/settingSystem';
import { editUserAction, setSubmitDrawerEditUserAction } from '../../../redux/actions/CyberBugsAction';

function FormEditUser(props) {
	const dispatch = useDispatch();

	const { values, errors, touched, handleChange, handleSubmit, handleBlur } = props;

	useEffect(() => {
		dispatch(setSubmitDrawerEditUserAction(handleSubmit));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>User id</label>
				<input disabled className='form-control' name='id' value={values.id} />
			</div>

			<div className='form-group'>
				<label>Name</label>
				<input className='form-control' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
				<div className='text-danger' style={{ height: '5px' }}>
					{errors.name && touched.name && <span>{errors.name}</span>}
				</div>
			</div>

			<div className='form-group'>
				<label>Phone</label>
				<input className='form-control' name='phoneNumber' value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
				<div className='text-danger' style={{ height: '5px' }}>
					{errors.phoneNumber && touched.phoneNumber && <span>{errors.phoneNumber}</span>}
				</div>
			</div>

			<div className='form-group'>
				<label>Email</label>
				<input className='form-control' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
				<div className='text-danger' style={{ height: '5px' }}>
					{errors.email && touched.email && <span>{errors.email}</span>}
				</div>
			</div>

			<div className='form-group'>
				<label>Password</label>
				<input className='form-control' name='passWord' value={values.passWord} onChange={handleChange} onBlur={handleBlur} />
				<div className='text-danger' style={{ height: '5px' }}>
					{errors.passWord && touched.passWord && <span>{errors.passWord}</span>}
				</div>
			</div>
		</form>
	);
}

const EditUserForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: props => {
		const { userEdit } = props;
		return {
			id: userEdit.userId,
			name: userEdit.name,
			phoneNumber: userEdit.phoneNumber,
			email: userEdit.email,
			passWord: '',
		};
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required('Name is required!').max(40, 'Name have max 40 characters!'),
		phoneNumber: Yup.string().required('Phone number is required!').matches(PHONE_REGEX, 'Phone number is invalid!'),
		email: Yup.string().required('Email is required!').email('Email is invalid!'),
		passWord: Yup.string().required('Password is required!').min(6, 'Password must have min 6 characters!').max(32, 'Password have max 32 characters!'),
	}),

	handleSubmit: (values, { props }) => {
		props.dispatch(editUserAction(values));
	},

	displayName: 'EditUserFormik',
})(FormEditUser);

const mapStateToProps = state => ({
	userEdit: state.UserEditReducer.userEdit,
});

export default connect(mapStateToProps)(EditUserForm);
