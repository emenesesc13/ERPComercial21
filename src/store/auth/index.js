import axiosIns from '@/libs/axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: (() => {
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)) {
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)))
      }
      return { usuario: null }
    })(),
  },
  mutations: {
    handleLogin(state, payload) {
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_SECURITY, btoa(JSON.stringify(payload)))
      axiosIns.defaults.headers.common.Authorization = `Bearer ${payload.token}`
      state.user = payload
    },
    handleExpiredToken(state) {
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_SECURITY)
      state.user = {
        usuario: null,
      }
      window.location.reload()
    },
    handleLogout(state) {
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_SECURITY)
      state.user = {
        usuario: null,
      }
      router.push('/login')
    },
  },
  actions: {
    handleLogin({ commit }, payload) {
      commit('handleLogin', payload)
    },
    handleExpiredToken({ commit }) {
      commit('handleExpiredToken')
    },
    handleLogout({ commit }) {
      commit('handleLogout')
    },
  },
}
