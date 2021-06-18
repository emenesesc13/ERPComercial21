// Importar vue y vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
// Importar las rutas de auth, error, dashboard
import authRoutes from './auth'
import errorRoutes from './error'
import dashboardRoutes from './dashboard'

// Instalar plugin VueRouter
Vue.use(VueRouter)

// Crear mi constante que almacenara todas las rutas del sustema
const routes = [
  // Propagar los valores (Objetos del arreglo de rutas para que formen parte de este arreglo
  ...authRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
]

// Crear la instancia de rutas
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  // Asignar la constante routes a la propiedad routes
  routes,
})

// Middleware - Función que se ejecutara antes de ingresar a una ruta
router.beforeEach((to, from, next) => {
  // Obtener credenciales del localstorage
  const loggedIn = localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)
  // Verificar si la ruta que deseo ingresar tiene el campo auth en la propiedad meta y no cuento con las credenciales
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    // Redirigir a la ruta nombreada login
    next({ name: 'login' })
    return
  }
  // De no complir la condicion anterior, permitira acceder a la ruta
  next()
})

// Exportar la instancia de router
export default router
