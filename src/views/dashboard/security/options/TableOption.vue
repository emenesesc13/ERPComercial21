<template>
  <table-component
    :export-pdf="true"
    :export-excel="true"
  />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableOption',
  components: {
    TableComponent,
  },
  setup() {
    const option = inject('option')
    const options = inject('options')
    const loadOptions = inject('loadOptions')
    const resetOption = inject('resetOption')
    const serverParams = inject('serverParams')
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
        label: 'Nombre',
        field: 'nombre',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Icono',
        field: 'icono',
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

    const idModal = 'modal-option'
    const url = '/opciones'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      row.value.icono = rowSelected.icono
      return true
    }

    const urlForExportData = '/opciones/?_id=0&tabla=opciones'
    provide('columns', columns)
    provide('data', options)
    provide('row', option)
    provide('resetRow', resetOption)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadOptions)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Opciones')
  },
}
</script>
