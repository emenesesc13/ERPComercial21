<template>
  <div>
    <modal-storage />
    <modal-search-storage />
    <b-card>
      <table-storage />
    </b-card>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import store from '@/store'
import TableStorage from './TableStorage.vue'
import ModalStorage from './ModalStorage.vue'
import ModalSearchStorage from './ModalSearchStorage.vue'
import useVariables from './useVariables'

export default {
  name: 'Storage',
  components: {
    BCard,
    TableStorage,
    ModalSearchStorage,
    ModalStorage,
  },
  setup() {
    const {
      storages, storage, resetStorage, serverParams, optionsColumnsFilter, resetSubStorage, subStorage, combos, resetCombos, resetSubStorages, subStorages,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadStorages = async () => {
      storages.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/almacen/?_id=0&tabla=almacen&idUsuario=${store.state.auth.user._id}&idNegocio=${0}&pinicio=${page}&pfin=${perPage}`
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

    const loadSubStoragesByStorageID = async storageId => {
      subStorages.value.loading = true
      const url = `/dalmacen/?_id=0&tabla=dalmacen&campo=a.idAlmacen&indice=${storageId}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los sub Almacenes')
      } else {
        subStorages.value.data = data
      }
      subStorages.value.loading = false
    }

    onMounted(() => {
      loadStorages()
      loadComboBoxes(combos.value, ['estates'], '/combo/predios/1', 'Error al momento de cargar los Predios')
      loadComboBoxes(combos.value, ['storageTypes'], '/combo/tipoalmacen/1', 'Error al momento de cargar los Predios')
    })

    provide('storages', storages)
    provide('storage', storage)
    provide('serverParams', serverParams)
    provide('loadStorages', loadStorages)
    provide('resetStorage', resetStorage)
    provide('loadSubStoragesByStorageID', loadSubStoragesByStorageID)
    provide('resetSubStorage', resetSubStorage)
    provide('subStorage', subStorage)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('combos', combos)
    provide('resetCombos', resetCombos)
    provide('resetSubStorages', resetSubStorages)
    provide('subStorages', subStorages)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
