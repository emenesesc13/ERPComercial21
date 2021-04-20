import { ref } from '@vue/composition-api'

const useVariables = () => {
  const features = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialFeature = {
    _id: 0,
    nombre: '',
    accion: null,
    idUsuario: null,
  }

  const feature = ref({ ...initialFeature })

  const resetFeature = () => {
    feature.value = { ...initialFeature }
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
    features,
    feature,
    resetFeature,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
