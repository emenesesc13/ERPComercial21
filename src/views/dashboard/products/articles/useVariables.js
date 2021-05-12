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

  const initialRecetasArticle = {
    loading: false,
    data: [],
  }

  const recetasArticle = ref({ ...initialRecetasArticle })

  const resetRecetasArticle = () => {
    recetasArticle.value = initialRecetasArticle
  }

  const initialArticle = {
    _id: 0,
    nombre: '',
    idGrupoUnidad: 15,
    nombreGrupoUnidad: '',
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
    flgReceta: 0,
    flgSelected: 'stock',
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

  const initialRecetaArticle = {
    _id: 0,
    idArticulo: 0,
    nombreArticulo: '',
    idReceta: 0,
    idGrupoUnidad: 0,
    nombreGrupoUnidad: '',
    idUnidad: 0,
    cantidad: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const recetaArticle = ref({ ...initialRecetaArticle })

  const resetRecetaArticle = () => {
    recetaArticle.value = { ...initialRecetaArticle }
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
    unitMeasure: { ...initialStateCombo },
  })

  const resetCombos = (nameCombos = []) => {
    nameCombos.forEach(name => {
      combos.value[name] = { ...initialStateCombo }
    })
  }

  const tabIndex = ref(0)
  const limitTab = ref(0)

  const optionsColumnsFilter = [
    {
      title: 'Id',
      field: 'a._id',
    },
    {
      title: 'SKU',
      field: 'sku',
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
    recetasArticle,
    resetRecetasArticle,
    recetaArticle,
    resetRecetaArticle,
    initialStateCombo,
    combos,
    resetCombos,
    tabIndex,
    limitTab,
    serverParams,
    optionsColumnsFilter,
  }
}

export default useVariables
