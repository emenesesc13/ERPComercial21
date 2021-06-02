const partnerRoutes = [
  {
    path: '/socios',
    name: 'partner',
    component: () => import('@/views/dashboard/partner/partner/Partner.vue'),
    meta: {
      auth: true,
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
  {
    path: '/unidad-negocio',
    name: 'businessUnit',
    component: () => import('@/views/dashboard/partner/businessUnit/BusinessUnit.vue'),
    meta: {
      auth: true,
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

export default partnerRoutes
