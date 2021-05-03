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
  name: 'TablePredio',
  components: {
    TableComponent,
  },
  setup() {
    const predio = inject('predio')
    const predios = inject('predios')
    const loadPredios = inject('loadPredios')
    const ubigeoSelected = inject('ubigeoSelected')
    const combos = inject('combos')
    const resetCombo = inject('resetCombo')
    const loadComboBoxes = inject('loadComboBoxes')
    const resetPredio = inject('resetPredio')
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
        label: 'Cod Sunat',
        field: 'codigoSunat',
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
        label: 'Dirección',
        field: 'direccion',
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

    const idModal = 'modal-predio'
    const url = '/predio'

    const loadDataForEdit = async (rowSelected, row) => {
      let res = false
      const { error, data } = await useFetch(`/predio/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        res = false
      } else if (data) {
        ubigeoSelected.value.departament = data.codigoDepartamento
        resetCombo(combos.value, ['province', 'district'])
        await loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeoSelected.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
        ubigeoSelected.value.province = data.codigoProvincia
        resetCombo(combos.value, ['district'])
        await loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeoSelected.value.departament}/${ubigeoSelected.value.province}`, 'Ocurrio un Error al momento de cargar las Provincias')
        ubigeoSelected.value.district = data.idUbigeo
        row.value = { ...row.value, ...data }
        res = true
      }
      return res
    }

    const urlForExportData = '/predio/?_id=0&tabla=predios'

    provide('columns', columns)
    provide('data', predios)
    provide('row', predio)
    provide('resetRow', resetPredio)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadPredios)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('columnsAvailableForExport', [...columns])
    provide('urlForExportData', urlForExportData)
    provide('titleForPdf', 'Reporte de Predios')
  },
}
</script>
