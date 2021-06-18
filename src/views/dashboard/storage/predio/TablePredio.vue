<template>
  <!-- Componente tabla, activar la exportacion por pdf y excel -->
  <table-component
    :export-pdf="true"
    :export-excel="true"
  />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
// Importar dependencias del componente
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'TablePredio',
  components: {
    // Instalar componentes a utilizar
    TableComponent,
  },
  setup() {
    // Inyectar variables o funciones que me provee el componente superior
    const predio = inject('predio')
    const predios = inject('predios')
    const loadPredios = inject('loadPredios')
    const ubigeoSelected = inject('ubigeoSelected')
    const combos = inject('combos')
    const resetCombo = inject('resetCombo')
    const loadComboBoxes = inject('loadComboBoxes')
    const resetPredio = inject('resetPredio')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
    // Columnas que se proveeran para la generación de la tabla y exportación
    const columns = [
      {
        label: 'Acción',
        field: 'action',
        width: '85px',
        thClass: 'align-middle',
        pdf: false,
      },
      {
        label: 'Id',
        field: '_id',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Cod Sunat',
        field: 'codigoSunat',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Observación',
        field: 'observacion',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Dirección',
        field: 'direccion',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
      },
    ]

    // id del modal
    const idModal = 'modal-predio'
    // url para la eliminación de este mantenimiento
    const url = '/predio'

    // Función que se ejecutara cuando se de click en el boton editar
    // Recibe dos parametros
    /*
      1.- Fila seleccionada en la tabla
      2.- Variable reactiva que estara enlazada con los datos del Modal
    */
    // Tiene que retornar un boolean
    const loadDataForEdit = async (rowSelected, row) => {
      // Crear la variable de respuesta
      let res = false
      // Realizar la peticion
      const { error, data } = await useFetch(`/predio/${rowSelected._id}`)
      if (error) {
        // Si encontro un error mostrar una notificacion y asignar un false como valor de respuesta
        messageToast('danger', 'Error', 'Ocurrio un Error')
        res = false
      } else if (data) {
        // Si encontro datos, rellenar la variable y asignar un true como valor de respuesta
        ubigeoSelected.value.departament = data.codigoDepartamento
        resetCombo(combos.value, ['province', 'district'])
        await loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeoSelected.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
        ubigeoSelected.value.province = data.codigoProvincia
        resetCombo(combos.value, ['district'])
        await loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeoSelected.value.departament}/${ubigeoSelected.value.province}`, 'Ocurrio un Error al momento de cargar las Provincias')
        ubigeoSelected.value.district = data.idUbigeo
        row.value = { ...row.value, ...data }
        res = true
      }
      // Retornar la respuesta
      return res
    }

    // Url para el listado de la tabla
    const urlForExportData = '/predio/?_id=0&tabla=predios'

    // Proveer variables o funciones a los componentes hijos
    provide('columns', columns)
    provide('data', predios)
    provide('row', predio)
    provide('resetRow', resetPredio)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadPredios)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Proveer funciones o variables para exportar Documentos (PDF, EXCEL)
    provide('columnsAvailableForExport', [...columns])
    provide('urlForExportData', urlForExportData)
    provide('titleForPdf', 'Reporte de Predios')
  },
}
</script>
