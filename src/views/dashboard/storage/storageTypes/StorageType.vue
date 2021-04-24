<template>
  <div>
    <modal-storage-type />
    <modal-search-storage-type />
    <b-card>
      <table-storage-type />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import ModalStorageType from './ModalStorageType.vue'
import ModalSearchStorageType from './ModalSearchStorageType.vue'
import TableStorageType from './TableStorageType.vue'
import useVariables from './useVariables'

export default {
  name: 'StorageType',
  components: {
    BCard,
    ModalStorageType,
    ModalSearchStorageType,
    TableStorageType,
  },
  setup() {
    const {
      storageTypes, storageType, resetStorageType, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadStorageTypes = async () => {
      storageTypes.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/tipoalmacen/?_id=0&tabla=tipoalmacen&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los tipos de almacén')
      } else {
        storageTypes.value.data = data
        storageTypes.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) storageTypes.value.totalRecords = data[0].numberRow
        }
      }
      storageTypes.value.loading = false
    }

    onMounted(() => {
      loadStorageTypes()
    })

    provide('storageTypes', storageTypes)
    provide('loadStorageTypes', loadStorageTypes)
    provide('storageType', storageType)
    provide('resetStorageType', resetStorageType)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
