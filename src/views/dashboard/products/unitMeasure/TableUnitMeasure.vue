<template>
  <table-component />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'TableUnitMeasure',
  components: {
    TableComponent,
  },
  setup() {
    const unitMeasure = inject('unitMeasure')
    const unitsMeasure = inject('unitsMeasure')
    const loadUnitsMeasure = inject('loadUnitsMeasure')
    const resetUnitMeasure = inject('resetUnitMeasure')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
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
        label: 'Grupo Unidad',
        field: 'nombreGrupoUnidad',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Unidad Sunat',
        field: 'nombreUnidadSunat',
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

    const idModal = 'modal-unit-measure'
    const url = '/unidadmedida'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/unidadmedida/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = data
      return true
    }

    provide('columns', columns)
    provide('data', unitsMeasure)
    provide('row', unitMeasure)
    provide('resetRow', resetUnitMeasure)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadUnitsMeasure)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
  },
}
</script>
