import { PREFERRED_STORAGE } from '../../config'

const _cookiesStorage = {
  setItem: (name, value, days = 1, hour = 1) => {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * hour * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + value + expires + '; path=/'
  },

  getItem: (name) => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  },

  removeItem: (name) => {
    document.cookie = name + '=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}

let selectedStorage = _cookiesStorage
if (PREFERRED_STORAGE && PREFERRED_STORAGE !== 'cookies') {
  // eslint-disable-next-line no-undef
  selectedStorage = (typeof Storage !== 'undefined') ? localStorage : _cookiesStorage
}

export default selectedStorage
