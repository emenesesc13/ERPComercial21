<template>
  <table-component />
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

    const idModal = 'modal-storage-type'
    const url = '/tipoalmacen'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }

    provide('columns', columns)
    provide('data', storageTypes)
    provide('row', storageType)
    provide('resetRow', resetStorageType)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadStorageTypes)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>

<style>

</style>
