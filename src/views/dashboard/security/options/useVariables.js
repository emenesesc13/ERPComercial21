import { ref } from '@vue/composition-api'

const useVariables = () => {
  const options = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialOption = {
    _id: 0,
    nombre: '',
    icono: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const option = ref({ ...initialOption })

  const resetOption = () => {
    option.value = { ...initialOption }
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
    options,
    option,
    resetOption,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
