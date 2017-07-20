import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== `production`) {
  const { logger } = require(`redux-logger`)

  middlewares.push(logger)
}

const enhancers = compose(
  applyMiddleware(...middlewares)
)

export const initStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(enhancers)
  )
}
