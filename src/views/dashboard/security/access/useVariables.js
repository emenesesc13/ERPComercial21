import { ref } from '@vue/composition-api'

const useVariables = () => {
  const accesss = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const optionsAccess = ref({
    loading: false,
    data: [],
  })

  const optionsAccessSelected = ref([])

  const initialAccess = {
    _id: 0,
    idRol: 0,
    idModulo: 0,
    idMenu: 0,
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const initialOptionAccess = {
    _id: 0,
    idAcceso: 0,
    idOpcion: 0,
    idUsuario: null,
    loading: false,
  }

  const access = ref({ ...initialAccess })

  const resetAccess = () => {
    access.value = { ...initialAccess }
  }

  const optionAccess = ref({ ...initialOptionAccess })

  const resetOptionAccess = () => {
    optionAccess.value = { ...initialOptionAccess }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    roles: { ...initialStateCombo },
    modules: { ...initialStateCombo },
    menus: { ...initialStateCombo },
  })

  const resetCombos = (nameCombos = []) => {
    nameCombos.forEach(name => {
      combos.value[name] = { ...initialStateCombo }
    })
  }

  const serverParams = ref({
    columnFilters: {
      field: 'idRol',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  return {
    accesss,
    optionsAccess,
    optionsAccessSelected,
    access,
    resetAccess,
    optionAccess,
    resetOptionAccess,
    combos,
    resetCombos,
    serverParams,
  }
}

export default useVariables
