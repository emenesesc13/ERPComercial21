<template>
  <table-component
    :export-pdf="true"
    :export-excel="true"
  >
    <template #options-row="{ props }">
      <b-dropdown-item @click="openModalForChangePassword(props.row)">
        <feather-icon
          icon="LockIcon"
          class="mr-50"
        />
        <span>Cambiar Clave</span>
      </b-dropdown-item>
    </template>
  </table-component>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import { BDropdownItem } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableUser',
  components: {
    TableComponent,
    BDropdownItem,
  },
  setup(props, context) {
    const users = inject('users')
    const loadUsers = inject('loadUsers')
    const user = inject('user')
    const resetUser = inject('resetUser')
    const confirmClave = inject('confirmClave')
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

    const openModalForChangePassword = row => {
      resetUser()
      confirmClave.value = ''
      user.value._id = row._id
      context.root.$bvModal.show('modal-user-clave')
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

    // Provide for Export to Document (PDF, EXCEL)
    const urlForExportData = '/usuario/?_id=0&tabla=usuarios'
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Usuarios')

    return {
      openModalForChangePassword,
    }
  },
}
</script>
