import React, {useEffect} from "react";
import {connect} from "react-redux";

import HouseCard from "../components/HouseCard";
import {getFavourites} from "../actions/userFlow"

const Favourites = ({housesIds, houses, getFavourites}) => {
    useEffect(() => {
        async function fetchData() {
            await getFavourites(housesIds)
        }
        housesIds && fetchData();
    }, [housesIds])

    return (
        <>
            {houses && houses.map(item => <HouseCard house={item}/>)}
        </>
    )
}

function mapStateToProps({userInfo}) {
    return {
            housesIds: userInfo.favouritesHousesIds,
            houses: userInfo.favouritesHousesInfo
        }
}

const mapDispatchToProps = {getFavourites};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);