import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../src/routes/reduxStore/store'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './index.scss'

const target = document.querySelector('#root')

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  target
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
