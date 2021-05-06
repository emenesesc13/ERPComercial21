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
  {
    path: '/colaboradores',
    name: 'collaborators',
    component: () => import('@/views/dashboard/security/collaborator/Collaborator.vue'),
    meta: {
      auth: true,
      pageTitle: 'Colaboradores',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Colaboradores',
          active: true,
        },
      ],
    },
  },
  {
    path: '/menus',
    name: 'menus',
    component: () => import('@/views/dashboard/security/menu/Menu.vue'),
    meta: {
      auth: true,
      pageTitle: 'Menús',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Menús',
          active: true,
        },
      ],
    },
  },
]

export default securityRoutes
