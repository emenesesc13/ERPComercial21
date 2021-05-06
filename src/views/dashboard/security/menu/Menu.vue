<template>
  <div>
    <modal-menu />
    <modal-search-menu />
    <b-card>
      <table-menu />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableMenu from './TableMenu.vue'
import ModalMenu from './ModalMenu.vue'
import ModalSearchMenu from './ModalSearchMenu.vue'
import useVariables from './useVariables'

export default {
  name: 'Menu',
  components: {
    BCard,
    TableMenu,
    ModalMenu,
    ModalSearchMenu,
  },
  setup() {
    const {
      menus, menu, resetMenu, combos, optionsColumnsFilter, serverParams,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadMenus = async () => {
      menus.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/menu/?_id=0&tabla=menu&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los menus')
      } else if (data) {
        menus.value.data = data
        menus.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) menus.value.totalRecords = data[0].numberRow
        }
      }
      menus.value.loading = false
    }

    onMounted(() => {
      loadMenus()
      loadComboBoxes(combos.value, ['modules'], '/combo/modulos/1', 'Error al momento de cargar los modulos')
    })

    provide('menus', menus)
    provide('loadMenus', loadMenus)
    provide('menu', menu)
    provide('resetMenu', resetMenu)
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
