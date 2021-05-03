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
  name: 'TableStorageType',
  components: {
    TableComponent,
  },
  setup() {
    const storageType = inject('storageType')
    const storageTypes = inject('storageTypes')
    const loadStorageTypes = inject('loadStorageTypes')
    const resetStorageType = inject('resetStorageType')
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

    const idModal = 'modal-storage-type'
    const url = '/tipoalmacen'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }
    const urlForExportData = '/tipoalmacen/?_id=0&tabla=tipoalmacen'
    provide('columns', columns)
    provide('data', storageTypes)
    provide('row', storageType)
    provide('resetRow', resetStorageType)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadStorageTypes)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de tipo de almacén')
  },
}
</script>

<style>

</style>
