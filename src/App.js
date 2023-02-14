import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './util/history';

//-----------------Loading--------------
import Loading from './components/GlobalSetting/Loading/Loading';

//-------------------------------------
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
//------------------TODO List-------------------
import ToDoListRCC from './pages/ToDoList/ToDoListRCC';
import TodolistRedux from './pages/ToDoList/ToDoListRedux';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import ToDoListWithSaga from './pages/ToDoList/ToDoListWithSaga';
//------------------HOC Modal---------------------
import HOCModal from './pages/HOCModal/HOCModal';
import Modal from './HOC/Modal/Modal';

//------------------Templates-------------------
import { HomeTemplate } from './templates/HomeTemplate';
import { UserLoginTemplate } from './templates/UserLoginTemplate';
import { CyberbugsTemplate } from './templates/CyberbugsTemplate';

//-------------------Cyberbugs------------------
import DrawerCyberbugs from './HOC/Cyberbugs/DrawerCyberbugs';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import IndexCyberbugs from './pages/CyberBugs/IndexCyberbugs/IndexCyberbugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import BeautifulDND from './pages/BeautifulDND/BeautifulDND';
import SignUpCyberbugs from './pages/CyberBugs/SignUpCyberbugs/SignUpCyberbugs';
import UserManagement from './pages/CyberBugs/UserManagement/UserManagement';

export default function App() {
	return (
		<Router history={history}>
			<Loading />
			<DrawerCyberbugs />
			<Modal />
			<Switch>
				<HomeTemplate exact path='/home' Component={Home} />
				<HomeTemplate exact path='/contact' Component={Contact} />
				<HomeTemplate exact path='/about' Component={About} />
				<HomeTemplate exact path='/detail/:id' Component={Detail} />
				<HomeTemplate exact path='/profile' Component={Profile} />

				{/* Todo list */}
				{/* <HomeTemplate exact path='/todolistrcc' Component={ToDoListRCC} />
				<HomeTemplate exact path='/todolistrfc' Component={ToDoListRFC} />
				<HomeTemplate exact path='/todolistredux' Component={TodolistRedux} /> */}
				<Route exact path='/todolist' component={ToDoListWithSaga} />

				{/* Beautiful DND */}
				<HomeTemplate exact path='/beautifuldnd' Component={BeautifulDND} />

				{/* Demo HOC Modal */}
				<HomeTemplate exact path='/demohocmodal' Component={HOCModal} />

				{/* Cyberbugs */}
				<UserLoginTemplate exact path='/signup' Component={SignUpCyberbugs} />
				<UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />

				<CyberbugsTemplate exact path='/projectdetail/:projectId' Component={IndexCyberbugs} />
				<CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
				<CyberbugsTemplate exact path='/createproject' Component={CreateProject} />
				<CyberbugsTemplate exact path='/usermanagement' Component={UserManagement} />

				<HomeTemplate exact path='/' Component={Home} />
				<HomeTemplate exact path='*' Component={PageNotFound} />
			</Switch>
		</Router>
	);
}
