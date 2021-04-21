import { ref } from '@vue/composition-api'

const useVariables = () => {
  const unitsGroup = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialUnitGroup = {
    _id: 0,
    nombre: '',
    accion: null,
    idUsuario: null,
    loading: false,
  }

  const unitGroup = ref({ ...initialUnitGroup })

  const resetUnitGroup = () => {
    unitGroup.value = { ...initialUnitGroup }
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
    unitsGroup,
    unitGroup,
    resetUnitGroup,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
