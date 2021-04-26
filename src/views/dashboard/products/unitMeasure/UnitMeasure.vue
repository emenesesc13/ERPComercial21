<template>
  <div>
    <modal-unit-measure />
    <modal-search-unit-measure />
    <b-card>
      <table-unit-measure />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TableUnitMeasure from './TableUnitMeasure.vue'
import ModalSearchUnitMeasure from './ModalSearchUnitMeasure.vue'
import ModalUnitMeasure from './ModalUnitMeasure.vue'

export default {
  name: 'UnitMeasure',
  components: {
    BCard,
    TableUnitMeasure,
    ModalSearchUnitMeasure,
    ModalUnitMeasure,
  },
  setup() {
    const {
      unitsMeasure, unitMeasure, resetUnitMeasure, optionsColumnsFilter, serverParams, combos,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadUnitsMeasure = async () => {
      unitsMeasure.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/unidadmedida/?_id=0&tabla=unidad&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar las unidades de medida')
      } else if (data) {
        unitsMeasure.value.data = data
        unitsMeasure.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) unitsMeasure.value.totalRecords = data[0].numberRow
        }
      }
      unitsMeasure.value.loading = false
    }

    onMounted(() => {
      loadUnitsMeasure()
      loadComboBoxes(combos.value, ['unitGroup'], '/combo/grupounidad/0', 'Error al momento de cargar los grupo unidad')
      loadComboBoxes(combos.value, ['unitSunat'], '/combo/unidadmedida/1', 'Error al momento de cargar las unidades de sunat')
    })

    provide('unitsMeasure', unitsMeasure)
    provide('loadUnitsMeasure', loadUnitsMeasure)
    provide('unitMeasure', unitMeasure)
    provide('resetUnitMeasure', resetUnitMeasure)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
    provide('combos', combos)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
