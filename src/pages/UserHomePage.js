import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { connect } from 'react-redux'

import { signOut } from '../actions/userFlow'
import HouseCard from '../components/HouseCard'
import requester from '../factories'

const UserHomePage = ({ name, id, photoUrl, signOut }) => {
  const alert = useAlert()
  const history = useHistory()
  const [houses, setHouses] = useState([])
  const [fetchHouse, setFetchHouse] = useState(false)

  const handleChanges = async (e) => {
    try {
      e.preventDefault()
      await requester(
        'patch',
        `http://localhost:3000/users/${id}`,
        {
          mail: e.target.mail.value,
          login: e.target.login.value,
          name: e.target.name.value,
          surname: e.target.surname.value,
        },
        signOut,
        history,
      )
    } catch (err) {
      alert.error(<div style={{ width: '500px' }}>{err.response.data}</div>)
    }
  }

  const showHouses = async () => {
    try {
      const response = await requester('get', `http://localhost:3000/users/userHouses`, {}, signOut, history)
      setFetchHouse(true)
      setHouses(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handlePhotoChange = async (e) => {
    try {
      e.preventDefault()
      const bodyFormData = new FormData()
      bodyFormData.append('userPhoto', e.target.userPhoto.files['0'])
      bodyFormData.set('photoUrl', photoUrl)

      await requester('post', 'http://localhost:3000/users/changeProfilePhoto', bodyFormData, signOut, history)
      await requester('get', `http://localhost:3000/users/getById/${id}`, {}, signOut, history)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemove = async () => {
    try {
      await requester('delete', `http://localhost:3000/users/${id}`, {}, signOut, history)
      localStorage.clear()
      history.push('/deleted')
    } catch (e) {
      console.log(e)
      alert.error(<div style={{ width: '500px' }}>{e.response.data}</div>)
    }
  }

  return (
    <>
      <h1>Your Home Page</h1>
      <p>Hello, {name}!</p>
      <h2>CHANGES</h2>
      <form onSubmit={(e) => handlePhotoChange(e)}>
        <input name="userPhoto" type="file" placeholder="Upload" />
        <button>Upload New Photo</button>
      </form>
      <form onSubmit={(e) => handleChanges(e)}>
        <input name="mail" type="e-mail" placeholder="E-mail" />
        <input name="login" type="text" placeholder="Login" />
        <input name="name" type="text" placeholder="Name" />
        <input name="surname" type="text" placeholder="Surname" />
        <button>SUBMIT</button>
      </form>
      <button onClick={() => handleRemove()}>Delete Me</button>
      <button onClick={() => showHouses()}>Show My Houses</button>
      <ol>
        {houses.length !== 0 ? (
          houses.map((item) => <HouseCard house={item} />)
        ) : fetchHouse ? (
          <>
            <p>You have no houses, maybe add one?</p>
            <button onClick={() => history.push('/house')}>MAKE ONE</button>
          </>
        ) : (
          <></>
        )}
      </ol>
    </>
  )
}

function mapStateToProps({ userInfo }) {
  return {
    id: userInfo.id,
    name: userInfo.name,
    photoUrl: userInfo.photoUrl,
  }
}

const mapDispatchToProps = { signOut }

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
