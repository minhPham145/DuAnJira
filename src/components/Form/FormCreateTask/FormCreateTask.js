import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
	//action
	createTaskAction,
	getAllPriorityAction,
	getAllStatusAction,
	getAllTaskTypeAction,
	getListProjectAction,
	getUserByProjectIdAction,
	setSubmitDrawerCreateTaskAction,
} from '../../../redux/actions/CyberBugsAction';

function FormCreateTask(props) {
	const dispatch = useDispatch();
	const { arrProject } = useSelector(state => state.ProjectCyberbugsReducer);
	const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
	const { arrPriority } = useSelector(state => state.PriorityReducer);
	const { arrUser } = useSelector(state => state.UserCyberbugsReducer);
	const { arrStatus } = useSelector(state => state.StatusReducer);

	const userOption = arrUser.map((user, index) => {
		return { value: user.userId, label: user.name };
	});

	const { handleChange, handleSubmit, setFieldValue } = props;

	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: 0,
		timeTrackingRemaining: 0,
	});

	const editorRef = useRef(null);

	useEffect(() => {
		dispatch(getListProjectAction());
		dispatch(getAllTaskTypeAction());
		dispatch(getAllPriorityAction());
		dispatch(getAllStatusAction());
		dispatch(setSubmitDrawerCreateTaskAction(handleSubmit));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form className='form__createTask' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Project</label>
				<select
					className='form-control'
					name='projectId'
					onChange={e => {
						const { value } = e.target;
						dispatch(getUserByProjectIdAction(value));
						setFieldValue('projectId', value);
					}}>
					{arrProject.map((project, index) => {
						return (
							<option value={project.id} key={index}>
								{project.projectName}
							</option>
						);
					})}
				</select>
			</div>

			<div className='form-group'>
				<label>Task name</label>
				<input className='form-control' name='taskName' onChange={handleChange} />
			</div>

			<div className='form-group'>
				<label>Status</label>
				<select className='form-control' name='statusId' onChange={handleChange}>
					{arrStatus.map((status, index) => {
						return (
							<option value={status.statusId} key={index}>
								{status.statusName}
							</option>
						);
					})}
				</select>
			</div>

			<div className='form-group'>
				<div className='row'>
					<div className='col-6'>
						<label>Priority</label>
						<select className='form-control' name='priorityId' onChange={handleChange}>
							{arrPriority.map((priority, index) => {
								return (
									<option value={priority.priorityId} key={index}>
										{priority.priority}
									</option>
								);
							})}
						</select>
					</div>
					<div className='col-6'>
						<label>Task type</label>
						<select className='form-control' name='typeId' onChange={handleChange}>
							{arrTaskType.map((taskType, index) => {
								return (
									<option value={taskType.id} key={index}>
										{taskType.taskType}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>

			<div className='form-group'>
				<div className='row'>
					<div className='col-6'>
						<label>Assignees</label>
						<Select
							options={userOption}
							mode='multiple'
							placeholder='Please select'
							optionFilterProp='label'
							style={{ width: '100%' }}
							onChange={values => {
								setFieldValue('listUserAsign', values);
							}}
						/>
					</div>

					<div className='col-6'>
						<label>Time tracking</label>
						<Slider max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} value={timeTracking.timeTrackingSpent} defaultValue={30} />
						<div className='form-group'>
							<div className='row'>
								<div className='col-6 text-left text-muted'>{timeTracking.timeTrackingSpent}h logged</div>
								<div className='col-6 text-right text-muted'>{timeTracking.timeTrackingRemaining}h remaining</div>
							</div>
						</div>
					</div>

					<div className='col-6'>
						<label>Original Estimate</label>
						<input className='form-control' name='originalEstimate' type='number' min='0' defaultValue='0' onChange={handleChange} />
					</div>

					<div className='col-6'>
						<div className='row'>
							<div className='col-6'>
								<label>Time spent</label>
								<input
									className='form-control'
									name='timeTrackingSpent'
									type='number'
									min='0'
									defaultValue='0'
									onChange={e => {
										setTimeTracking({ ...timeTracking, timeTrackingSpent: e.target.value });
										setFieldValue('timeTrackingSpent', e.target.value);
									}}
								/>
							</div>

							<div className='col-6'>
								<label>Time remaining</label>
								<input
									className='form-control'
									name='timeTrackingRemaining'
									type='number'
									min='0'
									defaultValue='0'
									onChange={e => {
										setTimeTracking({ ...timeTracking, timeTrackingRemaining: e.target.value });
										setFieldValue('timeTrackingRemaining', e.target.value);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='form-group'>
				<label>Description</label>
				<Editor
					name='description'
					onInit={(evt, editor) => (editorRef.current = editor)}
					init={{
						height: 180,
						menubar: false,
						plugins: 'emoticons help lists code advlist table',
						toolbar: `blocks bold italic underline |forecolor backcolor | code emoticons | strikethrough table | numlist bullist | alignleft aligncenter alignright alignjustify | removeformat help`,
					}}
					onEditorChange={() => {
						if (editorRef.current) {
							setFieldValue('description', editorRef.current.getContent());
						}
					}}
				/>
			</div>
		</form>
	);
}

//formik
const CreateTaskForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: props => {
		const { arrProject, arrTaskType, arrPriority, arrStatus } = props;

		// get user by project id thứ [0] lần đầu load form
		// if (arrProject.length > 0) {
		// 	props.dispatch(getUserByProjectIdAction(arrProject[0]?.id));
		// }

		return {
			listUserAsign: [],
			taskName: '',
			description: '',

			projectId: arrProject[0]?.id,
			typeId: arrTaskType[0]?.id,
			priorityId: arrPriority[0]?.priorityId,
			statusId: arrStatus[0]?.statusId,

			originalEstimate: 0,
			timeTrackingSpent: 0,
			timeTrackingRemaining: 0,
		};
	},

	handleSubmit: (values, { props }) => {
		props.dispatch(createTaskAction(values));
	},

	displayName: 'CreateTaskFormik',
})(FormCreateTask);

const mapStateToProps = state => ({
	arrProject: state.ProjectCyberbugsReducer.arrProject,
	arrTaskType: state.TaskTypeReducer.arrTaskType,
	arrPriority: state.PriorityReducer.arrPriority,
	arrStatus: state.StatusReducer.arrStatus,
});

export default connect(mapStateToProps)(CreateTaskForm);
