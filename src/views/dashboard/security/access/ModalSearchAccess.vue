<template>
  <b-form @submit.prevent="sendSearch">
    <b-modal
      id="modal-access-search"
      ok-only
      ok-title="Accept"
      modal-class="modal-primary"
      centered
      title="Buscar Acceso"
    >
      <b-row>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Rol"
            label-for="idRol"
          >
            <v-select
              id="idRol"
              v-model="serverParams.columnFilters.value"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="role => role._id"
              label="nombre"
              :options="combos.roles.data"
              :clearable="false"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <template #modal-footer>
        <b-button
          type="button"
          variant="outline-primary"
          @click="clearSearch"
        >
          Limpiar Filtro
        </b-button>
        <b-button
          type="submit"
          variant="primary"
          @click="sendSearch"
        >
          Filtrar
        </b-button>
      </template>

    </b-modal>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol, BForm, BFormGroup, BModal, BButton,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
import vSelect from 'vue-select'

export default {
  name: 'ModalSearchAccess',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BModal,
    BButton,
    vSelect,
  },
  methods: {
    sendSearch() {
      this.$bvModal.hide('modal-access-search')
      this.loadAccess()
    },
    clearSearch() {
      this.serverParams.columnFilters.value = 0
      this.accesss.data = []
      this.$bvModal.hide('modal-access-search')
    },
  },
  setup() {
    const serverParams = inject('serverParams')
    const accesss = inject('accesss')
    const combos = inject('combos')
    const loadAccess = inject('loadAccess')
    return {
      combos,
      accesss,
      loadAccess,
      serverParams,
    }
  },
}
</script>
