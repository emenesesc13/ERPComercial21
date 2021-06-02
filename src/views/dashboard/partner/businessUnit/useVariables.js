// Importando la funcion ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Creando una funcion el cual cuando se ejecute retornara un objeto con todas las variables y funciones que se utilizaran en el mantenimiento
const useVariables = () => {
  // Variable reactiva para el listado de la tabla
  const businessUnits = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  // Variable inicializadora para gestionar una unidad de negocio
  const initialBusinessUnit = {
    _id: 0,
    nombre: null,
    razonSocial: null,
    ruc: null,
    rutaApi: null,
    tokenApi: null,
    produccion: 0,
    checkProduccion: false,
    usuarioSunat: null,
    claveSunat: null,
    accion: 0,
    idUsuario: 29,
    loading: false,
  }

  // Variable reactiva para gestionar una unidad de negocio
  const businessUnit = ref({ ...initialBusinessUnit })

  // Funcion que regresara al estado inicial la variable reactiva
  const resetBusinessUnit = () => {
    businessUnit.value = { ...initialBusinessUnit }
  }

  // Variable que almacenara las columnas permitidas para los filtros de busqueda por cmapo
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
      title: 'Razón Social',
      field: 'a.razonSocial',
    },
    {
      title: 'RUC',
      field: 'a.ruc',
    },
  ]

  // Variable reactiva para el paginado y filtrado
  const serverParams = ref({
    columnFilters: {
      field: '',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  // Retornando el objeto con las variables reactivas y funciones a utilizar en el mantenimiento
  return {
    businessUnits,
    businessUnit,
    resetBusinessUnit,
    optionsColumnsFilter,
    serverParams,
  }
}

// Exportando la funcion
export default useVariables
