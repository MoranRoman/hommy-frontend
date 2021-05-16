import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Drawer } from 'antd'
import { signOut } from '../../actions/userFlow'

import './index.css'

const { SubMenu } = Menu
const LinkPage = ({ history }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ userInfo }) => userInfo)

  const [historyKey, setHistoryKey] = useState(null)
  const [visible, setVisible] = useState(false)

  const openDrawer = () => setVisible(true)

  const closeDrawer = () => setVisible(false)

  const handleClick = (e) => {
    if (e.key !== 'logout') history.push(e.key)
    else dispatch(signOut())

    setHistoryKey(e.key)
  }

  useEffect(() => {
    closeDrawer()
  }, [history.location.pathname])

  const renderNav = () => (
    <div
      className={`nav-menu ${
        window.innerWidth < 1200
          ? 'width-100-percent'
          : window.innerWidth < 1400
          ? 'width-75-percent'
          : 'width-50-percent'
      }`}
    >
      {history.location.pathname === '/catalog' ? (
        <Link to="/catalog">
          <a style={{ color: 'orange' }}>Catalog</a>
        </Link>
      ) : (
        <Link to="/catalog">Catalog</Link>
      )}
      {history.location.pathname === '/favourites' ? (
        <Link to="/favourites">
          <a style={{ color: 'orange' }}>Favourites</a>
        </Link>
      ) : (
        <Link to="/favourites">Favourites</Link>
      )}
      {JSON.parse(localStorage.getItem('tokens'))?.accessToken ? (
        <Menu onClick={handleClick} selectedKeys={[historyKey]} mode="horizontal">
          <SubMenu key="SubMenu" title="My account" className="div-account">
            <div className="div-user-photo">
              <img
                alt=""
                src={user.photoUrl || require('../../assets/images/default-photo.jpg')}
                className="avatar-link-page"
              />
              <span style={{ marginRight: '1vw', marginLeft: '1vw' }}>
                {user.name} {user.surname}
              </span>
            </div>
            <Menu.Item key="/my-advertisements">Advertisements</Menu.Item>
            <Menu.Item key="/">Messages</Menu.Item>
            <Menu.Item key="/settings">Settings</Menu.Item>
            <Menu.Item key="logout">Log out</Menu.Item>
          </SubMenu>
        </Menu>
      ) : (
        <Menu onClick={handleClick} selectedKeys={[historyKey]} mode="horizontal">
          <SubMenu key="SubMenu" title="My account" className="div-account">
            <div className="div-user-photo">
              <img alt="" src={user.photoUrl} className="avatar-link-page" />
              <span style={{ marginRight: '1vw', marginLeft: '1vw' }}>Guest</span>
            </div>
            <Menu.Item key="login">Log in</Menu.Item>
            <Menu.Item key="register">Register</Menu.Item>
          </SubMenu>
        </Menu>
      )}
      {history.location.pathname === '/supportchat' ? (
        <Link to="/">
          <a style={{ color: 'orange' }}>Help</a>
        </Link>
      ) : (
        <Link to="/">Help</Link>
      )}
      <div className="div-add-ad margin-right-4-vw">
        <svg
          width="27"
          height="100%"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ paddingLeft: '5px' }}
        >
          <rect y="11.7391" width="27" height="3.52174" rx="1.76087" className="plus" />
          <rect
            x="11.7391"
            y="27"
            width="27"
            height="3.52174"
            rx="1.76087"
            transform="rotate(-90 11.7391 27)"
            className="plus"
          />
        </svg>
        <Link to="/add-advertisement" style={{ paddingRight: '5px' }}>
          Add an ad
        </Link>
      </div>
    </div>
  )

  return (
    <nav className="link-tab">
      <div className={`logo ${window.innerWidth < 1000 ? '' : 'width-50-percent'}`}>
        {history.location.pathname === '/' ? (
          <Link to="/">
            <span style={{ color: 'orange' }}>&#8226;Hommy&#8226;</span>
          </Link>
        ) : (
          <Link to="/">&#8226;Hommy&#8226;</Link>
        )}
      </div>
      {window.innerWidth >= 900 ? (
        renderNav()
      ) : (
        <div className="open-drawer-div">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="double-left"
            width="2.5em"
            height="2.5em"
            fill="currentColor"
            aria-hidden="true"
            onClick={openDrawer}
          >
            <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" />
          </svg>
        </div>
      )}
      <Drawer title="Menu" placement="right" width="100%" closable onClose={closeDrawer} visible={visible}>
        <div className="nav-menu-drawer width-100-percent">
          {history.location.pathname === '/catalog' ? (
            <Link to="/catalog">
              <a style={{ color: 'orange' }}>Catalog</a>
            </Link>
          ) : (
            <Link to="/catalog">Catalog</Link>
          )}
          {history.location.pathname === '/favourites' ? (
            <Link to="/favourites">
              <a style={{ color: 'orange' }}>Favourites</a>
            </Link>
          ) : (
            <Link to="/favourites">Favourites</Link>
          )}
          {JSON.parse(localStorage.getItem('tokens'))?.accessToken ? (
            <Menu onClick={handleClick} selectedKeys={[historyKey]} mode="inline">
              <SubMenu key="SubMenu" title="My account" className="div-account">
                <div className="div-user-photo">
                  <img
                    src={user.photoUrl || require('../../assets/images/default-photo.jpg')}
                    className="avatar-link-page"
                  />
                  <span style={{ marginRight: '1vw', marginLeft: '1vw' }}>
                    {user.name} {user.surname}
                  </span>
                </div>
                <Menu.Item key="/my-advertisements">Advertisements</Menu.Item>
                <Menu.Item key="/">Messages</Menu.Item>
                <Menu.Item key="/settings">Settings</Menu.Item>
                <Menu.Item key="logout">Log out</Menu.Item>
              </SubMenu>
            </Menu>
          ) : (
            <Menu onClick={handleClick} selectedKeys={[historyKey]} mode="inline">
              <SubMenu key="SubMenu" title="My account" className="div-account">
                <div className="div-user-photo">
                  <img src={user.photoUrl} className="avatar-link-page" />
                  <span style={{ marginRight: '1vw', marginLeft: '1vw' }}>Guest</span>
                </div>
                <Menu.Item key="login">Log in</Menu.Item>
                <Menu.Item key="register">Register</Menu.Item>
              </SubMenu>
            </Menu>
          )}
          {history.location.pathname === '/supportchat' ? (
            <Link to="/">
              <a style={{ color: 'orange' }}>Help</a>
            </Link>
          ) : (
            <Link to="/">Help</Link>
          )}
          <div className="div-add-ad">
            <svg
              width="27"
              height="100%"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ paddingLeft: '5px' }}
            >
              <rect y="11.7391" width="27" height="3.52174" rx="1.76087" className="plus" />
              <rect
                x="11.7391"
                y="27"
                width="27"
                height="3.52174"
                rx="1.76087"
                transform="rotate(-90 11.7391 27)"
                className="plus"
              />
            </svg>
            <Link to="/add-advertisement" style={{ paddingRight: '5px' }}>
              Add an ad
            </Link>
          </div>
        </div>
      </Drawer>
    </nav>
  )
}

export default withRouter(LinkPage)
