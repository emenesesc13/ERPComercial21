import { ref } from '@vue/composition-api'

const useVariables = () => {
  const partners = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialUbigeoSelected = {
    departament: 0,
    province: 0,
    district: 0,
  }

  const ubigeoSelected = ref({ ...initialUbigeoSelected })

  const resetUbigeoSelected = () => {
    ubigeoSelected.value = { ...initialUbigeoSelected }
  }

  const initialStateCombo = {
    loading: false,
    data: [],
    disabled: true,
  }
  const combos = ref({
    departament: { ...initialStateCombo },
    province: { ...initialStateCombo },
    district: { ...initialStateCombo },
    documentType: { ...initialStateCombo },
  })
  const resetCombo = (combosVar, nameCombo = []) => {
    nameCombo.forEach(combo => {
      combosVar[combo] = { ...initialStateCombo }
    })
  }

  const initialPartner = {
    _id: 0, // int
    apellidoPaterno: '', // string
    apellidoMaterno: '', // string
    nombres: '', // string
    razonSocial: '', // string
    numeroRuc: '', // string
    idDocumento: 0, // int
    numeroDocumento: '', // string
    idUbigeo: 0, // int
    direccion: '', // string
    telefono: '', // string
    correo: '', // string
    cliente: 0, // int
    proveedor: 0, // int
    transportista: 0, // int
    nombreContacto: '', // string
    telefonoContacto: '', // string
    observaciones: '', // string
    idUsuario: 0, // int
    accion: 0, // int
  }

  const partner = ref({ ...initialPartner })

  const resetPartner = () => {
    partner.value = { ...initialPartner }
  }

  const optionsColumnsFilter = [
    {
      title: 'Observación',
      field: 'a.observacion',
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
    partners,
    partner,
    ubigeoSelected,
    resetUbigeoSelected,
    combos,
    resetCombo,
    resetPartner,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
