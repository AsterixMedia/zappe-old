import { TOGGLE_TEST } from '../actions/types'

const INIITAL_STATE = {
  works: false
}

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_TEST:
      return { ...state, works: !state.works }
    default:
      return state
  }
}
