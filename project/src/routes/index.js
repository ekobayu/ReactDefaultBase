import React from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import store, { injectAsyncReducer } from '../routes/reduxStore/store'
import { MODULE_ID, reducers } from './redux'
import history from '../routes/reduxStore/history'

import Home from './Home'
import Detail from './Detail'

const Routes = () => {
  // const url = window.location.pathname
  // const id = url.substring(url.lastIndexOf('/') + 1)

  return <>
    <Container fluid className="app-project full-height">
      <Router history={history}>
        <Switch>
          <Route path={`/app/project/home/`} component={Home} />
          <Route path={`/app/project/detail/`} component={Detail} />
          <Route component={() => <Redirect to={'/app/project/home'} />} />
        </Switch>
      </Router>
    </Container>
  </>
}

const createRoutes = () => {
  injectAsyncReducer(store, MODULE_ID, reducers)

  const mapStateToProps = () => ({})

  const mapDispatchToProps = {}

  return connect(mapStateToProps, mapDispatchToProps)(Routes)
}

export default createRoutes
