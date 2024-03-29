import axios from 'axios'
import urlParams from 'params-url'
import Router from 'next/router'

import { retrieveAuthLocalStorage } from '../utils'
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FINALIZE,
  USER_LOGIN_SUCCESS_REFRESH,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from './types'

const loginConstants = {
  responseType: 'code',
  clientId: process.env.BOX_ID,
  clientSecret: process.env.BOX_SECRET,
  authURL: process.env.BOX_AUTH_URL,
  tokenURL: process.env.BOX_TOKEN_URL,
  redirectUri: `http://localhost:3000/login/box`
}

const {
  responseType,
  clientId,
  clientSecret,
  redirectUri,
  tokenURL
} = loginConstants

const time = new Date()
console.log(time.getTime())

export const userLogin = () => {
  const url = urlParams.generate(process.env.BOX_AUTH_URL, {
    'response_type': responseType,
    'client_id': clientId,
    'redirect_uri': redirectUri
  })

  return dispatch => {
    dispatch({ type: USER_LOGIN })
    window.location.replace(url)
  }
}

export const userLoginFinalize = (token) => {
  return dispatch => {
    dispatch({ type: USER_LOGIN_FINALIZE, token })
    const data = `grant_type=${'authorization_code'}&code=${token}&client_id=${clientId}&client_secret=${clientSecret}`
    axios
      .post(tokenURL, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      .then(response => response.data)
      .then(response => {
        const localStorage = window.localStorage
        localStorage.setItem(
          'zappe:authUser',
          JSON.stringify({...response, loggedIn: true, vendor: 'box'})
        )
        dispatch({ type: USER_LOGIN_SUCCESS, response })
        console.log('Login Success')
        Router.push('/play')
      })
      .catch(error => {
        dispatch({ type: USER_LOGIN_FAIL, error })
        console.log('Error in action')
        Router.push('/login/error', { shallow: true })
      })
  }
}

export const userLoginStatusCheck = () => {
  return dispatch => {
    const authInfo = retrieveAuthLocalStorage()
    console.log('authInfo', authInfo)
    if (authInfo === null) {
      Router.push('/login')
    } else {
      dispatch({
        type: USER_LOGIN_SUCCESS_REFRESH,
        payload: authInfo
      })
    }
  }
}

export const userLogout = () => dispatch => {
  window.localStorage.removeItem('zappe:authUser')
  dispatch({ type: USER_LOGOUT })
  Router.push('/')
}

/*
  TODO: Figure out refreshing token strategy
  TODO: Handle login error better
  TODO: Add proper sign out option (current implmentation is a bad hack :/ )
*/
