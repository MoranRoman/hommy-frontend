import React from 'react'
import { Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import './index.css'

const HouseCard = ({ id, photoUrl, houseType, location, price }) => {
  const history = useHistory()
  const viewHouse = () => {
    history.push(`/view-advertisement/${id}`)
  }
  return (
    <div className="main-card" onClick={viewHouse}>
      <div className="card-content">
        <div className="card-content-header">
          <img alt="" src={(photoUrl?.length && photoUrl[0]) || require('../../assets/images/home_house_3526.ico')} />
        </div>
        <div className="card-house-type">
          <h3>{houseType}</h3>
          <img src={require('../../assets/images/like.svg')} width="30" height="30" alt="" />
        </div>
        <div className="card-house-ext-info">
          <div className="card-house-ext-info-location">
            <img src={require('../../assets/images/location.svg')} width="30" height="30" alt="" />
            <Tooltip title={location}>
              <h3>{location.split(',')[2]}</h3>
            </Tooltip>
          </div>
          <div className="card-house-ext-info-cost">
            <img src={require('../../assets/images/money.svg')} width="30" height="30" alt="" />
            <h3>{price}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseCard
