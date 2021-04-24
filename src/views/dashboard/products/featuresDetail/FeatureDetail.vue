<template>
  <div>
    <modal-feature-detail />
    <modal-search-feature-detail />
    <b-card>
      <table-feature-detail />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TableFeatureDetail from './TableFeatureDetail.vue'
import ModalFeatureDetail from './ModalFeatureDetail.vue'
import ModalSearchFeatureDetail from './ModalSearchFeatureDetail.vue'

export default {
  name: 'FeatureDetail',
  components: {
    BCard,
    TableFeatureDetail,
    ModalFeatureDetail,
    ModalSearchFeatureDetail,
  },
  setup() {
    const {
      featuresDetail, featureDetail, resetFeatureDetail, optionsColumnsFilter, serverParams, combos,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadFeaturesDetail = async () => {
      featuresDetail.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/dcaracteristica/?_id=0&tabla=dcaracteristica&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los detalle característica')
      } else {
        featuresDetail.value.data = data
        featuresDetail.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) featuresDetail.value.totalRecords = data[0].numberRow
        }
      }
      featuresDetail.value.loading = false
    }

    onMounted(() => {
      loadFeaturesDetail()
      loadComboBoxes(combos.value, ['features'], '/combo/caracteristica/1', 'Error al momento de cargar las Características')
    })

    provide('featuresDetail', featuresDetail)
    provide('loadFeaturesDetail', loadFeaturesDetail)
    provide('featureDetail', featureDetail)
    provide('resetFeatureDetail', resetFeatureDetail)
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
