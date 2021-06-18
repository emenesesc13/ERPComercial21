// Creando un arreglo de rutas para el modulo storage (almacen)
const storageRoutes = [
  // Ruta storageType (Tipo Almacen)
  {
    path: '/tipo-almacen',
    name: 'storageType',
    component: () => import('@/views/dashboard/storage/storageTypes/StorageType.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
      pageTitle: 'Tipo Almacén',
      breadcrumb: [
        {
          text: 'Almacén',
          active: true,
        },
        {
          text: 'Tipo Almacén',
          active: true,
        },
      ],
    },
  },
  // Ruta storage (Almacén)
  {
    path: '/almacen',
    name: 'storage',
    component: () => import('@/views/dashboard/storage/storage/Storage.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
      pageTitle: 'Almacén',
      breadcrumb: [
        {
          text: 'Almacén',
          active: true,
        },
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
  // Ruta predio
  {
    path: '/predio',
    name: 'predio',
    component: () => import('@/views/dashboard/storage/predio/Predio.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
      pageTitle: 'Predio',
      breadcrumb: [
        {
          text: 'Almacén',
          active: true,
        },
        {
          text: 'Predio',
          active: true,
        },
      ],
    },
  },
]

// Exportar el arreglo de rutas para el modulo storage (Almacen)
export default storageRoutes
