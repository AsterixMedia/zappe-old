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
  clientId: 'do2uls6u4m8mdwt5pwzu5009r48y42mt',
  clientSecret: 'Na4GQL9DPWA9lHJM8DgwiLRMKv1NUAuj',
  authURL: 'https://account.box.com/api/oauth2/authorize',
  tokenURL: 'https://api.box.com/oauth2/token',
  redirectUri: 'http://localhost:3000/login/box'
}

/*
curl https://api.box.com/oauth2/token \
-d 'grant_type=authorization_code' \
-d 'code=LLXocvuRfWkzBkUkjGlnKUJTa6l7n81f' \
-d 'client_id=4fgvc5rrm80lmhi0lwgqywb43159b775' \
-d 'client_secret=LEZen03gnTrJhLOenE9LSj6EX5qgft4E' \
-X POST
*/

const { responseType, clientId, clientSecret, authURL, redirectUri, tokenURL } = loginConstants

export const userLogin = () => {
  console.log('running loginUser', loginConstants)
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
      .then(respose => {
        console.log(respose)
        dispatch({ type: USER_LOGIN_SUCCESS, respose })
      })
      .catch(error => dispatch({ type: USER_LOGIN_FAIL, error }))
  }
}
