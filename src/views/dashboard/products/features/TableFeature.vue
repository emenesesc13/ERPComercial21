<template>
  <table-component />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableFeature',
  components: {
    TableComponent,
  },
  setup() {
    const feature = inject('feature')
    const features = inject('features')
    const loadFeatures = inject('loadFeatures')
    const resetFeature = inject('resetFeature')
    const serverParams = inject('serverParams')
    const columns = [
      {
        label: 'Acción',
        field: 'action',
        width: '85px',
        thClass: 'align-middle',
      },
      {
        label: 'Id',
        field: '_id',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Nombre',
        field: 'nombre',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
      },
    ]

    const idModal = 'modal-feature'
    const url = '/caracteristica'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }

    provide('columns', columns)
    provide('data', features)
    provide('row', feature)
    provide('resetRow', resetFeature)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadFeatures)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>
