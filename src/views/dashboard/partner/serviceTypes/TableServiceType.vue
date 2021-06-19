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
  name: 'TableServiceType',
  components: {
    TableComponent,
  },
  setup() {
    const serviceType = inject('serviceType')
    const serviceTypes = inject('serviceTypes')
    const loadServiceTypes = inject('loadServiceTypes')
    const resetServiceType = inject('resetServiceType')
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
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
      },
    ]

    const idModal = 'modal-service-type'
    const url = '/tiposervicio'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }

    const urlForExportData = '/tiposervicio/?_id=0&tabla=tiposervicio'
    provide('columns', columns)
    provide('data', serviceTypes)
    provide('row', serviceType)
    provide('resetRow', resetServiceType)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadServiceTypes)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Tipos de Servicios')
  },
}
</script>
