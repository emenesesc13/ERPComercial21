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
import useFetch from '@/hooks/useFetch'

export default {
  name: 'TableUnitMeasure',
  components: {
    TableComponent,
  },
  setup() {
    const unitMeasure = inject('unitMeasure')
    const unitsMeasure = inject('unitsMeasure')
    const loadUnitsMeasure = inject('loadUnitsMeasure')
    const resetUnitMeasure = inject('resetUnitMeasure')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
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
        label: 'Grupo Unidad',
        field: 'nombreGrupoUnidad',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Unidad Sunat',
        field: 'nombreUnidadSunat',
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

    const idModal = 'modal-unit-measure'
    const url = '/unidadmedida'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/unidadmedida/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      return true
    }

    const urlForExportData = '/unidadmedida/?_id=0&tabla=unidad'
    provide('columns', columns)
    provide('data', unitsMeasure)
    provide('row', unitMeasure)
    provide('resetRow', resetUnitMeasure)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadUnitsMeasure)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Unidade de medida')
  },
}
</script>
