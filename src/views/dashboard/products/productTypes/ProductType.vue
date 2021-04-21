<template>
  <div>
    <modal-product-type />
    <modal-search-product-type />
    <b-card>
      <table-product-type />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableProductType from './TableProductType.vue'
import ModalProductType from './ModalProductType.vue'
import ModalSearchProductType from './ModalSearchProductType.vue'
import useVariables from './useVariables'

export default {
  name: 'ProductType',
  components: {
    BCard,
    TableProductType,
    ModalProductType,
    ModalSearchProductType,
  },
  setup() {
    const {
      productTypes, productType, resetProductType, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadProductTypes = async () => {
      productTypes.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/tipoproducto/?_id=0&tabla=tipoproducto&inicio=${page}&tope=${perPage}`
      if (field) url += `&campo=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los tipos de producto')
      } else {
        productTypes.value.data = data
        productTypes.value.totalRecords = 0
        if (data.length > 0) {
          if (data[0]?.numberRow) productTypes.value.totalRecords = data[0].numberRow
        }
      }
      productTypes.value.loading = false
    }

    onMounted(() => {
      loadProductTypes()
    })

    provide('productTypes', productTypes)
    provide('loadProductTypes', loadProductTypes)
    provide('productType', productType)
    provide('resetProductType', resetProductType)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
