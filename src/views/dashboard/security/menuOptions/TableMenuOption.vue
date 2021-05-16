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
  name: 'TableMenuOption',
  components: {
    TableComponent,
  },
  setup() {
    const menuOption = inject('menuOption')
    const menuOptions = inject('menuOptions')
    const loadMenuOptions = inject('loadMenuOptions')
    const resetMenuOption = inject('resetMenuOption')
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
        label: 'Menú',
        field: 'nombreMenu',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Opción',
        field: 'nombreOpcion',
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

    const idModal = 'modal-menu-option'
    const url = '/menuopciones'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/menuopciones/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      return true
    }

    const urlForExportData = '/menuopciones/?_id=0&tabla=menuopciones'
    provide('columns', columns)
    provide('data', menuOptions)
    provide('row', menuOption)
    provide('resetRow', resetMenuOption)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadMenuOptions)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Opciones del Menú')
  },
}
</script>
