import { ref } from '@vue/composition-api'

const useVariables = () => {
  const unitsMeasure = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialUnitMeasure = {
    _id: 0,
    nombre: '',
    idGrupoUnidad: 0,
    idUnidadSunat: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const unitMeasure = ref({ ...initialUnitMeasure })

  const resetUnitMeasure = () => {
    unitMeasure.value = { ...initialUnitMeasure }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    unitGroup: { ...initialStateCombo },
    unitSunat: { ...initialStateCombo },
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
    unitsMeasure,
    unitMeasure,
    resetUnitMeasure,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
