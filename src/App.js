import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,

} from "react-router-dom";
import { connect } from 'react-redux'
import PrivateRouter from "./components/PrivateRouter";
import LoginPage from "./pages/LoginPage/LoginPage";
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
import { signUpByToken, signOut } from "./actions/userFlow";
import HomePage from "./pages/HomePage/HomePage";
import LinkPage from "./pages/LinkPage/LinkPage";
import "./App.css"

const App = ({ name, photoUrl, id, role, signUpByToken, signOut }) => {
    useEffect(() => {
        async function fetchData() {
            await signUpByToken()
        }

        JSON.parse(localStorage.getItem('tokens'))?.accessToken &&
            fetchData()
    }, [])
    const onSearch = value => console.log(value);
    return (
        <Router>
            <LinkPage id signOut />
            <Switch>


                <PrivateRouter path='/adminpanel' component={AdminPanel} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={LoginPage} />
                <PrivateRouter exact path='/house' component={CreateHouse} />
                <Route exact path='/houses' component={Houses} />
                <PrivateRouter path='/house/:id' component={HouseById} />
                <PrivateRouter exact path='/users' component={Users} />
                <PrivateRouter path='/user/:id' component={UserHomePage} />
                <PrivateRouter exact path='/user' component={User} />
                <Route path='/deleted' component={DeletedUserPage} />
                <PrivateRouter path='/supportchat' component={SupportChat} />
                <PrivateRouter path='/favourites' component={Favourites} />
                <Route path='/' component={HomePage} />
                {JSON.parse(localStorage.getItem('tokens'))?.accessToken ?
                    (<Redirect to="/houses" />) : (<Redirect to="/" />)}
            </Switch>
        </Router >
    )
}

function mapStateToProps({ userInfo }) {
    return {
        name: userInfo.name,
        photoUrl: userInfo.photoUrl,
        id: userInfo.id,
        role: userInfo.role
    }
}

const mapDispatchToProps = { signUpByToken, signOut };

export default connect(mapStateToProps, mapDispatchToProps)(App);
