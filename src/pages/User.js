import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"

import {signOut} from "../actions/userFlow";
import requester from "../factories";

const User = ({signOut}) => {
    const [user, setUser] = useState({});
    const history = useHistory();
    const showUserById = async (e) => {
        let id = e.target.userId.value

        e.preventDefault();
        await requester('get', `http://localhost:3000/users/${id}`, {}, signOut, history)
            .then(res => {
                setUser(res.data);
            })
    }
    return (
        <>
            <h1>Get user by ID</h1>
            <form onSubmit={(e) => showUserById(e)}>
                <input name="userId" type="number" placeholder="Enter user ID"/>
                <button>SUBMIT</button>
                <p>User Login: {user.login}</p>
                <p>User Name: {user.name}</p>
                <p>User Surname: {user.surname}</p>
                <p>User mail: {user.mail}</p>
            </form>
        </>
    )
}

const mapDispatchToProps = {signOut}

export default connect(null, mapDispatchToProps)(User);