import { ref } from '@vue/composition-api'

const useVariables = () => {
  const modules = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialModule = {
    _id: 0,
    nombre: '',
    idPadre: 0,
    accion: null,
    idUsuario: 0,
    loading: false,
  }

  const moduleOne = ref({ ...initialModule })

  const resetModule = () => {
    moduleOne.value = { ...initialModule }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    moduleCmb: { ...initialStateCombo },
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
    modules,
    moduleOne,
    resetModule,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
