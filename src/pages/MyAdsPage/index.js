import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'

import HouseCard from '../../components/HouseCard'
import SideAdsFilter from '../../components/SideAdsFilter'
import requester from '../../factories'
import { modifyStringWithQueryParams } from '../../factories/location'

import './index.css'

const MyAdsPage = () => {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(false)

  const limit = parseInt((window.innerWidth * 0.94) / 300, 10) * 4

  const fetchHouses = async () => {
    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(`${process.env.REACT_APP_API_BACKEND_URL}/houses/my-houses?limit=${limit}&offset=0`),
    )
    setHouses(data)
  }

  useEffect(() => {
    const backgroundImage = require('../../assets/images/catalog-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`

    fetchHouses()
    // eslint-disable-next-line
  }, [limit])

  const loadMoreHouses = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(
        `${process.env.REACT_APP_API_BACKEND_URL}/houses/my-houses/?limit=${limit}&offset=${houses.length}`,
      ),
    )

    setHouses([...houses, ...data])
    setLoading(false)
  }

  return (
    <div className="my-ads-main">
      <SideAdsFilter handleSearch={fetchHouses} />
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
