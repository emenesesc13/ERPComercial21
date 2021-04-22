import { ref } from '@vue/composition-api'

const useVariables = () => {
  const articles = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialArticle = {
    _id: 85,
    nombre: '',
    idGrupoUnidad: 15,
    idUnidadInventario: 11,
    idUnidadVenta: 11,
    idTipoProducto: 0,
    sku: '',
    precioCompra: null,
    precioVenta: null,
    precioMinimoVenta: null,
    stockMinimo: null,
    stockMaximo: null,
    flgStock: false,
    flgServicio: false,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const initialArticleFeature = {
    _id: 0,
    nombre: '',
    idCaracteristica: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  
  const article = ref({ ...initialArticle })
  
  const resetArticle = () => {
    article.value = { ...initialArticle }
  }

  const articleFeature = ref({ ...initialArticleFeature })
  
  const resetArticleFeature = () => {
    articleFeature.value = { ...initialArticleFeature }
  }
  
  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }
  
  const combos = ref({
    productTypes: { ...initialStateCombo },
    unitGroup: { ...initialStateCombo },
    inventoryUnit: { ...initialStateCombo },
    unitSale: { ...initialStateCombo },
    features: { ...initialStateCombo },
    valuesByFeature: { ...initialStateCombo },
  })

  const resetCombos = (nameCombos = []) => {
    nameCombos.forEach(name => {
      combos.value[name] = { ...initialStateCombo }
    })
  }
  
  const featureSelected = ref(null)
  const valueSelected = ref(null)

  const optionsColumnsFilter = [
    {
      title: 'Nombre',
      field: 'a.nombre',
    },
    {
      title: 'Tipo de Producto',
      field: 'a.nombreTipoProducto',
    },
    {
      title: 'Grupo Unidad',
      field: 'a.nombreGrupoUnidad',
    },
    {
      title: 'Unidad Venta',
      field: 'a.nombreUnidadVenta',
    },
  ]

  const serverParams = ref({
    columnFilters: {
      field: '',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  return {
    articles,
    article,
    resetArticle,
    articleFeature,
    resetArticleFeature,
    initialStateCombo,
    combos,
    resetCombos,
    featureSelected,
    valueSelected,
    serverParams,
    optionsColumnsFilter,
  }
}

export default useVariables

// const initialArticle = {
  //   id: 0,
  //   sku: '',
  //   productType: null,
  //   articleName: '',
  //   stock: false,
  //   service: false,
  //   unitGroup: null,
  //   inventoryUnit: null,
  //   unitSale: null,
  //   purchasePrice: null,
  //   salePrice: null,
  //   minimumSalePrice: null,
  //   minimumStock: null,
  //   maximumStock: null,
  //   features: [],
  // }
  
  // const initialArticle = {
    //   _id: 0,
    //   sku: '',
    //   nombre: '',
    //   idTipoProducto: null,
    //   idGrupoUnidad: null,
    //   idUnidadInventario: null,
//   idUnidadVenta: null,
//   precioCompra: null,
//   precioVenta: null,
//   precioMinimoVenta: null,
//   stockMinimo: null,
//   stockMaxim: null,
//   flgStock: false,
//   flgServicio: false,
//   accion: null,
//   idUsuario: null,
//   features: [],
// }
// const defaultSelectedUnitGroup = {
//   unitGroup: 15,
//   inventoryUnit: 11,
//   unitSale: 11,
// }