import { ref } from '@vue/composition-api'

const useVariables = () => {
  const storageTypes = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialStorageType = {
    _id: 0,
    nombre: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }
  const storageType = ref({ ...initialStorageType })

  const resetStorageType = () => {
    storageType.value = { ...initialStorageType }
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
    storageTypes,
    storageType,
    resetStorageType,
    optionsColumnsFilter,
    serverParams,
  }
}
export default useVariables
