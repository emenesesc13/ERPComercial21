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
  name: 'TableFeatureDetail',
  components: {
    TableComponent,
  },
  setup() {
    const featureDetail = inject('featureDetail')
    const featuresDetail = inject('featuresDetail')
    const loadFeaturesDetail = inject('loadFeaturesDetail')
    const resetFeatureDetail = inject('resetFeatureDetail')
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
        label: 'Característica',
        field: 'nombreCaracteristica',
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

    const idModal = 'modal-feature-detail'
    const url = '/dcaracteristica'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/dcaracteristica/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = data
      return true
    }

    const urlForExportData = '/dcaracteristica/?_id=0&tabla=dcaracteristica'
    provide('columns', columns)
    provide('data', featuresDetail)
    provide('row', featureDetail)
    provide('resetRow', resetFeatureDetail)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadFeaturesDetail)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Detalle características')
  },
}
</script>
