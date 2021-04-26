import { ref } from '@vue/composition-api'

const useVariables = () => {
  const predios = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialUbigeoSelected = {
    departament: 0,
    province: 0,
    district: 0,
  }

  const ubigeoSelected = ref({ ...initialUbigeoSelected })

  const resetUbigeoSelected = () => {
    ubigeoSelected.value = { ...initialUbigeoSelected }
  }

  const initialStateCombo = {
    loading: false,
    data: [],
    disabled: true,
  }
  const combos = ref({
    departament: { ...initialStateCombo },
    province: { ...initialStateCombo },
    district: { ...initialStateCombo },
  })
  const resetCombo = (combosVar, nameCombo = []) => {
    nameCombo.forEach(combo => {
      combosVar[combo] = { ...initialStateCombo }
    })
  }

  const initialPredio = {
    _id: 0,
    idUbigeo: 0,
    direccion: '',
    observacion: '',
    accion: 0,
    idUsuario: 0,
    loading: false,
  }

  const predio = ref({ ...initialPredio })

  const resetPredio = () => {
    predio.value = { ...initialPredio }
  }

  const optionsColumnsFilter = [
    {
      title: 'Observación',
      field: 'a.observacion',
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
    predios,
    predio,
    ubigeoSelected,
    resetUbigeoSelected,
    combos,
    resetCombo,
    resetPredio,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
