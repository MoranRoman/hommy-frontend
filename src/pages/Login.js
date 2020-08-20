import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useAlert} from "react-alert";
import axios from "axios";
import {connect} from "react-redux";

import {signUp} from "../actions/userFlow";

const Login = ({signUp, ...rest}) => {
    const alert = useAlert()
    const history = useHistory();

    useEffect(() => {
        if (rest.location.state?.showInfo) alert.info("Login first")
    }, [])

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('http://localhost:3000/login', {
                login: e.target.login.value,
                pass: e.target.pass.value
            })

            await signUp(res.data)
            alert.success("Login successful");
            history.push(`/user/${res.data.id}`)
        } catch (e) {
            alert.error("Invalid username or password")
        }
    }

    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <h1>Login</h1>
            <input name="login" type="text" placeholder="login"/>
            <input name="pass" type="password" placeholder="password"/>
            <button>SUBMIT</button>
        </form>
    )
}

const mapDispatchToProps = {signUp};

export default connect(null, mapDispatchToProps)(Login);