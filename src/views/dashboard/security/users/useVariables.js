import { ref } from '@vue/composition-api'

const useVariables = () => {
  const users = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialUser = {
    _id: 0,
    usuario: '',
    idColaborador: 0,
    idRol: 0,
    correo: '',
    clave: '',
    inicio: new Date().toISOString(),
    fin: new Date().toISOString(),
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const user = ref({ ...initialUser })

  const resetUser = () => {
    user.value = { ...initialUser }
  }

  const confirmClave = ref('')

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    collaborators: { ...initialStateCombo },
    roles: { ...initialStateCombo },
  })

  const resetCombos = (nameCombos = []) => {
    nameCombos.forEach(name => {
      combos.value[name] = { ...initialStateCombo }
    })
  }

  const optionsColumnsFilter = [
    {
      title: 'Id',
      field: 'a._id',
    },
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
    users,
    user,
    resetUser,
    confirmClave,
    combos,
    resetCombos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
