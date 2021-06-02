export default [
  {
    title: 'Inicio',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Productos',
    icon: 'BoxIcon',
    children: [
      {
        title: 'Articulos',
        route: 'articles',
      },
      {
        title: 'Características',
        route: 'features',
      },
      {
        title: 'Detalle Característica',
        route: 'featureDetail',
      },
      {
        title: 'Tipo Producto',
        route: 'productType',
      },
      {
        title: 'Unidad Medida',
        route: 'unitMeasure',
      },
      {
        title: 'Grupo Unidad',
        route: 'unitGroup',
      },
    ],
  },
  {
    title: 'Almacen',
    icon: 'ClipboardIcon',
    children: [
      {
        title: 'Tipo Almacen',
        route: 'storageType',
      },
      {
        title: 'Almacén',
        route: 'storage',
      },
      {
        title: 'Predio',
        route: 'predio',
      },
    ],
  },
  {
    title: 'Mantenimiento',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Socios',
        route: 'partner',
      },
      {
        title: 'Unidad Negocio',
        route: 'businessUnit',
      },
    ],
  },
  {
    title: 'Seguridad',
    icon: 'LockIcon',
    children: [
      {
        title: 'Colaboradores',
        route: 'collaborators',
      },
      {
        title: 'Usuarios',
        route: 'users',
      },
      {
        title: 'Roles',
        route: 'roles',
      },
      {
        title: 'Modulos',
        route: 'modules',
      },
      {
        title: 'Menú',
        route: 'menus',
      },
      {
        title: 'Opciones',
        route: 'options',
      },
      {
        title: 'Opciones Menú',
        route: 'menuOptions',
      },
      {
        title: 'Accesos',
        route: { path: '/accesos' },
      },
    ],
  },
]
