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
  ...storageRoutes,
]

export default dashboardRoutes
