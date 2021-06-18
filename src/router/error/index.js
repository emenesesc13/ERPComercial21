// Creando un arreglo de rutas para los errores
const errorRoutes = [
  // Ruta de error-404
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
  // path que no coincida con una ruta registrada, redireccionara a la ruta de error-404
  {
    path: '*',
    redirect: 'error-404',
  },
]

// Exportar el arreglo de rutas para los errores
export default errorRoutes
