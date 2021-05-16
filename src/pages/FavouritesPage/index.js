import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import HouseCard from '../../components/HouseCard'
import requester from '../../factories'
import './index.css'

const FavouritesPage = () => {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(false)

  const limit = parseInt((window.innerWidth * 0.86) / 300, 10) * 4

  useEffect(() => {
    const fetchHouses = async () => {
      const data = await requester(
        `GET`,
        `${process.env.REACT_APP_API_BACKEND_URL}/houses/favourites/?limit=${limit}&offset=0`,
      )
      setHouses(data)
    }
    const backgroundImage = require('../../assets/images/favourites-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
    fetchHouses()
  }, [limit])

  const unlikeHouse = (id) => {
    setHouses(houses.filter((house) => house.id !== id))
  }

  const loadMoreHouses = async () => {
    setLoading(true)
    const data = await requester(
      `GET`,
      `${process.env.REACT_APP_API_BACKEND_URL}/houses/favourites/?limit=${limit}&offset=${houses.length}`,
    )
    setHouses([...houses, ...data])
    setLoading(false)
  }

  return (
    <div className="favourites-main">
      <h2>Favourites</h2>

      <div className="favourites-main-cards">
        {houses?.length ? (
          <>
            {houses.map((house) => (
              <HouseCard key={house.id} {...house} unlike={unlikeHouse} />
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

export default FavouritesPage
