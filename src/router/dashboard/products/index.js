const productsRoutes = [
  {
    path: '/articulos',
    name: 'articles',
    component: () => import('@/views/dashboard/products/articles/Articles.vue'),
    meta: {
      auth: true,
      pageTitle: 'Articulos',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
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
    component: () => import('@/views/dashboard/products/features/Feature.vue'),
    meta: {
      auth: true,
      pageTitle: 'Características',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
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
    component: () => import('@/views/dashboard/products/featuresDetail/FeatureDetail.vue'),
    meta: {
      auth: true,
      pageTitle: 'Detalle Característica',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
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
    component: () => import('@/views/dashboard/products/productTypes/ProductType.vue'),
    meta: {
      auth: true,
      pageTitle: 'Tipo Producto',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
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
    component: () => import('@/views/dashboard/products/unitMeasure/UnitMeasure.vue'),
    meta: {
      auth: true,
      pageTitle: 'Unidad Medida',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
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
    component: () => import('@/views/dashboard/products/unitGroup/UnitGroup.vue'),
    meta: {
      auth: true,
      pageTitle: 'Grupo Unidad',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
        {
          text: 'Grupo Unidad',
          active: true,
        },
      ],
    },
  },
]

export default productsRoutes
