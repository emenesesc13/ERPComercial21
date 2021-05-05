const securityRoutes = [
  {
    path: '/usuarios',
    name: 'users',
    component: () => import('@/views/dashboard/security/users/User.vue'),
    meta: {
      auth: true,
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Usuarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/dashboard/security/roles/Role.vue'),
    meta: {
      auth: true,
      pageTitle: 'Roles',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Roles',
          active: true,
        },
      ],
    },
  },
]

export default securityRoutes
