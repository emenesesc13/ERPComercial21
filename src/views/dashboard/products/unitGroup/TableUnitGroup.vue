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
  name: 'TableUnitGroup',
  components: {
    TableComponent,
  },
  setup() {
    const unitGroup = inject('unitGroup')
    const unitsGroup = inject('unitsGroup')
    const loadUnitsGroup = inject('loadUnitsGroup')
    const resetUnitGroup = inject('resetUnitGroup')
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

    const idModal = 'modal-unit-group'
    const url = '/grupounidad'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }
    const urlForExportData = '/grupounidad/?_id=0&tabla=grupo'
    provide('columns', columns)
    provide('data', unitsGroup)
    provide('row', unitGroup)
    provide('resetRow', resetUnitGroup)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadUnitsGroup)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de grupo unidad')
  },
}
</script>

<style>

</style>
