<template>
  <table-component />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'TableMenu',
  components: {
    TableComponent,
  },
  setup() {
    const menus = inject('menus')
    const loadMenus = inject('loadMenus')
    const menu = inject('menu')
    const resetMenu = inject('resetMenu')
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
        label: 'Modulo',
        field: 'nombreModulo',
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
        label: 'Orden',
        field: 'orden',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Ruta',
        field: 'ruta',
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

    const idModal = 'modal-menu'
    const url = '/menu'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/menu/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      return true
    }

    provide('columns', columns)
    provide('data', menus)
    provide('row', menu)
    provide('resetRow', resetMenu)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadMenus)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>
