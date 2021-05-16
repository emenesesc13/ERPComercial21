<template>
  <div>
    <modal-menu-option />
    <modal-search-menu-option />
    <b-card>
      <table-menu-option />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TableMenuOption from './TableMenuOption.vue'
import ModalMenuOption from './ModalMenuOption.vue'
import ModalSearchMenuOption from './ModalSearchMenuOption.vue'

export default {
  name: 'OptionMenu',
  components: {
    BCard,
    TableMenuOption,
    ModalMenuOption,
    ModalSearchMenuOption,
  },
  setup() {
    const {
      menuOptions, menuOption, resetMenuOption, optionsColumnsFilter, serverParams, combos,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadMenuOptions = async () => {
      menuOptions.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/menuopciones/?_id=0&tabla=menuopciones&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar las opciones de menu')
      } else if (data) {
        menuOptions.value.data = data
        menuOptions.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) menuOptions.value.totalRecords = data[0].numberRow
        }
      }
      menuOptions.value.loading = false
    }

    onMounted(() => {
      loadMenuOptions()
      loadComboBoxes(combos.value, ['menus'], '/combo/menu/1', 'Error al momento de cargar los menus')
      loadComboBoxes(combos.value, ['options'], '/combo/opciones/1', 'Error al momento de cargar las opciones')
    })

    provide('menuOptions', menuOptions)
    provide('loadMenuOptions', loadMenuOptions)
    provide('menuOption', menuOption)
    provide('resetMenuOption', resetMenuOption)
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
