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
  {
    path: '/caracteristicas',
    name: 'features',
    component: () => import('@/views/dashboard/features/Feature.vue'),
    meta: {
      auth: true,
      pageTitle: 'Características',
      breadcrumb: [
        {
          text: 'Características',
          active: true,
        },
      ],
    },
  },
  {
    path: '/grupo-unidad',
    name: 'unitGroup',
    component: () => import('@/views/dashboard/unitGroup/UnitGroup.vue'),
    meta: {
      auth: true,
      pageTitle: 'Grupo Unidad',
      breadcrumb: [
        {
          text: 'Grupo Unidad',
          active: true,
        },
      ],
    },
  },
]

export default dashboardRoutes
