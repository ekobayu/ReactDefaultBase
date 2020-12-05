import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import history from './history'
import thunk from 'redux-thunk'
// import { logger } from 'redux-logger'
import createRootReducer from './reducers'

export const configureStore = (initialState) => {
  const enhancers = []
  const middleware = [
    thunk,
    routerMiddleware(history)
  ]

  if (process.env.NODE_ENV !== 'production') {
    // middleware.push(logger)
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  )

  store.asyncReducers = {}

  return store
}

export const injectAsyncReducer = (store, name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createRootReducer(history, store.asyncReducers))
}

export default configureStore()
