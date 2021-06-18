// Creando un arreglo de rutas para el modulo Seguridad
const securityRoutes = [
  // Ruta users (Usuarios)
  {
    path: '/usuarios',
    name: 'users',
    component: () => import('@/views/dashboard/security/users/User.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta roles (Roles)
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/dashboard/security/roles/Role.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta collaborators (Colaboradores)
  {
    path: '/colaboradores',
    name: 'collaborators',
    component: () => import('@/views/dashboard/security/collaborator/Collaborator.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta menus (Menus)
  {
    path: '/menus',
    name: 'menus',
    component: () => import('@/views/dashboard/security/menu/Menu.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta options (Opciones)
  {
    path: '/opciones',
    name: 'options',
    component: () => import('@/views/dashboard/security/options/Option.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta menuOptions (Opciones del Menu)
  {
    path: '/opciones-menu',
    name: 'menuOptions',
    component: () => import('@/views/dashboard/security/menuOptions/MenuOption.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta modules (Módulos
  {
    path: '/modulos',
    name: 'modules',
    component: () => import('@/views/dashboard/security/modules/Module.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
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
  // Ruta access (Accesos
  {
    path: '/accesos',
    name: 'access',
    component: () => import('@/views/dashboard/security/access/Access.vue'),
    meta: {
      auth: true, // El acceso a esta ruta necesita autorización
      pageTitle: 'Accesos',
      breadcrumb: [
        {
          text: 'Seguridad',
          active: true,
        },
        {
          text: 'Accesos',
          active: true,
        },
      ],
    },
  },
]

// Exportar el arreglo de rutas para el modulo Seguridad
export default securityRoutes
