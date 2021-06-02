<template>
  <table-component
    :export-pdf="true"
    :export-excel="true"
  >
    <template #custom="{ props }">
      <!-- Column: produccion -->
      <span v-if="props.column.field === 'produccion'">
        <b-badge :variant="props.row.produccion ? 'light-success' : 'light-danger'">
          <feather-icon :icon="props.row.produccion ? 'CheckIcon' : 'SlashIcon'" />
        </b-badge>
      </span>
    </template>
  </table-component>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'
import { BBadge } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'TableBusinessUnit',
  components: {
    TableComponent,
    BBadge,
  },
  setup() {
    const businessUnit = inject('businessUnit')
    const businessUnits = inject('businessUnits')
    const loadBusinessUnits = inject('loadBusinessUnits')
    const resetBusinessUnit = inject('resetBusinessUnit')
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
        label: 'Ruc',
        field: 'ruc',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Razón Social',
        field: 'razonSocial',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Producción',
        field: 'produccion',
        thClass: 'align-middle text-left',
        tdClass: 'align-middle text-center',
        pdf: true,
        type: 'boolean',
      },
      {
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
      },
    ]

    const idModal = 'modal-business-unit'
    const url = '/unidadnegocio'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/unidadnegocio/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      row.value.checkProduccion = !!data.produccion
      return true
    }

    const urlForExportData = '/unidadnegocio/?_id=0&tabla=negocio'
    provide('columns', columns)
    provide('data', businessUnits)
    provide('row', businessUnit)
    provide('resetRow', resetBusinessUnit)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadBusinessUnits)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Unidades de negocio')
  },
}
</script>
