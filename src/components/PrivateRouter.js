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
        if (response.data.isExpired) {
            const response = await axios.post('http://localhost:3000/rtoken', {}, { headers: { authorization: JSON.parse(localStorage.getItem('tokens')).refreshToken } })
            if (response.data.accessToken && response.data.refreshToken) {
                localStorage.setItem('tokens', JSON.stringify(response.data));
            }
            else {
                localStorage.removeItem('tokens');
                return <Redirect to={{ pathname: '/login', state: { showInfo: true } }} />
            }
        }
    })()
*/