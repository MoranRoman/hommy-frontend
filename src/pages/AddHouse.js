import React from "react";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"

import requester from "../factories";
import {signOut} from "../actions/userFlow";

const CreateHouse = ({signOut}) => {
    const alert = useAlert()
    const history = useHistory()
    const handleHouse = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();

        bodyFormData.set('district', e.target.district.value)
        bodyFormData.set('street', e.target.street.value)
        bodyFormData.set('houseNumber', e.target.houseNumber.value)
        bodyFormData.set('apartNumber', e.target.apartNumber.value)
        bodyFormData.set('squares', e.target.squares.value)
        bodyFormData.set('price', e.target.price.value)
        for(let key in e.target.housePhoto.files) {

            if (e.target.housePhoto.files.hasOwnProperty(key)) {
                bodyFormData.append('housePhoto', e.target.housePhoto.files[key])
            }

        }

        requester ('post', 'http://localhost:3000/houses', bodyFormData, signOut, history)
            .then(() => {
                alert.success("House successfully added")
            })
            .catch(error => {
                alert.error(<div style={{width: '500px'}}>{error.response.data}</div>)
            })
    }
    return (
        <>
            <h1>House</h1>
            <form onSubmit={(e) => handleHouse(e)}>
                <input name="district" type="text" placeholder="District"/>
                <input name="street" type="text" placeholder="Street"/>
                <input name="houseNumber" type="text" placeholder="House number"/>
                <input name="apartNumber" type="number" placeholder="Apartment number"/>
                <input name="squares" type="number" placeholder="Squares (in square meters)"/>
                <input name="price" type="number" placeholder="Price (in UAH per Month)"/>
                <input name="housePhoto" type="file" multiple/>
                <button>SUBMIT</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {signOut}

export default connect(null, mapDispatchToProps)(CreateHouse);