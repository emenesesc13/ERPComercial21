// Importar vue y axios
import Vue from 'vue'
import axios from 'axios'

// Crear la configuración para las peticiones a la apiPeru (para consultar dni o ruc)
const apiPeru = axios.create({
  baseURL: process.env.VUE_APP_APIURL_APIPERU,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_APIURL_APIPERU_TOKEN}`,
  },
})

// Agregar una propiedad al prototipo de vue para poder realizar peticiones usando la propiedad this.$apiPeru
Vue.prototype.$apiPeru = apiPeru

// Exportar la configuración
export default apiPeru
