import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FINALIZE,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS_REFRESH,
  USER_LOGOUT
} from '../actions/types'

const INITIAL_STATE = {
  access_token: '',
  expires_in: 0,
  refresh_token: '',
  restricted_to: [],
  token_type: '',
  loading: false,
  error: '',
  loggedIn: false,
  expires_at: 0,
  vendor: 'box'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, loading: true }
    case USER_LOGIN_FINALIZE:
      return { ...INITIAL_STATE, access_token: action.token }
    case USER_LOGIN_SUCCESS:
      return {
        ...INITIAL_STATE,
        loggedIn: true,
        ...action.response,
        expires_at: new Date().getTime() + action.response.expires_in
      }
    case USER_LOGIN_SUCCESS_REFRESH:
      return { ...state, ...action.payload }
    case USER_LOGIN_FAIL:
      return { ...INITIAL_STATE, error: action.error }
    case USER_LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}
