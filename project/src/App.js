import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import history from '../src/routes/reduxStore/history'
import createRoutes from './routes'

import './App.css'

function App () {
  const Routes = createRoutes()

  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  )
}

export default App