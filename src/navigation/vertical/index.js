export default [
  {
    title: 'Inicio',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Almacén',
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
]
