// Creando un arreglo de rutas para el modulo Productos
const productsRoutes = [
  // Ruta articles (Artículos)
  {
    path: '/articulos',
    name: 'articles',
    component: () => import('@/views/dashboard/products/articles/Articles.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta features (Caracteristicas)
  {
    path: '/caracteristicas',
    name: 'features',
    component: () => import('@/views/dashboard/products/features/Feature.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta featureDetail (Detalle Caracteristica)
  {
    path: '/detalle-caracteristica',
    name: 'featureDetail',
    component: () => import('@/views/dashboard/products/featuresDetail/FeatureDetail.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta productType (Tipo de Producto)
  {
    path: '/tipo-producto',
    name: 'productType',
    component: () => import('@/views/dashboard/products/productTypes/ProductType.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta unitMeasure (Unidad de Medida)
  {
    path: '/unidad-medida',
    name: 'unitMeasure',
    component: () => import('@/views/dashboard/products/unitMeasure/UnitMeasure.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta unitGroup (Grupo de Unidad)
  {
    path: '/grupo-unidad',
    name: 'unitGroup',
    component: () => import('@/views/dashboard/products/unitGroup/UnitGroup.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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

// Exportar el arreglo de rutas para el modulo Productos
export default productsRoutes
