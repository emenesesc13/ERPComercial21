<template>
  <div>
    <modal-service-type />
    <modal-search-service-type />
    <b-card>
      <table-service-type />
    </b-card>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import store from '@/store'
import TableServiceType from './TableServiceType.vue'
import ModalServiceType from './ModalServiceType.vue'
import ModalSearchServiceType from './ModalSearchServiceType.vue'
import useVariables from './useVariables'

export default {
  name: 'ServiceType',
  components: {
    BCard,
    TableServiceType,
    ModalServiceType,
    ModalSearchServiceType,
  },
  setup() {
    const {
      serviceTypes, serviceType, resetServiceType, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadServiceTypes = async () => {
      serviceTypes.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/tiposervicio/?_id=0&tabla=tiposervicio&idUsuario=${store.state.auth.user._id}&idNegocio=${0}&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los tipos de servicio')
      } else if (data) {
        serviceTypes.value.data = data
        serviceTypes.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) serviceTypes.value.totalRecords = data[0].numberRow
        }
      }
      serviceTypes.value.loading = false
    }

    onMounted(() => {
      loadServiceTypes()
    })

    provide('serviceTypes', serviceTypes)
    provide('loadServiceTypes', loadServiceTypes)
    provide('serviceType', serviceType)
    provide('resetServiceType', resetServiceType)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
