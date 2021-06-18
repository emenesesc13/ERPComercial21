// Creando un arreglo de rutas para la autenticación
const authRoutes = [
  // Ruta de login
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
    },
    beforeEnter: (to, from, next) => {
      // Verificar si en el localstorage almacenamos las credenciales
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY)) {
        const lastPath = JSON.parse(localStorage.getItem('lastPath'))
        // Verificar si tenemos un path almacenado en el localstorage
        // Si lo encuentra lo redirigira a ese path
        if (lastPath) next(lastPath)
        // Si no lo encuentra lo redirigira al path inicial /
        else next('/')
      }
      // De no pasar la condicion anterior permitira el acceso al login
      next()
    },
  },
]

// Exportar el arreglo de rutas para la autenticacion
export default authRoutes
