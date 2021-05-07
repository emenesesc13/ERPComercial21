<template>
  <div>
    <modal-user />
    <modal-user-password />
    <modal-search-user />
    <b-card>
      <table-user />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import ModalUser from './ModalUser.vue'
import ModalUserPassword from './ModalUserPassword.vue'
import ModalSearchUser from './ModalSearchUser.vue'
import TableUser from './TableUser.vue'
import useVariables from './useVariables'

export default {
  name: 'User',
  components: {
    BCard,
    ModalUser,
    ModalUserPassword,
    ModalSearchUser,
    TableUser,
  },
  setup() {
    const {
      user, users, resetUser, confirmClave, combos, resetCombos, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadUsers = async () => {
      users.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/usuario/?_id=0&tabla=usuarios&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los usuarios')
      } else if (data) {
        users.value.data = data
        users.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) users.value.totalRecords = data[0].numberRow
        }
      }
      users.value.loading = false
    }

    onMounted(() => {
      loadUsers()
      loadComboBoxes(combos.value, ['collaborators'], '/combo/colaborador/1', 'Error al momento de cargar los colaboradores')
      loadComboBoxes(combos.value, ['roles'], '/combo/roles/1', 'Error al momento de cargar los roles')
    })

    provide('users', users)
    provide('loadUsers', loadUsers)
    provide('user', user)
    provide('resetUser', resetUser)
    provide('confirmClave', confirmClave)
    provide('combos', combos)
    provide('resetCombos', resetCombos)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
