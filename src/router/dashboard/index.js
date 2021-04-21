import productsRoutes from './products'

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
]

export default dashboardRoutes
