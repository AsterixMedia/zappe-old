import { combineReducers } from 'redux'
import test from './TestReducer'
import auth from './AuthReducer'

export default combineReducers({
  test,
  auth
})
