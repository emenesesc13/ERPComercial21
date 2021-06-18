// Creando un arreglo de rutas para el modulo Mantenimiento
const partnerRoutes = [
  // Ruta partner (Socios)
  {
    path: '/socios',
    name: 'partner',
    component: () => import('@/views/dashboard/partner/partner/Partner.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
      pageTitle: 'Socios',
      breadcrumb: [
        {
          text: 'Mantenimiento',
          active: true,
        },
        {
          text: 'Socios',
          active: true,
        },
      ],
    },
  },
  // Ruta businessUnit (Unidad de negocio)
  {
    path: '/unidad-negocio',
    name: 'businessUnit',
    component: () => import('@/views/dashboard/partner/businessUnit/BusinessUnit.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
      pageTitle: 'Unidad Negocio',
      breadcrumb: [
        {
          text: 'Mantenimiento',
          active: true,
        },
        {
          text: 'Unidad Negocio',
          active: true,
        },
      ],
    },
  },
]

// Exportar el arreglo de rutas para el modulo Mantenimiento
export default partnerRoutes
