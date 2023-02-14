import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain';
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain';
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain';
import ModalCyberbugs from '../../../components/Cyberbugs/Modal/ModalCyberbugs';
import { getProjectDetailAction } from '../../../redux/actions/CyberBugsAction';

export default function IndexCyberbugs(props) {
	const dispatch = useDispatch();
	const { projectDetail } = useSelector(state => state.ProjectReducer);

	useEffect(() => {
		const { projectId } = props.match.params;
		dispatch(getProjectDetailAction(projectId));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className='main'>
				<HeaderMain projectDetail={projectDetail} />
				<InfoMain projectDetail={projectDetail} />
				<ContentMain projectDetail={projectDetail} />
			</div>
			<ModalCyberbugs />
		</>
	);
}
