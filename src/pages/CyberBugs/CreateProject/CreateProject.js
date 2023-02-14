import React, { useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { createProjectAction, getAllProjectCategoryAction } from '../../../redux/actions/CyberBugsAction';

function CreateProject(props) {
	const dispatch = useDispatch();
	const { userLogin } = useSelector(state => state.UserCyberbugsReducer);
	const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer);

	//formik
	const { touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

	//onchange tinyMCE edit
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			setFieldValue('description', editorRef.current.getContent());
		}
	};

	useEffect(() => {
		//gọi api để lấy dữ liệu thẻ select
		dispatch(getAllProjectCategoryAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='createProject' style={{ padding: '0% 2%' }}>
			<div className='header'>
				<nav aria-label='breadcrumb'>
					<ol className='breadcrumb' style={{ backgroundColor: 'white' }}>
						<li className='breadcrumb-item'>cyberbugs</li>
						<li className='breadcrumb-item'>{userLogin.name}</li>
						<li className='breadcrumb-item active' aria-current='page'>
							create project
						</li>
					</ol>
				</nav>
			</div>

			<h3>Create Project</h3>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Name</label>
					<input onChange={handleChange} onBlur={handleBlur} name='projectName' className='form-control' />
					<div className='text-danger' style={{ height: '5px' }}>
						{errors.projectName && touched.projectName && <span>{errors.projectName}</span>}
					</div>
				</div>

				<div className='form-group'>
					<label>Description</label>
					<Editor
						onInit={(evt, editor) => (editorRef.current = editor)}
						name='description'
						init={{
							height: 200,
							menubar: false,
							plugins: 'emoticons help lists code advlist table',
							toolbar: `blocks bold italic underline |forecolor backcolor | code emoticons | strikethrough table | numlist bullist | alignleft aligncenter alignright alignjustify | removeformat help`,
						}}
						onEditorChange={log}
					/>
				</div>

				<div className='form-group'>
					<label>Category</label>
					<select onChange={handleChange} name='categoryId' className='form-control'>
						{arrProjectCategory.map((item, index) => {
							return (
								<option value={item.id} key={index}>
									{item.projectCategoryName}
								</option>
							);
						})}
					</select>
				</div>

				<button className='btn btn-outline-success' type='submit'>
					Create project
				</button>
			</form>
		</div>
	);
}

//formik
const CreateProjectForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: props => ({
		projectName: '',
		description: '',
		categoryId: props.arrProjectCategory[0]?.id,
	}),

	validationSchema: Yup.object().shape({
		projectName: Yup.string().required('Project name is required!'),
	}),

	handleSubmit: (values, { props }) => {
		props.dispatch(createProjectAction(values));
	},

	displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProps = state => ({
	arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectForm);
