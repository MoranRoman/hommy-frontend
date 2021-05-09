import React, { useEffect } from 'react'

import './index.css'

const HomePage = ({ history }) => {
  useEffect(() => {
    const backgroundImage = require('../../assets/images/homepage.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  const redirect = (url) => history.push(url)

  return (
    <div className="div-main-body">
      <div className={window.innerWidth <= 800 ? 'div-main-sm' : 'div-main-xl'}>
        <div className={`div-text ${window.innerWidth <= 1000 ? 'text-align-center' : 'text-align-left'}`}>
          <span>Find your perfect home with Hommy.</span>
          <br />
          <span> Live where you want and sell what you want.</span>
          <div className="div-btns">
            <div className="div-btns-default login" onClick={() => redirect('/login')}>
              Login
            </div>
            <div className="div-btns-default register" onClick={() => redirect('/register')}>
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
