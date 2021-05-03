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

export default {
  name: 'TablePartner',
  components: {
    TableComponent,
  },
  setup() {
    const partner = inject('partner')
    const tabIndex = inject('tabIndex')
    const dniSelected = inject('dniSelected')
    const partners = inject('partners')
    const loadPartners = inject('loadPartners')
    const ubigeoSelected = inject('ubigeoSelected')
    const combos = inject('combos')
    const resetCombo = inject('resetCombo')
    const resetUbigeoSelected = inject('resetUbigeoSelected')
    const loadComboBoxes = inject('loadComboBoxes')
    const resetPartner = inject('resetPartner')
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

    const loadDataForRegister = async () => {
      partner.value.idDocumento = 13
      tabIndex.value = 0
      resetUbigeoSelected()
      resetCombo(combos.value, ['province', 'district'])
      return true
    }

    const loadDataForEdit = async (rowSelected, row) => {
      const res = true
      if (rowSelected.idDocumento === 13) {
        dniSelected.value = true
      } else {
        dniSelected.value = false
      }
      ubigeoSelected.value.departament = rowSelected.codigoDepartamento
      resetCombo(combos.value, ['province', 'district'])
      await loadComboBoxes(combos.value, ['province'], `/ComboUbigeo/Provincia/${ubigeoSelected.value.departament}`, 'Ocurrio un Error al momento de cargar las Provincias')
      ubigeoSelected.value.province = rowSelected.codigoProvincia
      resetCombo(combos.value, ['district'])
      await loadComboBoxes(combos.value, ['district'], `/ComboUbigeo/Distrito/${ubigeoSelected.value.departament}/${ubigeoSelected.value.province}`, 'Ocurrio un Error al momento de cargar las Provincias')
      ubigeoSelected.value.district = rowSelected.idUbigeo
      row.value = { ...row.value, ...rowSelected }
      row.value.cliente = !!rowSelected.cliente
      row.value.transportista = !!rowSelected.transportista
      row.value.proveedor = !!rowSelected.proveedor
      tabIndex.value = 0
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
    provide('loadDataForRegister', loadDataForRegister)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Socios')
  },
}
</script>
