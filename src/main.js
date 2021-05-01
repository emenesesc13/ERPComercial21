import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueExcelXlsx from 'vue-excel-xlsx'

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

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  watch: {
    $route(to) {
      if (to.name !== 'login') localStorage.setItem('lastPath', JSON.stringify(to.fullPath))
    },
  },
  created() {
    localStorage.removeItem('_secret')
    const secret = localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY) ? JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY))) : null
    if (secret) this.$store.commit('auth/handleLogin', secret)
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
