export default [
  {
    title: 'Inicio',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Articulos',
    route: 'articles',
    icon: 'FileIcon',
  },
  {
    title: 'Características',
    route: 'features',
    icon: 'SlidersIcon',
  },
  {
    title: 'Mantenimiento',
    route: 'articles',
    icon: 'FileIcon',
    children: [
      {
        title: 'Grupo Unidad',
        route: 'unitGroup',
      },
    ],
  },
]
