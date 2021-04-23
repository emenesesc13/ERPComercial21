import productsRoutes from './products'
import storageRoutes from './storage'

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
]

export default dashboardRoutes
