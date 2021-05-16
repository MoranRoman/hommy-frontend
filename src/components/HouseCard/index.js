import React, { useState } from 'react'
import { Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import requester from '../../factories'
import './index.css'

const HouseCard = ({ id, photoUrl, houseType, location, price, Likes, unlike, isOwner }) => {
  const history = useHistory()
  const [liked, setLiked] = useState(!!Likes?.length)

  const like = () => {
    setLiked(!liked)
    requester(`POST`, `${process.env.REACT_APP_API_BACKEND_URL}/houses/like`, { houseId: id }, {}, history)
    if (unlike) {
      unlike(id)
    }
  }

  const viewHouse = () => history.push(`/view-advertisement/${id}`)

  const updateHouse = () => history.push(`/update-advertisement/${id}`)

  return (
    <div className="main-card">
      <div className="card-content">
        <div className="card-content-header" onClick={isOwner ? updateHouse : viewHouse}>
          <img alt="" src={(photoUrl?.length && photoUrl[0]) || require('../../assets/images/housedefault.jpg')} />
        </div>
        <div className="card-house-type">
          <h3>{houseType}</h3>
          <svg
            onClick={like}
            width="30"
            height="30"
            viewBox="-2 -5 30 30"
            fill={liked ? '#FDB137' : 'none'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.7421 2.25085C22.4072 0.799395 20.5755 0 18.584 0C17.0954 0 15.7322 0.471787 14.532 1.40215C13.9265 1.87176 13.3777 2.44631 12.8939 3.11691C12.4103 2.44651 11.8614 1.87176 11.2556 1.40215C10.0557 0.471787 8.69243 0 7.20385 0C5.21239 0 3.38049 0.799395 2.04557 2.25085C0.726583 3.68534 0 5.64507 0 7.76929C0 9.95565 0.812757 11.957 2.5577 14.0678C4.11868 15.9559 6.36217 17.8727 8.9602 20.0922C9.84733 20.8501 10.8529 21.7093 11.897 22.6245C12.1729 22.8667 12.5268 23 12.8939 23C13.2609 23 13.615 22.8667 13.8905 22.6249C14.9346 21.7095 15.9407 20.8499 16.8283 20.0916C19.4259 17.8725 21.6694 15.9559 23.2304 14.0676C24.9753 11.957 25.7879 9.95565 25.7879 7.7691C25.7879 5.64507 25.0613 3.68534 23.7421 2.25085Z fill=#FDB137" />
          </svg>
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
