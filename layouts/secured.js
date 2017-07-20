import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import DefaultLayout from './default'
import { userLoginStatusCheck } from '../actions'

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
})

const mapActionsToProps = {
  userLoginStatusCheck
}

@connect(mapStateToProps, mapActionsToProps)
class SecuredLayout extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    children: PropTypes.node,
    userLoginStatusCheck: PropTypes.func
  }

  componentDidMount = () => {
    if (!this.props.loggedIn) {
      this.props.userLoginStatusCheck()
    }
  }

  render = () =>
    <DefaultLayout>
      {this.props.children}
    </DefaultLayout>
}

export default SecuredLayout
