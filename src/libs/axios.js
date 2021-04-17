import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: process.env.VUE_APP_APIURL,
  baseURL: process.env.VUE_APP_APIURL_TEST,
  // timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    // 'X-Custom-Header': 'foobar',
  },
})

Vue.prototype.$http = axiosIns

export default axiosIns
