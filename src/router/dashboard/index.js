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
  {
    path: '/articulos',
    name: 'articles',
    component: () => import('@/views/dashboard/articles/Articles.vue'),
    meta: {
      auth: true,
      pageTitle: 'Articulos',
      breadcrumb: [
        {
          text: 'Articulos',
          active: true,
        },
      ],
    },
  },
]

export default dashboardRoutes
