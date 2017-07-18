import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../store'
import { toggleTest } from '../actions'

const IndexPage = props =>
  <div>
    <h1>Welcome to Zappe</h1>
    <h3>
      works
      {': '}
      {props.test.works ? <span>True</span> : <span>False</span>}
    </h3>
    <button onClick={props.testToggle}>Test</button>
  </div>

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
