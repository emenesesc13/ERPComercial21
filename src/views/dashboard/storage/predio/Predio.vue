<template>
  <div>
    <modal-predio />
    <modal-search-predio />
    <b-card>
      <table-predio />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TablePredio from './TablePredio.vue'
import ModalSearchPredio from './ModalSearchPredio.vue'
import useVariables from './useVariables'
import ModalPredio from './ModalPredio.vue'

export default {
  name: 'Predio',
  components: {
    BCard,
    TablePredio,
    ModalSearchPredio,
    ModalPredio,
  },
  setup() {
    const {
      predios, predio, resetPredio, ubigeoSelected, resetUbigeoSelected, combos, resetCombo, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadPredios = async () => {
      predios.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/predio/?_id=0&tabla=predios&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los predios')
      } else if (data) {
        predios.value.data = data
        predios.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) predios.value.totalRecords = data[0].numberRow
        }
      }
      predios.value.loading = false
    }

    onMounted(() => {
      loadPredios()
      loadComboBoxes(combos.value, ['departament'], '/ComboUbigeo/Departamento', 'Ocurrio un Error al momento de cargar los Departamentos')
    })

    provide('predios', predios)
    provide('loadPredios', loadPredios)
    provide('predio', predio)
    provide('ubigeoSelected', ubigeoSelected)
    provide('resetUbigeoSelected', resetUbigeoSelected)
    provide('combos', combos)
    provide('resetCombo', resetCombo)
    provide('resetPredio', resetPredio)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
