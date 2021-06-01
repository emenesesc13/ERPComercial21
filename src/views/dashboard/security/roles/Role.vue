<template>
  <div>
    <modal-role />
    <modal-search-role />
    <b-card>
      <table-role />
    </b-card>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import store from '@/store'
import TableRole from './TableRole.vue'
import ModalRole from './ModalRole.vue'
import ModalSearchRole from './ModalSearchRole.vue'
import useVariables from './useVariables'

export default {
  name: 'Role',
  components: {
    BCard,
    TableRole,
    ModalRole,
    ModalSearchRole,
  },
  setup() {
    const {
      roles, role, resetRole, optionsColumnsFilter, serverParams, combos,
    } = useVariables()
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadRoles = async () => {
      roles.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/roles/?_id=0&tabla=roles&idUsuario=${store.state.auth.user._id}&idNegocio=${0}&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los roles')
      } else if (data) {
        roles.value.data = data
        roles.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) roles.value.totalRecords = data[0].numberRow
        }
      }
      roles.value.loading = false
    }

    onMounted(() => {
      loadRoles()
      loadComboBoxes(combos.value, ['predio'], '/combo/predios/1', 'Error al momento de cargar los predios')
      loadComboBoxes(combos.value, ['storage'], '/combo/almacen/1', 'Error al momento de cargar los almacenes')
    })

    provide('roles', roles)
    provide('loadRoles', loadRoles)
    provide('role', role)
    provide('resetRole', resetRole)
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
