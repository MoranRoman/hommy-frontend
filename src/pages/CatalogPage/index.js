import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import HouseCard from '../../components/HouseCard'
import requester from '../../factories'
import './index.css'

const CatalogPage = () => {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(false)
  const limit = parseInt((window.innerWidth * 0.94) / 300) * 4
  useEffect(() => {
    const fetchHouses = async () => {
      const data = await requester(`GET`, `${process.env.REACT_APP_API_BACKEND_URL}/houses/?limit=${limit}&offset=0`)
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
      `${process.env.REACT_APP_API_BACKEND_URL}/houses/?limit=${limit}&offset=${houses.length}`,
    )
    setHouses([...houses, ...data])
    setLoading(false)
  }
  return (
    <div className="catalog-main">
      <h2>Catalog</h2>

      <div className="catalog-main-cards">
        {houses.length > 0 ? (
          <>
            {houses.map((house) => (
              <HouseCard {...house} />
            ))}
          </>
        ) : (
          <Spin size="large" />
        )}
        {houses.length > 0 && (
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

export default CatalogPage
