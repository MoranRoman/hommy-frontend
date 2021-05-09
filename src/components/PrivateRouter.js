import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ({ path, component }) => {
  if (!JSON.parse(localStorage.getItem('tokens'))?.accessToken) {
    return <Redirect to={{ pathname: '/login', state: { showInfo: true } }} />
  }

  return <Route path={path} component={component} />
}

export default PrivateRouter
