import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Button } from 'rebass'

import DefaultLayout from '../../layouts/default'
import { initStore } from '../../configs/store'
import { userLogin } from '../../actions'

const mapDispatchToProps = dispatch => ({
  loginUser: bindActionCreators(userLogin, dispatch)
})

const LoginPage = ({loginUser}) =>
  <DefaultLayout>
    <h1>Login</h1>
    <Button onClick={loginUser}>Login w/ Box</Button>
  </DefaultLayout>

export default withRedux(
  initStore,
  null,
  mapDispatchToProps
)(LoginPage)
