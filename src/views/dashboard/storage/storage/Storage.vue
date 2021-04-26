<template>
  <div>
    <h1>Almacen</h1>
    <b-card>
      <table-storage />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableStorage from './TableStorage.vue'
import useVariables from './useVariables'

export default {
  name: 'Storage',
  components: {
    BCard,
    TableStorage,
  },
  setup() {
    const {
      storages, storage, resetStorage, serverParams,
    } = useVariables()

    const messageToast = inject('messageToast')

    const loadStorages = async () => {
      storages.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/almacen/?_id=0&tabla=almacen&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los almacenes')
      } else if (data) {
        storages.value.data = data
        storages.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) storages.value.totalRecords = data[0].numberRow
        }
      }
      storages.value.loading = false
    }

    onMounted(() => {
      loadStorages()
    })

    provide('storages', storages)
    provide('storage', storage)
    provide('serverParams', serverParams)
    provide('loadStorages', loadStorages)
    provide('resetStorage', resetStorage)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
