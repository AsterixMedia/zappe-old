import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FINALIZE,
  USER_LOGIN_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  access_token: '',
  expires_in: 0,
  refresh_token: '',
  restricted_to: [],
  token_type: '',
  loading: false,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, loading: true }
    case USER_LOGIN_FINALIZE:
      return { ...INITIAL_STATE, access_token: action.token }
    case USER_LOGIN_SUCCESS:
      return { ...INITIAL_STATE, ...action.response }
    case USER_LOGIN_FAIL:
      return { ...INITIAL_STATE, error: action.error }
    default:
      return state
  }
}
