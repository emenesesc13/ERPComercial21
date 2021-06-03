<template>
  <b-form @submit.prevent="sendSearch">
    <b-modal
      id="modal-predio-search"
      ok-only
      ok-title="Accept"
      modal-class="modal-primary modal--padding"
      centered
      title="Buscar Predio"
    >
      <b-row>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Campo"
            label-for="field"
          >
            <v-select
              id="field"
              v-model="serverParams.columnFilters.field"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="option => option.field"
              label="title"
              :options="optionsColumnsFilter"
            />
          </b-form-group>
        </b-col>

        <!-- Value -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Valor"
            label-for="value"
          >
            <b-form-input
              id="value"
              v-model="serverParams.columnFilters.value"
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
          Buscar
        </b-button>
      </template>

    </b-modal>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal, BButton,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
import vSelect from 'vue-select'

export default {
  name: 'ModalSearchUnitMeasure',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BButton,
    vSelect,
  },
  methods: {
    sendSearch() {
      this.loadPredios()
      this.$bvModal.hide('modal-predio-search')
    },
    clearSearch() {
      this.serverParams.columnFilters.field = ''
      this.serverParams.columnFilters.value = ''
      this.loadPredios()
      this.$bvModal.hide('modal-predio-search')
    },
  },
  setup() {
    const loadPredios = inject('loadPredios')
    const serverParams = inject('serverParams')
    const optionsColumnsFilter = inject('optionsColumnsFilter')
    return {
      loadPredios,
      serverParams,
      optionsColumnsFilter,
    }
  },
}
</script>
