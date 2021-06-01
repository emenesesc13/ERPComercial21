<template>
  <div>
    <modal-access />
    <modal-search-access />
    <b-card>
      <table-access />
    </b-card>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import store from '@/store'
import ModalAccess from './ModalAccess.vue'
import ModalSearchAccess from './ModalSearchAccess.vue'
import TableAccess from './TableAccess.vue'
import useVariables from './useVariables'

export default {
  name: 'Access',
  components: {
    BCard,
    ModalAccess,
    ModalSearchAccess,
    TableAccess,
  },
  setup() {
    const {
      accesss, optionsAccess, optionsAccessSelected, access, resetAccess, optionAccess, resetOptionAccess, combos, resetCombos, serverParams,
    } = useVariables()
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadAccess = async () => {
      if (!serverParams.value.columnFilters.value) {
        messageToast('warning', 'Advertencia', 'Debe seleccionar un rol')
      } else {
        accesss.value.loading = true
        const { data, error } = await useFetch(`/accesos/menuroles/${serverParams.value.columnFilters.value}/?idUsuario=${store.state.auth.user._id}&idNegocio=${0}`)
        if (error) {
          messageToast('danger', 'Error', 'Error al momento de cargar los accesos')
        } else if (data) {
          accesss.value.data = data
          accesss.value.totalRecords = 0
          if (data?.length) {
            if (data[0]?.numberRow) accesss.value.totalRecords = data[0].numberRow
          }
        }
        accesss.value.loading = false
      }
    }

    const loadOptionsAccessAvailable = async () => {
      if (access.value.idRol && access.value.idMenu) {
        optionsAccessSelected.value = []
        optionsAccess.value.loading = true
        optionsAccess.value.data = []
        const { data, error } = await useFetch(`combo/copciones/${access.value.idRol}/${access.value.idMenu}`)
        if (error) {
          messageToast('danger', 'Error', 'Error al momento de cargar las opciones de acceso disponibles')
        } else if (data) {
          optionsAccess.value.data = data
        }
        optionsAccess.value.loading = false
      }
    }

    onMounted(() => {
      loadComboBoxes(combos.value, ['roles'], '/combo/roles/1', 'Error al momento de cargar los roles')
      loadComboBoxes(combos.value, ['modules'], '/combo/modulos/1', 'Error al momento de cargar los modulos')
    })

    provide('accesss', accesss)
    provide('optionsAccess', optionsAccess)
    provide('optionsAccessSelected', optionsAccessSelected)
    provide('loadAccess', loadAccess)
    provide('loadOptionsAccessAvailable', loadOptionsAccessAvailable)
    provide('access', access)
    provide('resetAccess', resetAccess)
    provide('optionAccess', optionAccess)
    provide('resetOptionAccess', resetOptionAccess)
    provide('combos', combos)
    provide('resetCombos', resetCombos)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
