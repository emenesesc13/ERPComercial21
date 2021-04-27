<template>
  <div>
    <modal-partner />
    <b-card>
      <table-partner />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TablePartner from './TablePartner.vue'
import ModalPartner from './ModalPartner.vue'

export default {
  name: 'Partner',
  components: {
    BCard,
    TablePartner,
    ModalPartner,
  },
  setup() {
    const {
      partners, partner, resetPartner, ubigeoSelected, resetUbigeoSelected, combos, resetCombo, optionsColumnsFilter, serverParams, tabIndex,
    } = useVariables()
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadPartners = async () => {
      partners.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/socio/?_id=0&tabla=socios&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los socios')
      } else if (data) {
        partners.value.data = data
        partners.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) partners.value.totalRecords = data[0].numberRow
        }
      }
      partners.value.loading = false
    }

    onMounted(() => {
      loadPartners()
      loadComboBoxes(combos.value, ['documentType'], '/combo/documento/1', 'Ocurrio un Error al momento de cargar los Tipos de Documento')
      loadComboBoxes(combos.value, ['departament'], '/ComboUbigeo/Departamento', 'Ocurrio un Error al momento de cargar los Departamentos')
    })

    provide('partners', partners)
    provide('loadPartners', loadPartners)
    provide('partner', partner)
    provide('tabIndex', tabIndex)
    provide('ubigeoSelected', ubigeoSelected)
    provide('resetUbigeoSelected', resetUbigeoSelected)
    provide('combos', combos)
    provide('resetCombo', resetCombo)
    provide('resetPartner', resetPartner)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
