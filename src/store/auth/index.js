import axiosIns from '@/libs/axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: (() => localStorage.getItem('_secret') || { usuario: null })(),
  },
  mutations: {
    handleLogin(state, payload) {
      localStorage.setItem('_secret', JSON.stringify(payload))
      axiosIns.defaults.headers.common.Authorization = `Bearer ${payload.token}`
      state.user = payload
    },
    handleExpiredToken(state) {
      localStorage.removeItem('_secret')
      state.user = {
        usuario: null,
      }
      router.push('/login')
    },
    handleLogout(state) {
      localStorage.removeItem('_secret')
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
