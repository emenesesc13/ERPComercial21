import productsRoutes from './products'
import storageRoutes from './storage'
import partnerRoutes from './partner'
import securityRoutes from './security'

const dashboardRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/dashboard/Home.vue'),
    meta: {
      auth: true,
      pageTitle: 'Inicio',
      breadcrumb: [
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
  ...productsRoutes,
  ...storageRoutes,
  ...partnerRoutes,
  ...securityRoutes,
]

export default dashboardRoutes
