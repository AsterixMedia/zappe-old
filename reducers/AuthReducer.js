import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FINALIZE,
  USER_LOGIN_FAIL
} from '../actions/types'

const INIITAL_STATE = {
  authorization: {},
  accessToken: '',
  loading: false,
  error: ''
}

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, loading: true }
    case USER_LOGIN_FINALIZE:
      return { ...INIITAL_STATE, accessToken: action.token }
    case USER_LOGIN_SUCCESS:
      return { ...INIITAL_STATE, authorization: action.response }
    case USER_LOGIN_FAIL:
      return { ...INIITAL_STATE, error: action.error }
    default:
      return state
  }
}
