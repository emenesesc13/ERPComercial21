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
  name: 'TableProductType',
  components: {
    TableComponent,
  },
  setup() {
    const productType = inject('productType')
    const productTypes = inject('productTypes')
    const loadProductTypes = inject('loadProductTypes')
    const resetProductType = inject('resetProductType')
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

    const idModal = 'modal-product-type'
    const url = '/tipoproducto'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }

    const urlForExportData = '/tipoproducto/?_id=0&tabla=tipoproducto'
    provide('columns', columns)
    provide('data', productTypes)
    provide('row', productType)
    provide('resetRow', resetProductType)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadProductTypes)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Tipos de Productos')
  },
}
</script>
