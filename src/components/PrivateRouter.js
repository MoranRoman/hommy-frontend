import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import axios from 'axios'

const PrivateRouter = ({ path, component }) => {
    if (!JSON.parse(localStorage.getItem('tokens'))?.accessToken) {
        return <Redirect to={{ pathname: '/login', state: { showInfo: true } }} />
    }

    return <Route path={path} component={component} />
}

export default PrivateRouter;

/*

 (async () => {
        const response = await axios.get('http://localhost:3000/checkToken', { headers: { authorization: JSON.parse(localStorage.getItem('tokens')).accessToken } })

    })()
*/