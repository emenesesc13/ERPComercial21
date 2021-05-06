<template>
  <table-component />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'

export default {
  name: 'TableCollaborator',
  components: {
    TableComponent,
  },
  setup() {
    const collaborator = inject('collaborator')
    const collaborators = inject('collaborators')
    const loadCollaborators = inject('loadCollaborators')
    const resetCollaborator = inject('resetCollaborator')
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
        label: 'Ape. Paterno',
        field: 'apellidoPaterno',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Ape. Materno',
        field: 'apellidoMaterno',
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

    const idModal = 'modal-collaborator'
    const url = '/colaborador'

    const loadDataForEdit = async (rowSelected, row) => {
      row.value._id = rowSelected._id
      row.value.apellidoPaterno = rowSelected.apellidoPaterno
      row.value.apellidoMaterno = rowSelected.apellidoMaterno
      row.value.nombre = rowSelected.nombre
      return true
    }

    provide('columns', columns)
    provide('data', collaborators)
    provide('row', collaborator)
    provide('resetRow', resetCollaborator)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadCollaborators)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>
