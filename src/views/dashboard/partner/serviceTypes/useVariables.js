import { ref } from '@vue/composition-api'

const useVariables = () => {
  const serviceTypes = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialServiceType = {
    _id: 0,
    nombre: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const serviceType = ref({ ...initialServiceType })

  const resetServiceType = () => {
    serviceType.value = { ...initialServiceType }
  }

  const optionsColumnsFilter = [
    {
      title: 'Nombre',
      field: 'a.nombre',
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
    serviceTypes,
    serviceType,
    resetServiceType,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
