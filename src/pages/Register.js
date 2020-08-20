import React from "react";
import axios from 'axios';
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";

const Register = () => {
    const history = useHistory();
    const alert = useAlert()
    const handleRegister = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();

        if(e.target.pass.value !== e.target.passConfirm.value) return alert.error('Passwords are different')

        bodyFormData.set('name', `${e.target.name.value}`);
        bodyFormData.set('surname', `${e.target.lastName.value}`);
        bodyFormData.set('login', `${e.target.login.value}`);
        bodyFormData.set('pass', `${e.target.pass.value}`);
        bodyFormData.set('mail', `${e.target.mail.value}`);
        e.target.userPhoto.files['0'] && bodyFormData.append('userPhoto', e.target.userPhoto.files['0']);

        axios.post('http://localhost:3000/register', bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                alert.success("Registration Successful")
                history.push('/login')
                return 0;
            })
            .catch(error => {
                alert.error(error.response.data);
            });
    }
    return (
        <>
            <form id="formElem" onSubmit={(e) => handleRegister(e)}>
                <h1>Register</h1>
                <input name="mail" type="e-mail" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                <input name="lastName" type="text" placeholder="Surname"/>
                <input name="name" type="text" placeholder="Name"/>
                <input name="login" type="text" placeholder="Login"/>
                <input name="pass" type="password" placeholder="Password"/>
                <input name="passConfirm" type="password" placeholder="Confirm your password"/>
                <input name="userPhoto" type="file" placeholder="Upload your photo"/>
                <button>SUBMIT</button>
            </form>
        </>
    )
}

export default Register;