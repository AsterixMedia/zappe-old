import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Provider, Button } from 'rebass'
import Router from 'next/router'

import { userLogout } from '../actions'

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
})

const mapActionsToProps = {
  userLogout
}

const DefaultLayout = ({children, loggedIn, userLogout}) =>
  <Provider>
    <div>
      <h1>Zappe</h1>
      {loggedIn
        ? <Button onClick={userLogout} children='Logout' />
        : <Button onClick={() => Router.push('/')} />}
      {children}
    </div>
  </Provider>

DefaultLayout.propTypes = {
  children: PropTypes.node
}

export default connect(mapStateToProps, mapActionsToProps)(DefaultLayout)
