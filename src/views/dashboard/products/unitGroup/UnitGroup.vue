<template>
  <div>
    <modal-unit-group />
    <modal-search-unit-group />
    <b-card>
      <table-unit-group />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableUnitGroup from './TableUnitGroup.vue'
import ModalUnitGroup from './ModalUnitGroup.vue'
import ModalSearchUnitGroup from './ModalSearchUnitGroup.vue'
import useVariables from './useVariables'

export default {
  name: 'UnitGroup',
  components: {
    BCard,
    TableUnitGroup,
    ModalUnitGroup,
    ModalSearchUnitGroup,
  },
  setup() {
    const {
      unitsGroup, unitGroup, resetUnitGroup, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadUnitsGroup = async () => {
      unitsGroup.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/grupounidad/?_id=0&tabla=grupo&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los grupos de unidad')
      } else {
        unitsGroup.value.data = data
        unitsGroup.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) unitsGroup.value.totalRecords = data[0].numberRow
        }
      }
      unitsGroup.value.loading = false
    }
    onMounted(() => {
      loadUnitsGroup()
    })

    provide('unitsGroup', unitsGroup)
    provide('loadUnitsGroup', loadUnitsGroup)
    provide('unitGroup', unitGroup)
    provide('resetUnitGroup', resetUnitGroup)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
