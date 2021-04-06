import React, { useEffect } from "react";

const SettingsPage = () => {
    useEffect(() => {
        let backgroundImage = require("../../assets/images/settings-background.jpg");
        document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`;
    }, [])
    return (
        <>
            <h1>You successfully deleted your account</h1>
        </>
    )
}

export default SettingsPage