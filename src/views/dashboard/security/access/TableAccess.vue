<template>
  <table-component
    :button-edit="false"
    :button-status="false"
  />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableAccess',
  components: {
    TableComponent,
  },
  setup() {
    const access = inject('access')
    const accesss = inject('accesss')
    const optionsAccess = inject('optionsAccess')
    const optionsAccessSelected = inject('optionsAccessSelected')
    const loadAccess = inject('loadAccess')
    const resetAccess = inject('resetAccess')
    const resetCombos = inject('resetCombos')
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
        label: 'Rol',
        field: 'nombreRol',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Módulo',
        field: 'nombreModulo',
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
    ]

    const idModal = 'modal-access'
    const url = '/accesoopcion'

    const loadDataForRegister = async () => {
      resetCombos(['menus'])
      optionsAccess.value.data = []
      optionsAccessSelected.value = []
      return true
    }

    const loadDataForEdit = async () => true

    provide('columns', columns)
    provide('data', accesss)
    provide('row', access)
    provide('resetRow', resetAccess)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadAccess)
    provide('idModal', idModal)
    provide('loadDataForRegister', loadDataForRegister)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    const urlForExportData = '/accesos/?_id=0&tabla=accesos'
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Accesos')
  },
}
</script>
