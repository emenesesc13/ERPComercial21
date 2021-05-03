import { ref } from '@vue/composition-api'

const useVariables = () => {
  const storages = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialStorage = {
    _id: 0,
    idPredio: 0,
    nombre: '',
    nombreTipoAlmacen: '',
    observacion: '',
    accion: 0,
    idUsuario: null,
    loading: false,
  }

  const initialSubStorages = {
    loading: false,
    data: [],
  }

  const subStorages = ref({ ...initialSubStorages })

  const resetSubStorages = () => {
    subStorages.value = { ...initialSubStorages }
  }

  const storage = ref({ ...initialStorage })

  const resetStorage = () => {
    storage.value = { ...initialStorage }
  }

  const initialSubStorage = {
    _id: 0,
    idAlmacen: 0,
    nombre: '',
    ubicacion: '',
    accion: '',
    idUsuario: 0,
  }

  const subStorage = ref({ ...initialSubStorage })

  const resetSubStorage = () => {
    subStorage.value = { ...initialSubStorage }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    estates: { ...initialStateCombo },
    storageTypes: { ...initialStateCombo },
  })

  const resetCombos = (nameCombos = []) => {
    nameCombos.forEach(name => {
      combos.value[name] = { ...initialStateCombo }
    })
  }

  const serverParams = ref({
    columnFilters: {
      field: '',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  const optionsColumnsFilter = [
    {
      title: 'Nombre',
      field: 'a.nombre',
    },
  ]

  return {
    storages,
    storage,
    resetStorage,
    serverParams,
    optionsColumnsFilter,
    initialStateCombo,
    resetSubStorage,
    subStorage,
    combos,
    resetCombos,
    resetSubStorages,
    subStorages,
  }
}

export default useVariables
