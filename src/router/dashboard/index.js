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
    path: '/detalle-caracteristica',
    name: 'featureDetail',
    component: () => import('@/views/dashboard/featuresDetail/FeatureDetail.vue'),
    meta: {
      auth: true,
      pageTitle: 'Detalle Característica',
      breadcrumb: [
        {
          text: 'Detalle Característica',
          active: true,
        },
      ],
    },
  },
  {
    path: '/tipo-producto',
    name: 'productType',
    component: () => import('@/views/dashboard/productTypes/ProductType.vue'),
    meta: {
      auth: true,
      pageTitle: 'Tipo Producto',
      breadcrumb: [
        {
          text: 'Tipo Producto',
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
