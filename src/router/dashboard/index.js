import productsRoutes from './products'
import storageRoutes from './storage'
import partnerRoutes from './partner'

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
]

export default dashboardRoutes
