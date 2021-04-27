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
          text: 'Socios',
          active: true,
        },
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
]

export default partnerRoutes
