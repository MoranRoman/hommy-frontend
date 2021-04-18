
import React, { useState } from "react";
import {
    Link,
    useHistory,
    withRouter,
    Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./LinkPage.css"
const { SubMenu } = Menu;
const LinkPage = ({ id, history, signOut }) => {
    const [state, setState] = useState({ current: "email" });
    const handleClick = e => {
        if (e.key === "settings") {
            history.push('/settings');
        }
        console.log('click ', e);
        setState({ current: e.key });
    };
    const user = useSelector(({ userInfo }) => userInfo)
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "40%", fontSize: "4vw", margin: "3vh 0 0 4vw" }}>
                {history.location.pathname === "/" ?
                    <Link to="/"><a style={{ color: "orange" }}>&#8226;Hommy&#8226;</a></Link> : <Link to="/">&#8226;Hommy&#8226;</Link>
                }
            </div>
            <div style={{ width: "60%", fontSize: "1.5vw", margin: "3vh 4vw 0 0", display: "flex" }}>
                <div className="right-clmn-div" style={{ width: "17.5%" }}>
                    {history.location.pathname === "/houses" ?
                        <Link to="/houses"><a style={{ color: "orange" }}>Catalog</a></Link> : <Link to="/houses">Catalog</Link>

                    }
                </div>
                <div className="right-clmn-div" style={{ width: "17.5%" }}>
                    {
                        history.location.pathname === "/favourites" ?
                            <Link to="/favourites"><a style={{ color: "orange" }}>Favourites</a></Link> : <Link to="/favourites">Favourites</Link>
                    }
                </div>
                <div className="right-clmn-div" style={{ width: "20%" }}>
                    {JSON.parse(localStorage.getItem('tokens'))?.accessToken ?
                        (< Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">

                            <SubMenu key="SubMenu" title="My account" className="div-account" >

                                <div className="div-user-photo">
                                    <img src={user.photoUrl || require("../../assets/images/default-photo.jpg")} className="avatar-link-page" />
                                    <span style={{ marginRight: "1vw" }}>{user.name} {user.surname}</span>
                                </div>

                                <Menu.Item key="setting:1">Advertisments</Menu.Item>
                                <Menu.Item key="setting:2">Messages</Menu.Item>
                                <Menu.Item key="settings">Settings</Menu.Item>
                                <Menu.Item key="setting:4">Log out</Menu.Item>
                            </SubMenu>
                        </Menu>) : (
                            < Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">

                                <SubMenu key="SubMenu" title="My account" className="div-account">

                                    <div className="div-user-photo">
                                        <img src={user.photoUrl} className="avatar-link-page" />
                                        <span style={{ marginRight: "1vw" }}>Guest</span>
                                    </div>
                                    <div>
                                        <Menu.Item key="setting:1"><Link to="/login">Sign in</Link></Menu.Item>
                                        <Menu.Item key="setting:1"><Link to="/signup">Sign up</Link></Menu.Item>


                                    </div>
                                </SubMenu>
                            </Menu>
                        )
                    }

                </div>
                <div className="right-clmn-div" style={{ width: "10%" }}>
                    {history.location.pathname === "/supportchat" ?
                        <Link to="/supportchat"><a style={{ color: "orange" }}>Help</a></Link> : <Link to="/supportchat">Help</Link>
                    }
                </div>
                <div className="right-clmn-div" style={{ width: "25%" }}>
                    <div className="div-add-ad">
                        <svg width="27" height="100%" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="11.7391" width="27" height="3.52174" rx="1.76087" className="plus" />
                            <rect x="11.7391" y="27" width="27" height="3.52174" rx="1.76087" transform="rotate(-90 11.7391 27)" className="plus" />
                        </svg>

                        <Link to="/advertisment">Add an ad</Link>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default withRouter(LinkPage)