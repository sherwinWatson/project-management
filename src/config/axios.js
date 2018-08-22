import axios from 'axios'

export const axiosInit = (token) => {
  // axios.defaults.baseURL = 'http://35.197.143.46/api/'
  axios.defaults.baseURL = 'http://192.168.43.242:8000/api/'
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
