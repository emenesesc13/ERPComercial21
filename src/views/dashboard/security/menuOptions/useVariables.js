import { ref } from '@vue/composition-api'

const useVariables = () => {
  const menuOptions = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialMenuOption = {
    _id: 0,
    idMenu: 0,
    idOpcion: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const menuOption = ref({ ...initialMenuOption })

  const resetMenuOption = () => {
    menuOption.value = { ...initialMenuOption }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    menus: { ...initialStateCombo },
    options: { ...initialStateCombo },
  })

  const optionsColumnsFilter = [
    {
      title: 'Menú',
      field: 'a.nombremenu',
    },
    {
      title: 'Opción',
      field: 'a.nombreopcion',
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
    menuOptions,
    menuOption,
    resetMenuOption,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
