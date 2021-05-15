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
  {
    path: '/opciones',
    name: 'options',
    component: () => import('@/views/dashboard/security/options/Option.vue'),
    meta: {
      auth: true,
      pageTitle: 'Opciones',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Opciones',
          active: true,
        },
      ],
    },
  },
  {
    path: '/opciones-menu',
    name: 'optionsMenu',
    component: () => import('@/views/dashboard/security/optionsMenu/OptionMenu.vue'),
    meta: {
      auth: true,
      pageTitle: 'Opciones del Menú',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Opciones del Menú',
          active: true,
        },
      ],
    },
  },
  {
    path: '/modulos',
    name: 'modules',
    component: () => import('@/views/dashboard/security/modules/Module.vue'),
    meta: {
      auth: true,
      pageTitle: 'Modulos',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Modulos',
          active: true,
        },
      ],
    },
  },
]

export default securityRoutes
