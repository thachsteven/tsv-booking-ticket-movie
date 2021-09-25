import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import CheckOut from './pages/CheckOut/CheckOut';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import EditProfile from './pages/Profile/EditProfile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import DashBoard from './pages/Admin/DashBoard';
import Film from './pages/Admin/Film';
import Edit from './pages/Admin/Edit';
import AddNew from './pages/Admin/AddNew';
import ShowTime from './pages/Admin/ShowTime';
import UserManagement from './pages/UserManagement/UserManagement';
import EditUser from './pages/UserManagement/EditUser';
import AddNewUser from './pages/UserManagement/AddNewUser';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/checkout/:id" exact Component={CheckOut} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        <HomeTemplate path="/profile/edit" exact Component={EditProfile} />

        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />

        <AdminTemplate path="/admin" exact Component={DashBoard} />
        <AdminTemplate path="/admin/film" exact Component={Film} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />
        <AdminTemplate path="/admin/quanlynguoidung" exact Component={UserManagement} />
        <AdminTemplate path="/admin/quanlynguoidung/edit/:id" exact Component={EditUser} />
        <AdminTemplate path="/admin/quanlynguoidung/addnew" exact Component={AddNewUser} />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
