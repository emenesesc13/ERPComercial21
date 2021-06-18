// Importando vue y axios
import Vue from 'vue'
import axios from 'axios'

// Creando la configuracion para las peticiones a la API del sistema
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

// Agregar una propiedad al prototipo de vue para poder realizar peticiones usando la propiedad this.$http
Vue.prototype.$http = axiosIns

// Exportar la configuración
export default axiosIns
