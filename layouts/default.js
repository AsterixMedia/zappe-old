import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'rebass'

const DefaultLayout = ({children}) =>
  <Provider>
    <div>
      <h1>Zappe</h1>
      {children}
    </div>
  </Provider>

DefaultLayout.propTypes = {
  children: PropTypes.node
}

export default DefaultLayout
