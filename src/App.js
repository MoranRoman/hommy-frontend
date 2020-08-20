import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {connect} from 'react-redux'

import PrivateRouter from "./components/PrivateRouter";
import Login from "./pages/Login";
import UserHomePage from "./pages/UserHomePage"
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/Register"
import Houses from "./pages/Houses";
import CreateHouse from "./pages/AddHouse";
import Users from "./pages/Users";
import User from "./pages/User";
import DeletedUserPage from "./pages/DeletedUserPage";
import HouseById from "./pages/HouseById";
import SupportChat from "./pages/SupportChat"
import Favourites from "./pages/Favourites";
import {signUpByToken, signOut} from "./actions/userFlow"

const App = ({name, photoUrl, id, role, signUpByToken, signOut}) => {
    useEffect(() => {
        async function fetchData() {
            await signUpByToken()
        }

        JSON.parse(localStorage.getItem('tokens'))?.accessToken &&
        fetchData()
    }, [])

    return (
        <Router>
            <div>
                <Link to="/register">Register </Link>
                <Link to="/login">Login </Link>
                <Link to="/house">CreateHouse </Link>
                <Link to="/houses">Houses </Link>
                <Link to={`/user/${id}`}>Home Page . </Link>
                <Link to='/supportchat'>Support Chat </Link>
                <Link to='/favourites'>Favourites</Link>
                {role === 'admin' &&
                <>
                    <Link to="/users">Users </Link>
                    <Link to="/user">User By Id </Link>
                    <Link to='/adminpanel'>Admin Panel</Link>
                </>}

                <p>{name}</p>
                <img src={photoUrl} style={{width: '75px', height: '75px'}} alt=""/>
                {JSON.parse(localStorage.getItem('tokens'))?.accessToken &&
                <button onClick={() => signOut()}>Sign Out</button>}
            </div>
            <Switch>
                <PrivateRouter path='/adminpanel' component={AdminPanel}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <PrivateRouter exact path='/house' component={CreateHouse}/>
                <Route exact path='/houses' component={Houses}/>
                <PrivateRouter path='/house/:id' component={HouseById}/>
                <PrivateRouter exact path='/users' component={Users}/>
                <PrivateRouter path='/user/:id' component={UserHomePage}/>
                <PrivateRouter exact path='/user' component={User}/>
                <Route path='/deleted' component={DeletedUserPage}/>
                <PrivateRouter path='/supportchat' component={SupportChat}/>
                <PrivateRouter path='/favourites' component={Favourites}/>
            </Switch>
        </Router>
    )
}

function mapStateToProps({userInfo}) {
    return {
        name: userInfo.name,
        photoUrl: userInfo.photoUrl,
        id: userInfo.id,
        role: userInfo.role
    }
}

const mapDispatchToProps = {signUpByToken, signOut};

export default connect(mapStateToProps, mapDispatchToProps)(App);
