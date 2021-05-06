<template>
  <div>
    <modal-collaborator />
    <modal-search-collaborator />
    <b-card>
      <table-collaborator />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import TableCollaborator from './TableCollaborator.vue'
import ModalCollaborator from './ModalCollaborator.vue'
import ModalSearchCollaborator from './ModalSearchCollaborator.vue'
import useVariables from './useVariables'

export default {
  name: 'Collaborator',
  components: {
    BCard,
    TableCollaborator,
    ModalCollaborator,
    ModalSearchCollaborator,
  },
  setup() {
    const {
      collaborator, collaborators, resetCollaborator, optionsColumnsFilter, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')

    const loadCollaborators = async () => {
      collaborators.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/colaborador/?_id=0&tabla=colaborador&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los colaboradores')
      } else if (data) {
        collaborators.value.data = data
        collaborators.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) collaborators.value.totalRecords = data[0].numberRow
        }
      }
      collaborators.value.loading = false
    }

    onMounted(() => {
      loadCollaborators()
    })

    provide('collaborators', collaborators)
    provide('loadCollaborators', loadCollaborators)
    provide('collaborator', collaborator)
    provide('resetCollaborator', resetCollaborator)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
