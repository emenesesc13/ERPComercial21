<template>
  <table-component />
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

    const idModal = 'modal-unit-group'
    const url = '/grupounidad'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.nombre = rowSelected.nombre
      return true
    }

    provide('columns', columns)
    provide('data', unitsGroup)
    provide('row', unitGroup)
    provide('resetRow', resetUnitGroup)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadUnitsGroup)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>

<style>

</style>
