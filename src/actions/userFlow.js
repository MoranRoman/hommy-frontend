import axios from 'axios'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, GET_FAVOURITES_SUCCESS, SET_USER_PHOTOURL } from '../types'

export function signUpByToken() {
  return async (dispatch) => {
    try {
      const {
        data: { user },
      } = await axios.post('http://localhost:3000/getByToken', {
        accessToken: JSON.parse(localStorage.getItem('tokens')).accessToken,
      })
      dispatch({ type: SIGN_IN_SUCCESS, payload: user })
    } catch (e) {
      try {
        const response = await axios.post(
          'http://localhost:3000/rtoken',
          {},
          { headers: { authorization: JSON.parse(localStorage.getItem('tokens')).refreshToken } },
        )
        if (response.data.accessToken && response.data.refreshToken) {
          localStorage.setItem('tokens', JSON.stringify(response.data))
          const {
            data: { user },
          } = await axios.post('http://localhost:3000/getByToken', {
            accessToken: JSON.parse(localStorage.getItem('tokens')).accessToken,
          })
          dispatch({ type: SIGN_IN_SUCCESS, payload: user })
        } else {
          localStorage.removeItem('tokens')
          window.location = '/login'
        }
      } catch (e) {
        window.location = '/login'
      }
    }
  }
}

export function signOut() {
  return async (dispatch) => {
    try {
      localStorage.clear()
      dispatch({ type: SIGN_OUT_SUCCESS })
    } catch (e) {
      console.log(e)
    }
  }
}

export function signIn(userData) {
  return async (dispatch) => {
    try {
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: userData.tokens.accessToken,
          refreshToken: userData.tokens.refreshToken,
        }),
      )
      dispatch({ type: SIGN_IN_SUCCESS, payload: userData })
    } catch (e) {
      console.log(e)
    }
  }
}

export function getFavourites(houseIds) {
  return async (dispatch) => {
    try {
      const data = await Promise.all(
        houseIds.map(async (houseId) => {
          const { data } = await axios.get(`http://localhost:3000/houses/${houseId}`, {
            headers: { Authorization: JSON.parse(localStorage.getItem('tokens')).accessToken },
          })
          return data
        }),
      )
      dispatch({ type: GET_FAVOURITES_SUCCESS, payload: { favouritesHousesInfo: data } })
    } catch (e) {
      console.log(e)
    }
  }
}

export function setNewUserPhoto(photoUrl) {
  return async (dispatch) => dispatch({ type: SET_USER_PHOTOURL, payload: { photoUrl } })
}
