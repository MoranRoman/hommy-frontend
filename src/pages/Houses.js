import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {useAlert} from "react-alert";
import axios from "axios"

import HouseCard from "../components/HouseCard";


const Houses = () => {
    const [houses, setHouses] = useState([]);

    const showHouses = async (e) => {
        e.preventDefault();

        const response = await axios.get('http://localhost:3000/houses')

        response && setHouses(response.data.length === 0 ? [] : response.data);
    }
    return (
        <>
            <h1>Houses</h1>
            <button onClick={(e) => showHouses(e)}>SHOW</button>
            <ol>
                {houses && houses.map(house =>
                    <HouseCard house={house}/>
                )}
            </ol>
        </>
    )
}

export default Houses;