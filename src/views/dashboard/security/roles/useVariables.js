import { ref } from '@vue/composition-api'

const useVariables = () => {
  const roles = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialRole = {
    _id: 0,
    nombre: '',
    accion: null,
    idPredio: 0,
    idAlmacen: 0,
    idUsuario: null,
    loading: false,
  }

  const role = ref({ ...initialRole })

  const resetRole = () => {
    role.value = { ...initialRole }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    predio: { ...initialStateCombo },
    storage: { ...initialStateCombo },
  })

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
    roles,
    role,
    resetRole,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
