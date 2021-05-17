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
  name: 'TableModule',
  components: {
    TableComponent,
  },
  setup() {
    const moduleOne = inject('moduleOne')
    const modules = inject('modules')
    const loadModules = inject('loadModules')
    const resetModule = inject('resetModule')
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
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
      },
    ]

    const idModal = 'modal-module'
    const url = '/modulos'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/modulos/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      return true
    }

    const urlForExportData = '/modulos/?_id=0&tabla=modulos'
    provide('columns', columns)
    provide('data', modules)
    provide('row', moduleOne)
    provide('resetRow', resetModule)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadModules)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Unidade de medida')
  },
}
</script>
