import React, { useEffect } from "react";
import "./HomePage.css";
import {
    Link
} from "react-router-dom";
const HomePage = () => {
    useEffect(() => {
        let backgroundImage = require("../../assets/images/homepage.jpg");
        document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`;
    }, [])
    return (
        <div className="div-main-body">
            <div className="div-main">
                <div style={{ width: "60%" }}>

                </div>
                <div className="div-text">
                    <span>Find your perfect home with Hommy.</span>
                    <br />
                    <span> Live where you want and sell what you want.</span>
                    <div className="div-btns">
                        <div className="div-left-btn">
                            <Link to="/login">Log in</Link>
                        </div>
                        <div className="div-right-btn">
                            <Link to="/signup" style={{ color: 'orange' }} >Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage