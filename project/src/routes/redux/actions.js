import types from './types'
import axios from 'axios'

export const fetchRawData = (person) => {
  return (dispatch) => {
    return axios.get('http://www.omdbapi.com?apikey=faf7e5bb&s&s=Batman')
    .then(res => {
      dispatch(setByKey(
        'rawData',
        res.data.Search
      ))
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const setByKey = (key, value) => (dispatch) => {
  dispatch({
    type: types.SET_BY_KEY,
    key,
    value
  })
}
