<template>
  <table-component
    :export-pdf="true"
    :export-excel="true"
  />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import useFetch from '@/hooks/useFetch'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableStorages',
  components: {
    TableComponent,
  },
  setup() {
    const storage = inject('storage')
    const storages = inject('storages')
    const loadStorages = inject('loadStorages')
    const resetStorage = inject('resetStorage')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
    const resetSubStorages = inject('resetSubStorages')
    const resetSubStorage = inject('resetSubStorage')
    const loadSubStoragesByStorageID = inject('loadSubStoragesByStorageID')

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
        label: 'Predio',
        field: 'nombrePredio',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Tipo Almacén',
        field: 'nombreTipoAlmacen',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Observación',
        field: 'observacion',
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

    const idModal = 'modal-storage'
    const url = '/almacen'

    const loadDataForRegister = async () => {
      resetSubStorage()
      resetSubStorages()
      return true
    }

    const loadDataForEdit = async (rowSelected, row) => {
      resetStorage()
      resetSubStorages()
      const { error, data } = await useFetch(`/almacen/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = data
      await loadSubStoragesByStorageID(row.value._id)
      return true
    }

    const urlForExportData = '/almacen/?_id=0&tabla=almacen'
    provide('columns', columns)
    provide('data', storages)
    provide('row', storage)
    provide('resetRow', resetStorage)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadStorages)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
    provide('loadDataForRegister', loadDataForRegister)
    provide('loadSubStoragesByStorageID', loadSubStoragesByStorageID)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Almacén')
  },
}
</script>
