import React, { useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { getAllProjectCategoryAction, setSubmitDrawerEditProjectAction, updateProjectAction } from '../../../redux/actions/CyberBugsAction';

function FormEditProject(props) {
	const dispatch = useDispatch();
	const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer);

	const { values, handleChange, handleSubmit, setFieldValue } = props;

	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			setFieldValue('description', editorRef.current.getContent());
		}
	};

	useEffect(() => {
		dispatch(setSubmitDrawerEditProjectAction(handleSubmit));
		dispatch(getAllProjectCategoryAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div className='row'>
				<div className='col-4'>
					<div className='form-group'>
						<label>Project id</label>
						<input value={values.id} className='form-control' name='id' disabled />
					</div>
				</div>

				<div className='col-4'>
					<div className='form-group'>
						<label>Project name</label>
						<input className='form-control' name='projectName' value={values.projectName} onChange={handleChange} />
					</div>
				</div>

				<div className='col-4'>
					<div className='form-group'>
						<label>Project category</label>
						<select className='form-control' name='categoryId' value={values.categoryId} onChange={handleChange}>
							{arrProjectCategory?.map((item, index) => {
								return (
									<option value={item.id} key={index}>
										{item.projectCategoryName}
									</option>
								);
							})}
						</select>
					</div>
				</div>

				<div className='col-12'>
					<div className='form-group'>
						<label>Description</label>
						<Editor
							name='description'
							onInit={(evt, editor) => (editorRef.current = editor)}
							value={values.description}
							init={{
								height: 300,
								menubar: false,
								plugins: 'emoticons help lists code advlist table',
								toolbar: `blocks bold italic underline |forecolor backcolor | code emoticons | strikethrough table | numlist bullist | alignleft aligncenter alignright alignjustify | removeformat help`,
							}}
							onEditorChange={log}
						/>
					</div>
				</div>
			</div>
		</form>
	);
}

//formik
const EditProjectForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: props => {
		const { projectEdit } = props;
		return {
			id: projectEdit.id,
			projectName: projectEdit.projectName,
			description: projectEdit.description,
			categoryId: projectEdit.categoryId,
		};
	},

	handleSubmit: (values, { props }) => {
		props.dispatch(updateProjectAction(values));
	},

	displayName: 'EditProjectFormik',
})(FormEditProject);

const mapStateToProps = state => ({
	projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
