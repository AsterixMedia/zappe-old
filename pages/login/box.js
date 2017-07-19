import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import DefaultLayout from '../../layouts/default'
import { userLoginFinalize } from '../../actions'
import { initStore } from '../../configs/store'

class BoxLoginLoadingPage extends React.Component {
  componentDidMount = () => {
    console.log(this.props.url)
    if (this.props.url.query.code) {
      this.props.userLoginFinalize(this.props.url.query.code)
    }
  }
  render = () =>
    <DefaultLayout>
      <h1>Success</h1>
    </DefaultLayout>
}

const mapDispatchToProps = dispatch => ({
  userLoginFinalize: bindActionCreators(userLoginFinalize, dispatch)
})

export default withRedux(
  initStore,
  null,
  mapDispatchToProps
)(BoxLoginLoadingPage)
