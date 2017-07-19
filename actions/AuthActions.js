import axios from 'axios'
import urlParams from 'params-url'
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FINALIZE,
  USER_LOGIN_FAIL
} from './types'

// TODO: RESET auth info after debugging
const loginConstants = {
  responseType: 'code',
  clientId: process.env.BOX_ID,
  clientSecret: process.env.BOX_SECRET,
  authURL: process.env.BOX_AUTH_URL,
  tokenURL: process.env.BOX_TOKEN_URL,
  redirectUri: process.env.BOX_REDIRECT
}

const { responseType, clientId, clientSecret, authURL, redirectUri, tokenURL } = loginConstants

export const userLogin = () => {
  console.log('running loginUser', loginConstants)
  const url = urlParams.generate(authURL, {
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
    console.log(token)
    dispatch({ type: USER_LOGIN_FINALIZE, token })
    const data = `grant_type=${'authorization_code'}&code=${token}&client_id=${clientId}&client_secret=${clientSecret}`
    axios
      .post(
        tokenURL,
        data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
      .then(response => response.data)
      .then(response => {
        console.log(response)
        dispatch({ type: USER_LOGIN_SUCCESS, response })
      })
      .catch(error => dispatch({ type: USER_LOGIN_FAIL, error }))
  }
}
