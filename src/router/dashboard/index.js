// Importar rutas de los modulos
import productsRoutes from './products'
import storageRoutes from './storage'
import partnerRoutes from './partner'
import securityRoutes from './security'

const dashboardRoutes = [
  // Ruta home (Inicio)
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/dashboard/home/Analytics.vue'),
    meta: {
      auth: true,
    },
  },
  // Propagar los valores (Objetos del arreglo de rutas para que formen parte de este arreglo
  ...productsRoutes,
  ...storageRoutes,
  ...partnerRoutes,
  ...securityRoutes,
]

// Exportar el arreglo de rutas del dashboard
export default dashboardRoutes
