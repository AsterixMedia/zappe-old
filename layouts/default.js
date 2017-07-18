import React from 'react'
import PropTypes from 'prop-types'

import App from './app'

const DefaultLayout = ({children}) =>
  <App>
    <div>
      <h1>Minerva</h1>
      {children}
    </div>
  </App>

DefaultLayout.propTypes = {
  children: PropTypes.node
}

export default DefaultLayout
