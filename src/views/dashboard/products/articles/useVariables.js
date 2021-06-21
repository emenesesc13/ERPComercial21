// Importando funcion para crear variables reactivas
import { ref } from '@vue/composition-api'

// Función que retornara mis variables reactivas o funciones necesarias para el mantenimiento
const useVariables = () => {
  // Variable reactiva para el listado de la tabla articulos
  const articles = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  // Variable inicializadora para la tabla detalle caracteristicas
  const initialFeaturesArticle = {
    loading: false,
    data: [],
  }

  // Variable reactiva de la tabla detalle caracteristicas
  const featuresArticle = ref({ ...initialFeaturesArticle })

  // Función para regresar al estado inicial la tabla detalle caracteristicas
  const resetFeaturesArticle = () => {
    featuresArticle.value = { ...initialFeaturesArticle }
  }

  // Variable inicializadora para la tabla detalle recetas
  const initialRecetasArticle = {
    loading: false,
    data: [],
  }

  // Variable reactiva de la tabla detalle recetas
  const recetasArticle = ref({ ...initialRecetasArticle })

  // Función para regresar al estado inicial la tabla detalle recetas
  const resetRecetasArticle = () => {
    recetasArticle.value = initialRecetasArticle
  }

  // Variable inicializadora para la gestion de articulos
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

  // Variable reactiva para la gestion de articulos
  const article = ref({ ...initialArticle })

  // Función para regresar al estado inicial la variable reactiva
  const resetArticle = () => {
    article.value = { ...initialArticle }
  }

  // Variable reactiva para seleccionar el tipo de articulo "STOCK(POR DEFECTO), SERVICIO, RECETAS"
  const selectedStockOrService = ref('stock')

  // Función para regresar al estado inicial del tipo de articulo
  const resetSelectedStockOrService = () => {
    selectedStockOrService.value = 'stock'
  }

  // Variable inicializadora para gestionar una caracteristica
  const initialFeatureArticle = {
    _id: 0,
    idDtlCaracteristica: 0,
    idArticulo: 0,
    idCaracteristica: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  // Variable reactiva para gestionar una caracteristica
  const featureArticle = ref({ ...initialFeatureArticle })

  // Función para regresar al estado inicial la varialble reactiva
  const resetFeatureArticle = () => {
    featureArticle.value = { ...initialFeatureArticle }
  }

  // Variable inicializadora para gestionar un item de receta
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

  // Variable reactiva para gestionar un item de receta
  const recetaArticle = ref({ ...initialRecetaArticle })

  // Función para regresar al estado inicial la variable reactiva
  const resetRecetaArticle = () => {
    recetaArticle.value = { ...initialRecetaArticle }
  }

  // Variable inicializadora para los combobox
  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  // Variable reactiva que almacenara un objeto con todos los datos de los combobox en este mantenimiento
  const combos = ref({
    productTypes: { ...initialStateCombo },
    unitGroup: { ...initialStateCombo },
    inventoryUnit: { ...initialStateCombo },
    unitSale: { ...initialStateCombo },
    features: { ...initialStateCombo },
    valuesByFeature: { ...initialStateCombo },
    unitMeasure: { ...initialStateCombo },
    serviceType: { ...initialStateCombo },
  })

  // Función para regresar al estado inicial el combobox que desee, para ello esta función recibe como parametro un arreglo de string, en el cual debera pasar las claves del o de los combos
  const resetCombos = (nameCombos = []) => {
    nameCombos.forEach(name => {
      combos.value[name] = { ...initialStateCombo }
    })
  }

  // Variable reactiva para controlar en que tab se encuentra
  const tabIndex = ref(0)
  const limitTab = ref(0)

  // Variable para almacenar las columnas por la cual se filtraran los registros
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

  // Variable reactiva el cual controlara los filtros y paginación
  const serverParams = ref({
    columnFilters: {
      field: '',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  // Retornar variables reactivas y funciones a utilizar en el mantenimiento
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
