import { ref } from '@vue/composition-api'

const useVariables = () => {
  const productTypes = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialProductType = {
    _id: 0,
    nombre: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const productType = ref({ ...initialProductType })

  const resetProductType = () => {
    productType.value = { ...initialProductType }
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
    productTypes,
    productType,
    resetProductType,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
