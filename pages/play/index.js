import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../../configs/store'

import SecuredLayout from '../../layouts/secured'

const PlayPage = () =>
  <SecuredLayout>
    <h1>Play</h1>
  </SecuredLayout>

export default withRedux(initStore, null, null)(PlayPage)
