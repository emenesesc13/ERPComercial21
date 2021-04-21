const storageRoutes = [
  {
    path: '/articulos',
    name: 'articles',
    component: () => import('@/views/dashboard/storage/articles/Articles.vue'),
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
    component: () => import('@/views/dashboard/storage/features/Feature.vue'),
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
    component: () => import('@/views/dashboard/storage/featuresDetail/FeatureDetail.vue'),
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
    component: () => import('@/views/dashboard/storage/productTypes/ProductType.vue'),
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
    path: '/unidad-medida',
    name: 'unitMeasure',
    component: () => import('@/views/dashboard/storage/unitMeasure/UnitMeasure.vue'),
    meta: {
      auth: true,
      pageTitle: 'Unidad Medida',
      breadcrumb: [
        {
          text: 'Unidad Medida',
          active: true,
        },
      ],
    },
  },
  {
    path: '/grupo-unidad',
    name: 'unitGroup',
    component: () => import('@/views/dashboard/storage/unitGroup/UnitGroup.vue'),
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

export default storageRoutes
