import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

import { initStore } from '../configs/store'
import { toggleTest } from '../actions'
import DefaultLayout from '../layouts/default'

const IndexPage = props =>
  <DefaultLayout>
    <h1>Welcome to Zappe</h1>
    <h3>
      works
      {': '}
      {props.test.works ? <span>True</span> : <span>False</span>}
    </h3>
    <Button onClick={props.testToggle}>Test</Button>
  </DefaultLayout>

IndexPage.propTypes = {
  test: PropTypes.object,
  testToggle: PropTypes.func
}

const mapStateToProps = state => ({
  test: state.test
})

const mapDispatchToProps = dispatch => ({
  testToggle: bindActionCreators(toggleTest, dispatch)
})

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)
