import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRouter from './components/PrivateRouter'
import LoginPage from './pages/LoginPage'
import { signUpByToken, signOut } from './actions/userFlow'
import HomePage from './pages/HomePage'
import LinkPage from './pages/LinkPage'
import AdPage from './pages/CreateAdPage'
import SettingsPage from './pages/SettingsPage'
import RegistrationPage from './pages/RegistrationPage'
import NotFoundPage from './pages/NotFoundPage'
import CatalogPage from './pages/CatalogPage'
import FavouritesPage from './pages/FavouritesPage'
import MyAdsPage from './pages/MyAdsPage'

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
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/view-advertisement/:id" component={(props) => <AdPage isViewing {...props} />} />
        <Route exact path="/catalog" component={CatalogPage} />
        <PrivateRouter exact path="/add-advertisement" component={AdPage} />
        <PrivateRouter exact path="/my-advertisements" component={MyAdsPage} />
        <PrivateRouter exact path="/update-advertisement/:id" component={AdPage} />
        <PrivateRouter path="/settings" component={() => <SettingsPage />} />
        <PrivateRouter path="/favourites" component={FavouritesPage} />
        <Route component={NotFoundPage} />

        {JSON.parse(localStorage.getItem('tokens'))?.accessToken ? <Redirect to="/catalog" /> : <Redirect to="/" />}
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
