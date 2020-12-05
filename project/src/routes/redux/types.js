import MODULE_ID from './config'

const _ = (action) => MODULE_ID + '_' + action
// eslint-disable-next-line 
export default {
  RESET: _('RESET'),
  ADD_BUSY_STACK: _('ADD_BUSY_STACK'),
  REMOVE_BUSY_STACK: _('REMOVE_BUSY_STACK'),
  SET_ERROR_PAGE: _('SET_ERROR_PAGE'),
  FETCH_DATA: _('FETCH_DATA'),
  SEARCH_MOVIE: _('SEARCH_MOVIE'),
  SET_BY_KEY: _('SET_BY_KEY')
}
