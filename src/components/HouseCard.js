import React from "react";
import {useHistory} from "react-router-dom";


const HouseCard = ({house}) => {
    const history = useHistory();

    return (
        <>
            <li key={house.id}>
                <img style={{width: '100px', height: '100px'}} src={house.photoUrl[0]} alt=""/>
                District: {house.district}
                Street: {house.street}
                House number: {house.houseNumber}
                {house.apartNumber && <span>Apart number: {house.apartNumber}</span>}
                Squares: {house.squares}
                Price: {house.price}
                <button onClick={() => history.push(`/house/${house.id}`)}>More info</button>
            </li>
        </>
    )
}

export default HouseCard;