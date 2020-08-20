import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios"
import {connect} from "react-redux"

import requester from "../factories";
import {signOut} from "../actions/userFlow";

const Users = ({signOut}) => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const showUsers = async (e) => {
        e.preventDefault()
        const response = await requester('get', 'http://localhost:3000/users', {}, signOut, history)

        response && setUsers(response.data.length === 0 ? [] : response.data);
    }
    return (
        <>
            <h1>Users</h1>
            <button onClick={(e) => showUsers(e)}>SHOW</button>
            <ol>
                {users.map(item => <li key={item.id}>User ID: {item.id}, Login: {item.name};</li>)}
            </ol>
        </>
    )
}

const mapDispatchToProps = {signOut}

export default connect(null, mapDispatchToProps)(Users);