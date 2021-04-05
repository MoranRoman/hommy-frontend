import React from "react";
import "./HomePage.css";
import {
    Link
} from "react-router-dom";

const HomePage = () => {
    return (
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
                        <Link to="/register" style={{ color: 'orange' }} >Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage