import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRouter from './components/PrivateRouter'
import LoginPage from './pages/LoginPage'
import UserHomePage from './pages/UserHomePage'
import AdminPanel from './pages/AdminPanel'
import Houses from './pages/Houses'
import CreateHouse from './pages/AddHouse'
import Users from './pages/Users'
import User from './pages/User'
import DeletedUserPage from './pages/DeletedUserPage'
import HouseById from './pages/HouseById'
import SupportChat from './pages/SupportChat'
import Favourites from './pages/Favourites'
import { signUpByToken, signOut } from './actions/userFlow'
import HomePage from './pages/HomePage'
import LinkPage from './pages/LinkPage'
import AdPage from './pages/CreateAdPage'
import SettingsPage from './pages/SettingsPage'
import RegistrationPage from './pages/RegistrationPage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'
import 'antd/dist/antd.less'

const App = ({ signUpByToken }) => {
  useEffect(() => {
    async function fetchData() {
      await signUpByToken()
    }
    if (JSON.parse(localStorage.getItem('tokens'))?.accessToken) fetchData()
  }, [signUpByToken])

  return (
    <Router>
      <LinkPage />
      <Switch>
        <PrivateRouter exact path="/add-advertisement" component={AdPage} />
        <PrivateRouter exact path="/update-advertisement/:id" component={AdPage} />
        <PrivateRouter exact path="/view-advertisement/:id" component={(props) => <AdPage isViewing {...props} />} />
        <Route exact path="/404" component={NotFoundPage} />
        <PrivateRouter path="/settings" component={() => <SettingsPage signOut />} />
        <PrivateRouter path="/adminpanel" component={AdminPanel} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRouter exact path="/house" component={CreateHouse} />
        <Route exact path="/houses" component={Houses} />
        <PrivateRouter path="/house/:id" component={HouseById} />
        <PrivateRouter exact path="/users" component={Users} />
        <PrivateRouter path="/profile" component={UserHomePage} />
        <PrivateRouter exact path="/user" component={User} />
        <Route path="/deleted" component={DeletedUserPage} />
        <PrivateRouter path="/supportchat" component={SupportChat} />
        <PrivateRouter path="/favourites" component={Favourites} />
        <Route path="/" component={HomePage} />

        {JSON.parse(localStorage.getItem('tokens'))?.accessToken ? <Redirect to="/houses" /> : <Redirect to="/" />}
      </Switch>
    </Router>
  )
}

function mapStateToProps({ userInfo }) {
  return {
    name: userInfo.name,
    photoUrl: userInfo.photoUrl,
    id: userInfo.id,
    role: userInfo.role,
  }
}

const mapDispatchToProps = { signUpByToken, signOut }

export default connect(mapStateToProps, mapDispatchToProps)(App)
