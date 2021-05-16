import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'

import HouseCard from '../../components/HouseCard'
import requester from '../../factories'

import './index.css'

const MyAdsPage = () => {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(false)

  const limit = parseInt((window.innerWidth * 0.94) / 300, 10) * 4

  useEffect(() => {
    const fetchHouses = async () => {
      const data = await requester(
        `GET`,
        `${process.env.REACT_APP_API_BACKEND_URL}/houses/my-houses?limit=${limit}&offset=0`,
      )
      setHouses(data)
    }

    const backgroundImage = require('../../assets/images/catalog-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`

    fetchHouses()
  }, [limit])

  const loadMoreHouses = async () => {
    setLoading(true)
    const data = await requester(
      `GET`,
      `${process.env.REACT_APP_API_BACKEND_URL}/houses/my-houses/?limit=${limit}&offset=${houses.length}`,
    )
    setHouses([...houses, ...data])
    setLoading(false)
  }

  return (
    <div className="my-ads-main">
      <h2>Your Ads</h2>
      <div className="my-ads-main-cards">
        {houses?.length ? (
          <>
            {houses.map((house) => (
              <HouseCard key={house.id} {...house} isOwner />
            ))}
          </>
        ) : (
          <Spin size="large" />
        )}
        {houses?.length && (
          <>
            {!loading ? (
              <div className="load-more">
                <div className="load-more-btn" onClick={loadMoreHouses}>
                  <p>Load more...</p>
                </div>
              </div>
            ) : (
              <Spin size="large" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyAdsPage
