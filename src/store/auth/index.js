// Importar la instancia de axios configurada
import axiosIns from '@/libs/axios'
// Importar la instancia de routes
import router from '@/router'

// Exportar nuesto modulo auth
export default {
  // Propiedad para definir si va ser un modulo externo
  namespaced: true,
  // Estados
  state: {
    // User - almacenara una funcion autoejecutable, por lo cual al momento de leer el archivo se ejecutara la funcion que se muestra a continuacion
    user: (() => {
      // Verificar si en el localstorage se encuentran las credenciales
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)) {
        // De cumplir la condicion, retornara lo que encontro, y se asignara al estado user
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)))
      }
      // De no encontrar las credenciales, retornara un objeto, y se asignara al estado user
      return { usuario: null }
    })(),
  },
  // Mutaciones - Por lo general son para Alterar directamente al estado
  // Recibe dos parametros
  /*
    1.- State (Acceso al estado)
    2.- Payload (Parametro que se envia para algun uso)
  */
  mutations: {
    // Manejo del Login
    handleLogin(state, payload) {
      // Agrega un Elemento al localstorage (credenciales)
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_SECURITY, btoa(JSON.stringify(payload)))
      // Agregar la autorizacion en la instancia de axios para poder realizar peticiones
      axiosIns.defaults.headers.common.Authorization = `Bearer ${payload.token}`
      // Asigna el nuevo valor del estado user
      state.user = payload
    },
    // Manejo de la expiracion del token
    handleExpiredToken(state) {
      // Remueve un elemento del localstorage (credenciales)
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_SECURITY)
      // Asigna el nuevo valor del estado user
      state.user = {
        usuario: null,
      }
      // Recargar la página (Para que me rediriga al login)
      window.location.reload()
    },
    // Manejo de Cerrar Sesión
    handleLogout(state) {
      // Remueve un elemento del localstorage (credenciales)
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_SECURITY)
      // Asigna el nuevo valor del estado user
      state.user = {
        usuario: null,
      }
      // Redirigir al login
      router.push('/login')
    },
  },
  // Acciones - A diferencia de las mutaciones, aqui se pueden realizar peticiones asincronas y luego cometer una mutación
  // Recibe dos parametros
  /*
    1.- store (Acceso al store)
    2.- Payload (Parametro que se envia para algun uso)
  */
  actions: {
    // Manejo del login
    handleLogin({ commit }, payload) {
      // Cometer la mutacion handleLogin y enviarle un parametro
      commit('handleLogin', payload)
    },
    // Manejo de la expiracion del token
    handleExpiredToken({ commit }) {
      // Cometer la mutacion handleExpiredToken
      commit('handleExpiredToken')
    },
    // Manejo de Cerrar Sesión
    handleLogout({ commit }) {
      // Cometer la mutacion handleLogout
      commit('handleLogout')
    },
  },
}
