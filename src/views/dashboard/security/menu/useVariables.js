import { ref } from '@vue/composition-api'

const useVariables = () => {
  const menus = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialMenu = {
    _id: 0,
    idModulo: 0,
    nombre: '',
    formulario: '',
    orden: 0,
    icono: '',
    ruta: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const menu = ref({ ...initialMenu })

  const resetMenu = () => {
    menu.value = { ...initialMenu }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    modules: { ...initialStateCombo },
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
    menus,
    menu,
    resetMenu,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
