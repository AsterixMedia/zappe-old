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
  clientId: '4fgvc5rrm80lmhi0lwgqywb43159b775',
  clientSecret: 'LEZen03gnTrJhLOenE9LSj6EX5qgft4E',
  authURL: 'https://account.box.com/api/oauth2/authorize',
  tokenURL: 'https://api.box.com/oauth2/token',
  redirectUri: 'http://localhost:3000/login/box'
}

const { responseType, clientId, clientSecret, authURL, redirectUri, tokenURL } = loginConstants

export const userLogin = () => {
  console.log('running loginUser', loginConstants)
  // const url = `${authURL}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`
  const url = urlParams.generate(authURL, {
    'response_type': responseType,
    'client_id': clientId,
    'redirect_uri': redirectUri
  })

  return dispath => {
    dispath({ type: USER_LOGIN })
    window.location.replace(url)
  }
}

export const userLoginFinalize = token => {
  return dispatch => {
    dispatch({ type: USER_LOGIN_FINALIZE, token })
    axios
      .post(tokenURL, {
        'grant_type': 'authorization_code',
        code: token,
        client_id: clientId,
        client_secret: clientSecret
      })
      .then(response => response.data)
      .then(response => {
        console.log(response)
        dispatch({ type: USER_LOGIN_SUCCESS, response })
      })
      .catch(error => {
        dispatch({ type: USER_LOGIN_FAIL, error })
        console.log(error)
      })
  }
}
