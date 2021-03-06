import { createSelector } from 'reselect'
import MODULE_ID from './config'

const getState = (state) => state[MODULE_ID]

export const getRawKeyWord = (state) => getState(state).searchKeyWord
export const getCurrentPath = (state) => state.router.location.pathname
export const getBusyStack = (state) => getState(state).busyStack
export const getErrorPage = (state) => getState(state).errorPage
export const getActivePage = (state) => getState(state).activePage
export const getRawData = (state) => getState(state).rawData

export const getData = createSelector(
  getRawData,
  (data) => {
    return data
  }
)

export const getCurrentModule = createSelector(
  getCurrentPath,
  (path) => {
    const paths = path.split('/')
    return paths.length > 1 ? paths[1] : null
  }
)
