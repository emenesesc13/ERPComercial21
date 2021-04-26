const storageRoutes = [
  {
    path: '/tipo-almacen',
    name: 'storageType',
    component: () => import('@/views/dashboard/storage/storageTypes/StorageType.vue'),
    meta: {
      auth: true,
      pageTitle: 'Tipo Almacén',
      breadcrumb: [
        {
          text: 'Tipo Almacén',
          active: true,
        },
      ],
    },
  },
  {
    path: '/almacen',
    name: 'storage',
    component: () => import('@/views/dashboard/storage/storage/Storage.vue'),
    meta: {
      auth: true,
      pageTitle: 'Almacén',
      breadcrumb: [
        {
          text: 'Almacén',
        }
      ],
     },
   },
   {
    path: '/predio',
    name: 'predio',
    component: () => import('@/views/dashboard/storage/predio/Predio.vue'),
    meta: {
      auth: true,
      pageTitle: 'Predio',
      breadcrumb: [
        {
          text: 'Predio',
          active: true,
        },
      ],
    },
  },
]

export default storageRoutes
