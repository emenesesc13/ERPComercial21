<template>
  <div>
    <modal-feature />
    <modal-search-feature />
    <b-card>
      <table-feature />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableFeature from './TableFeature.vue'
import ModalFeature from './ModalFeature.vue'
import ModalSearchFeature from './ModalSearchFeature.vue'
import useVariables from './useVariables'

export default {
  name: 'Feature',
  components: {
    BCard,
    TableFeature,
    ModalFeature,
    ModalSearchFeature,
  },
  setup() {
    const {
      features, feature, resetFeature, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadFeatures = async () => {
      features.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/caracteristica/?_id=0&tabla=caracteristica&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar las características')
      } else {
        features.value.data = data
        features.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) features.value.totalRecords = data[0].numberRow
        }
      }
      features.value.loading = false
    }

    onMounted(() => {
      loadFeatures()
    })

    provide('features', features)
    provide('loadFeatures', loadFeatures)
    provide('feature', feature)
    provide('resetFeature', resetFeature)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
