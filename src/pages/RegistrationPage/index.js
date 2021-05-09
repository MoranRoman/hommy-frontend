import React, { useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import './index.css'

const RegistrationPage = ({ history }) => {
  const alert = useAlert()

  useEffect(() => {
    const backgroundImage = require('../../assets/images/registration-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  const handleRegister = (e) => {
    e.preventDefault()
    const bodyFormData = new FormData()

    if (e.target.pass.value !== e.target.passConfirm.value) return alert.error('Passwords are different')

    bodyFormData.set('name', `${e.target.name.value}`)
    bodyFormData.set('surname', `${e.target.lastName.value}`)
    bodyFormData.set('pass', `${e.target.pass.value}`)
    bodyFormData.set('mail', `${e.target.email.value}`)

    axios
      .post('http://localhost:3000/register', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        alert.success('Registration Successful')
        history.push('/login')
      })
      .catch((error) => {
        alert.error(error.response.data)
      })
  }

  return (
    <form id="formElem" onSubmit={(e) => handleRegister(e)}>
      <div className={window.innerWidth <= 900 ? 'div-reg-main-sm' : 'div-reg-main'}>
        <input name="name" type="text" placeholder="Name" className="div-reg-email" required />
        <input
          name="lastName"
          type="text"
          placeholder="Surname"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <input
          name="passConfirm"
          type="password"
          placeholder="Confirm your password"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <div className="oauth-icon">
          <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M65.4596 27.0217L65.1695 25.4363H31.0664V40.905H48.6559C45.7144 46.7565 39.7183 50.5312 33 50.5312C23.3332 50.5312 15.4688 42.6668 15.4688 33C15.4688 23.3332 23.3332 15.4688 33 15.4688C37.6826 15.4688 42.0852 17.2923 45.3965 20.6035L46.7637 21.9707L57.7018 11.0327L56.3346 9.66552C50.1017 3.43264 41.8147 0 33 0C24.1854 0 15.8984 3.43264 9.66539 9.66539C3.43264 15.8984 0 24.1854 0 33C0 41.8146 3.43264 50.1016 9.66539 56.3346C15.8984 62.5674 24.1854 66 33 66C41.8146 66 50.1016 62.5674 56.3346 56.3346C62.5674 50.1016 66 41.8146 66 33C66 30.9923 65.8182 28.9808 65.4596 27.0217ZM33 3.86719C40.1339 3.86719 46.876 6.4136 52.1883 11.077L46.7031 16.5623C42.8639 13.3504 38.0661 11.6016 33 11.6016C26.2426 11.6016 20.2077 14.751 16.2833 19.6581L10.7923 14.1671C16.1404 7.87037 24.1109 3.86719 33 3.86719ZM8.46411 17.3077L14.111 22.9546C12.5105 25.9518 11.6016 29.3715 11.6016 33C11.6016 36.6285 12.5105 40.0482 14.1109 43.0454L8.46398 48.6923C5.55534 44.1602 3.86719 38.7736 3.86719 33C3.86719 27.2264 5.55534 21.8398 8.46411 17.3077ZM10.7923 51.8329L16.2833 46.3419C20.2077 51.249 26.2426 54.3984 33 54.3984C36.5537 54.3984 39.9764 53.5399 43.0524 51.896L48.6924 57.5359C44.1602 60.4447 38.7736 62.1328 33 62.1328C24.1109 62.1328 16.1404 58.1296 10.7923 51.8329ZM51.8329 55.2077L46.3491 49.724C49.654 47.087 52.0744 43.5899 53.3708 39.5642L54.1843 37.0379H34.9336V29.3035H61.9004C62.055 30.5256 62.1328 31.7633 62.1328 33C62.1328 41.8891 58.1296 49.8596 51.8329 55.2077Z"
              fill="white"
            />
          </svg>
          <svg width="67" height="66" viewBox="0 0 67 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M56.8981 0H10.234C4.90353 0 0.56604 4.33749 0.56604 9.66797V56.332C0.56604 61.6625 4.90353 66 10.234 66H29.6989V42.668H21.9645V31.0664H29.6989V23.2031C29.6989 16.8056 34.9029 11.6016 41.3004 11.6016H53.0309V23.2031H41.3004V31.0664H53.0309L51.0973 42.668H41.3004V66H56.8981C62.2285 66 66.566 61.6625 66.566 56.332V9.66797C66.566 4.33749 62.2285 0 56.8981 0Z"
              fill="white"
            />
          </svg>
          <svg width="67" height="66" viewBox="0 0 67 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M45.5071 0H20.7571C9.36796 0 0.13208 9.23588 0.13208 20.625V45.375C0.13208 56.7641 9.36796 66 20.7571 66H45.5071C56.8962 66 66.1321 56.7641 66.1321 45.375V20.625C66.1321 9.23588 56.8962 0 45.5071 0ZM59.9446 45.375C59.9446 53.3363 53.4683 59.8125 45.5071 59.8125H20.7571C12.7958 59.8125 6.31958 53.3363 6.31958 45.375V20.625C6.31958 12.6638 12.7958 6.1875 20.7571 6.1875H45.5071C53.4683 6.1875 59.9446 12.6638 59.9446 20.625V45.375Z"
              fill="white"
            />
            <path
              d="M33.1321 16.5C24.02 16.5 16.6321 23.8879 16.6321 33C16.6321 42.1121 24.02 49.5 33.1321 49.5C42.2442 49.5 49.6321 42.1121 49.6321 33C49.6321 23.8879 42.2442 16.5 33.1321 16.5ZM33.1321 43.3125C27.4478 43.3125 22.8196 38.6842 22.8196 33C22.8196 27.3116 27.4478 22.6875 33.1321 22.6875C38.8163 22.6875 43.4446 27.3116 43.4446 33C43.4446 38.6842 38.8163 43.3125 33.1321 43.3125Z"
              fill="white"
            />
            <path
              d="M50.8696 17.4612C52.0839 17.4612 53.0682 16.4768 53.0682 15.2625C53.0682 14.0483 52.0839 13.0639 50.8696 13.0639C49.6553 13.0639 48.671 14.0483 48.671 15.2625C48.671 16.4768 49.6553 17.4612 50.8696 17.4612Z"
              fill="white"
            />
          </svg>
        </div>
        <button className="div-reg-main-btn">Register</button>
        <Link to="/login">Already have an account?</Link>
      </div>
    </form>
  )
}

export default RegistrationPage
