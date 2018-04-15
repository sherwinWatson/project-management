import axios from 'axios'

export const axiosInit = (token) => {
  axios.defaults.baseURL = 'https://kami-laravel-196413.appspot.com/api/'
  axios.defaults.timeout = 15000

  if (token) {
    if (axios.interceptors.request.handlers.length > 0) {
      axios.interceptors.request.handlers = []
    }

    axios.interceptors.request.use((config) => {
      // let isSecured = false
      //
      // const securedApi = [
      //   /(.*)\/profile(.*)/,
      //   /(.*)\/storyboards(.*)/,
      // ]
      //
      // for (let i = 0; i < securedApi.length; i++) {
      //   const url = securedApi[i]
      //   if (config.url.match(url) !== null) {
      //     isSecured = true
      //     break
      //   }
      // }

      // if (isSecured) {
      config.headers.Authorization = 'Bearer ' + token
      // config.headers['X-Requested-With'] = 'XMLHttpRequest'
      // }

      return config
    })
  }
}
