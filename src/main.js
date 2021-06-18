// Importar las dependencias
import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueExcelXlsx from 'vue-excel-xlsx'

// Importar validadores
import { extend, localize } from 'vee-validate'
import es from 'vee-validate/dist/locale/es.json'
import * as rules from 'vee-validate/dist/rules'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/vue-select'
import '@/libs/sweet-alerts'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// VueExcelXlsx
Vue.use(VueExcelXlsx)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

// Asignar la localizacion para los mensajes de validacion
localize('es', es)

// Registrar todas las validaciones permitidas
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
// Crear una nueva validacion para los combos requeridos
extend('requiredComboVueSelect', {
  validate(value) {
    if (value) return true
    return false
  },
  params: ['genero'],
  message(fieldName, placeholders) {
    return `Debe seleccionar ${placeholders.genero === 'm' ? 'un' : 'una'} ${fieldName}`
  },
})

// Crear instancia de Vue
new Vue({
  // Instalar el enrutador
  router,
  // Instalar el store (Contendra las variables globales)
  store,
  // Observadores
  watch: {
    // Observar cuando cambiar la ruta
    $route(to) {
      // Si la ruta no es login, agregar un elemento al localstorage para almacenar la ultima ruta visitada
      if (to.name !== 'login') localStorage.setItem('lastPath', JSON.stringify(to.fullPath))
    },
  },
  // Ciclo de vida Created (Se ejecutara la primera vez o cuando se recarga la página)
  created() {
    // Remover el elemento del localstorage llamado _secret
    localStorage.removeItem('_secret')
    // Obtener credenciales del localstorage
    const secret = localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY) ? JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY))) : null
    // Si existen las credenciales cometer la mutacion handleLogin del modulo auth del store, enviandole como parametro el valor del localstorage
    if (secret) this.$store.commit('auth/handleLogin', secret)
    // Agregar interceptores 401 para la expiracion del token
    this.$http.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          if (window.location.pathname !== '/login') {
            this.$store.dispatch('auth/handleExpiredToken')
          }
        }
        return Promise.reject(error)
      },
    )
  },
  render: h => h(App),
}).$mount('#app')
