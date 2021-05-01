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
  name: 'TablePartner',
  components: {
    TableComponent,
  },
  setup() {
    const partner = inject('partner')
    const partners = inject('partners')
    const loadPartners = inject('loadPartners')
    const ubigeoSelected = inject('ubigeoSelected')
    const combos = inject('combos')
    const resetCombo = inject('resetCombo')
    const loadComboBoxes = inject('loadComboBoxes')
    const resetPartner = inject('resetPartner')
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
        label: 'Nombres',
        field: 'nombres',
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
        label: 'N° Ruc',
        field: 'numeroRuc',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'N° Doc',
        field: 'numeroDocumento',
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

    const idModal = 'modal-partner'
    const url = '/socio'

    const loadDataForEdit = async (rowSelected, row) => {
      let res = false
      const { error, data } = await useFetch(`/socio/${rowSelected._id}`)
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

    const urlForExportData = '/socio/?_id=0&tabla=socios'

    provide('columns', columns)
    provide('data', partners)
    provide('row', partner)
    provide('resetRow', resetPartner)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadPartners)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Socios')
  },
}
</script>
