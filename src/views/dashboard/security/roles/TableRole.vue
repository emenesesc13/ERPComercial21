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
  name: 'TableRole',
  components: {
    TableComponent,
  },
  setup() {
    const role = inject('role')
    const roles = inject('roles')
    const loadRoles = inject('loadRoles')
    const resetRole = inject('resetRole')
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
        label: 'Dirección',
        field: 'direccion',
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

    const idModal = 'modal-role'
    const url = '/roles'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/roles/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      return true
    }
    const urlForExportData = '/roles/?_id=0&tabla=roles'
    provide('columns', columns)
    provide('data', roles)
    provide('row', role)
    provide('resetRow', resetRole)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadRoles)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de roles')
  },
}
</script>

<style>

</style>
