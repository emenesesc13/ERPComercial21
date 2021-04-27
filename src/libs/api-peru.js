import Vue from 'vue'

// axios
import axios from 'axios'

const apiPeru = axios.create({
  baseURL: process.env.VUE_APP_APIURL_APIPERU,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_APIURL_APIPERU_TOKEN}`,
  },
})

Vue.prototype.$apiPeru = apiPeru

export default apiPeru
