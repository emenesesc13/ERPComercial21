<template>
  <div>
    <modal-option />
    <modal-search-option />
    <b-card>
      <table-option />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TableOption from './TableOption.vue'
import ModalOption from './ModalOption.vue'
import ModalSearchOption from './ModalSearchOption.vue'

export default {
  name: 'Option',
  components: {
    BCard,
    TableOption,
    ModalOption,
    ModalSearchOption,
  },
  setup() {
    const {
      options, option, resetOption, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadOptions = async () => {
      options.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/opciones/?_id=0&tabla=opciones&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar las opciones')
      } else if (data) {
        options.value.data = data
        options.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) options.value.totalRecords = data[0].numberRow
        }
      }
      options.value.loading = false
    }

    onMounted(() => {
      loadOptions()
    })

    provide('options', options)
    provide('loadOptions', loadOptions)
    provide('option', option)
    provide('resetOption', resetOption)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
