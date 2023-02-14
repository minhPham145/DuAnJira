import { applyMiddleware, combineReducers, createStore } from 'redux';

//middleware thunk
import thunk from 'redux-thunk';
//middleware saga
import createMiddlewareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

//reducers....
import LoadingReducer from './reducers/CyberbugsReducer/LoadingReducer';

import ModalReducer from './reducers/ToDoListReducer/ModalReducer';
import ToDoListReducer from './reducers/ToDoListReducer/ToDoListReducer';

import DrawerReducer from './reducers/CyberbugsReducer/DrawerReducer';
import UserCyberbugsReducer from './reducers/CyberbugsReducer/UserCyberbugsReducer';
import ProjectCategoryReducer from './reducers/CyberbugsReducer/ProjectCategoryReducer';
import ProjectCyberbugsReducer from './reducers/CyberbugsReducer/ProjectCyberbugsReducer';
import ProjectReducer from './reducers/CyberbugsReducer/ProjectReducer';
import TaskTypeReducer from './reducers/CyberbugsReducer/TaskTypeReducer';
import PriorityReducer from './reducers/CyberbugsReducer/PriorityReducer';
import StatusReducer from './reducers/CyberbugsReducer/StatusReducer';
import TaskReducer from './reducers/CyberbugsReducer/TaskReducer';
import UserEditReducer from './reducers/CyberbugsReducer/UserEditReducer';

//reducer redux
const rootReducer = combineReducers({
	LoadingReducer,
	ModalReducer,

	//todolist
	ToDoListReducer,

	//cyberbugs
	DrawerReducer,
	UserCyberbugsReducer,
	UserEditReducer,
	ProjectCategoryReducer,
	ProjectCyberbugsReducer,
	ProjectReducer,
	TaskTypeReducer,
	PriorityReducer,
	StatusReducer,
	TaskReducer,
});

//saga
const middlewareSaga = createMiddlewareSaga();

const store = createStore(rootReducer, applyMiddleware(thunk, middlewareSaga));

//Gọi saga
middlewareSaga.run(rootSaga);

export default store;
