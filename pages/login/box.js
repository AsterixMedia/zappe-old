import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'
import Router from 'next/router'

import DefaultLayout from '../../layouts/default'
import { userLoginFinalize } from '../../actions'
import { initStore } from '../../configs/store'

class BoxLoginLoadingPage extends React.Component {
  componentDidMount = () => {
    console.log(this.props.url)
    if (this.props.url.query.code) {
      console.log('finalizing login')
      this.props.userLoginFinalize(this.props.url.query.code)
    } else if (this.props.url.query.error) {
      Router.push('/login/error', { shallow: true })
    }
  }
  render = () =>
    <DefaultLayout>
      <h1>Success</h1>
    </DefaultLayout>
}

BoxLoginLoadingPage.propTypes = {
  url: PropTypes.object,
  userLoginFinalize: PropTypes.func,
  loading: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  userLoginFinalize: bindActionCreators(userLoginFinalize, dispatch)
})

const mapStateToProps = state => ({
  loading: state.auth.loading
})

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps
)(BoxLoginLoadingPage)
