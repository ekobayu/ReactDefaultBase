import types from './types'

const initialState = {
  errorPage: null,
  busyStack: [],
  raw_stocbitMovies: []
}

const ACTION_HANDLERS = {
  [types.RESET]: (state, action) => {
    return JSON.parse(JSON.stringify(initialState))
  },

  [types.ADD_BUSY_STACK]: (state, action) => {
    return {
      ...state,
      busyStack: [
        ...state.busyStack,
        action.processId
      ]
    }
  },

  [types.REMOVE_BUSY_STACK]: (state, action) => {
    const busyStack = [...state.busyStack]
    const i = busyStack.indexOf(action.processId)
    if (i >= 0) {
      busyStack.splice(i, 1)
    }

    return {
      ...state,
      busyStack
    }
  },

  [types.SET_ERROR_PAGE]: (state, action) => {
    return {
      ...state,
      errorPage: action.errorPage
    }
  },

  [types.SET_BY_KEY]: (state, payload) => {
    return {
      ...state,
      [payload.key]: payload.value
    }
  }
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
