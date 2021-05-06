<template>
  <table-component />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import useFetch from '@/hooks/useFetch'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableUser',
  components: {
    TableComponent,
  },
  setup() {
    const users = inject('users')
    const loadUsers = inject('loadUsers')
    const user = inject('user')
    const resetUser = inject('resetUser')
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
        label: 'Usuario',
        field: 'usuario',
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
        label: 'Correo',
        field: 'correo',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Inicio',
        field: 'inicio',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        formatFn: value => new Date(value).toLocaleString('es-ES', {
          year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: 'false', minute: 'numeric', second: 'numeric',
        }),
        pdf: true,
      },
      {
        label: 'Fin',
        field: 'fin',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        formatFn: value => new Date(value).toLocaleString('es-ES', {
          year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: 'false', minute: 'numeric', second: 'numeric',
        }),
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

    const idModal = 'modal-user'
    const url = '/usuario'

    const loadDataForEdit = async (rowSelected, row) => {
      resetUser()
      const { error, data } = await useFetch(`/usuario/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = data
      return true
    }

    provide('columns', columns)
    provide('data', users)
    provide('row', user)
    provide('resetRow', resetUser)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadUsers)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>
