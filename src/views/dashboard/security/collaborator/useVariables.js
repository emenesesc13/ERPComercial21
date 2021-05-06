import { ref } from '@vue/composition-api'

const useVariables = () => {
  const collaborators = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialCollaborator = {
    _id: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    accion: 0,
    idUsuario: null,
  }

  const collaborator = ref({ ...initialCollaborator })

  const resetCollaborator = () => {
    collaborator.value = { ...initialCollaborator }
  }

  const optionsColumnsFilter = [
    {
      title: 'Id',
      field: '_id',
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
    collaborators,
    collaborator,
    resetCollaborator,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
