import { ref } from '@vue/composition-api'

const useVariables = () => {
  const featuresDetail = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialFeatureDetail = {
    _id: 0,
    nombre: '',
    idCaracteristica: null,
    accion: null,
    idUsuario: null,
    loading: false,
  }

  const featureDetail = ref({ ...initialFeatureDetail })

  const resetFeatureDetail = () => {
    featureDetail.value = { ...initialFeatureDetail }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    features: { ...initialStateCombo },
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
    featuresDetail,
    featureDetail,
    resetFeatureDetail,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
