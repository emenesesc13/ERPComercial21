<template>
  <div>
    <modal-module />
    <modal-search-module />
    <b-card>
      <table-module />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TableModule from './TableModule.vue'
import ModalModule from './ModalModule.vue'
import ModalSearchModule from './ModalSearchModule.vue'

export default {
  name: 'Module',
  components: {
    BCard,
    TableModule,
    ModalModule,
    ModalSearchModule,
  },
  setup() {
    const {
      modules, moduleOne, resetModule, optionsColumnsFilter, serverParams, combos,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadModules = async () => {
      modules.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/modulos/?_id=0&tabla=modulos&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los modulos')
      } else if (data) {
        modules.value.data = data
        modules.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) modules.value.totalRecords = data[0].numberRow
        }
      }
      modules.value.loading = false
    }

    onMounted(() => {
      loadModules()
      loadComboBoxes(combos.value, ['moduleCmb'], '/combo/modulos/0', 'Error al momento de cargar los grupo unidad')
    })

    provide('modules', modules)
    provide('loadModules', loadModules)
    provide('moduleOne', moduleOne)
    provide('resetModule', resetModule)
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
