import { ref } from '@vue/composition-api'

const useVariables = () => {
  const articles = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialFeaturesArticle = {
    loading: false,
    data: [],
  }

  const featuresArticle = ref({ ...initialFeaturesArticle })

  const resetFeaturesArticle = () => {
    featuresArticle.value = { ...initialFeaturesArticle }
  }

  const initialArticle = {
    _id: 0,
    nombre: '',
    idGrupoUnidad: 15,
    idUnidadInventario: 11,
    idUnidadVenta: 11,
    idTipoProducto: 0,
    sku: '',
    precioCompra: 0,
    precioVenta: 0,
    precioMinimoVenta: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    flgStock: 1,
    flgServicio: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const article = ref({ ...initialArticle })

  const resetArticle = () => {
    article.value = { ...initialArticle }
  }

  const selectedStockOrService = ref('stock')

  const resetSelectedStockOrService = () => {
    selectedStockOrService.value = 'stock'
  }

  const initialFeatureArticle = {
    _id: 0,
    idDtlCaracteristica: 0,
    idArticulo: 0,
    idCaracteristica: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const featureArticle = ref({ ...initialFeatureArticle })

  const resetFeatureArticle = () => {
    featureArticle.value = { ...initialFeatureArticle }
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

  const optionsColumnsFilter = [
    {
      title: 'Id',
      field: 'a._id',
    },
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
    selectedStockOrService,
    resetSelectedStockOrService,
    featuresArticle,
    resetFeaturesArticle,
    featureArticle,
    resetFeatureArticle,
    initialStateCombo,
    combos,
    resetCombos,
    serverParams,
    optionsColumnsFilter,
  }
}

export default useVariables
