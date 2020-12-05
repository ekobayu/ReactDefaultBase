import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history, asyncReducers) => {
  return combineReducers({
    router: connectRouter(history),
    ...asyncReducers
  })
}

export default createRootReducer
