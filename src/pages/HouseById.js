import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut } from '../actions/userFlow'
import requester from '../factories'

const HouseById = ({ userId, signOut }) => {
  const alert = useAlert()
  const history = useHistory()
  const [house, setHouse] = useState([])
  const [id] = useState(history.location.pathname.split('/')[2])

  useEffect(() => {
    async function fetchData() {
      const response = await requester('get', `http://localhost:3000/houses/${id}`, {}, signOut, history)
      response && setHouse(response.data.length === 0 ? [] : response.data)
    }
    fetchData()
  }, [history, id, signOut])

  async function handleDeletePhoto(e, photoUrl) {
    e.preventDefault()
    const response = await requester(
      'post',
      `http://localhost:3000/houses/deletePhoto`,
      {
        photoUrl,
        houseId: house.id,
      },
      signOut,
      history,
    )
    setHouse({ ...house, photoUrl: response.data })
  }

  async function handleNewPhoto(e) {
    e.preventDefault()
    const bodyFormData = new FormData()
    bodyFormData.set('houseId', house.id)

    for (const key in e.target.housePhoto.files) {
      if (e.target.housePhoto.files.hasOwnProperty(key)) {
        bodyFormData.append('housePhoto', e.target.housePhoto.files[key])
      }
    }

    await requester('post', `http://localhost:3000/houses/addPhoto`, bodyFormData, signOut, history)
    await setTimeout(async () => {
      const response = await requester('get', `http://localhost:3000/houses/${id}`, {}, signOut, history)
      setHouse(response.data.length === 0 ? [] : response.data)
    }, 1000)
  }

  async function addFavourite() {
    try {
      await requester('post', `http://localhost:3000/users/addFavourite`, { houseId: id }, signOut, history)
    } catch (e) {
      console.log(e)
      alert.error('Oops something went wrong')
    }
  }

  console.log(house)

  return (
    <>
      <p>District: {house.district}</p>
      <p>Street: {house.street}</p>
      <p>House number: {house.houseNumber}</p>
      {house.apartNumber && <p>Apart number: {house.apartNumber}</p>}
      <p>Squares: {house.squares}</p>
      <p>Price: {house.price}</p>
      {house.photoUrl?.map((item) => (
        <>
          <img style={{ width: '150px', height: '150px' }} src={item} alt="" />
          {userId === house.userId && <button onClick={(e) => handleDeletePhoto(e, item)}>X</button>}
        </>
      ))}
      {userId === house.userId && (
        <>
          <form onSubmit={(e) => handleNewPhoto(e)}>
            <input type="file" name="housePhoto" multiple />
            <button formAction="submit">Upload</button>
          </form>
        </>
      )}
      <button onClick={() => addFavourite()}>Add to Favourites</button>
    </>
  )
}

function mapStateToProps({ userInfo }) {
  return {
    userId: userInfo.id,
  }
}

const mapDispatchToProps = { signOut }

export default connect(mapStateToProps, mapDispatchToProps)(HouseById)
