import { ref } from '@vue/composition-api'

const useVariables = () => {
  const storages = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialStorage = {
    _id: 0,
    idPredio: 0,
    nombre: '',
    observacion: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const storage = ref({ ...initialStorage })

  const resetStorage = () => {
    storage.value = { ...initialStorage }
  }

  const serverParams = ref({
    columnFilters: {
      field: '',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  const optionsColumnsFilter = [
    {
      title: 'Nombre',
      field: 'a.nombre',
    },
  ]

  return {
    storages,
    storage,
    resetStorage,
    serverParams,
    optionsColumnsFilter,
  }
}

export default useVariables
