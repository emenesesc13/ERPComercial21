<template>
  <div>
    <b-modal
      id="modal-export"
      ref="modal-export"
      centered
      title="Exportar Datos"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-row>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Selecciona el Documento"
          >
            <div class="demo-inline-spacing mb-75">
              <b-form-checkbox
                v-model="documentTypesSelected"
                value="EXCEL"
                class="mt-50"
              >
                Excel
              </b-form-checkbox>
              <b-form-checkbox
                v-model="documentTypesSelected"
                value="PDF"
                class="mt-50"
              >
                Pdf
              </b-form-checkbox>
            </div>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Selecciona el Orientación"
          >
            <div class="demo-inline-spacing mb-75">
              <b-form-radio
                v-model="orientationSelected"
                value="HORIZONTAL"
                class="mt-50"
              >
                Horizontal
              </b-form-radio>
              <b-form-radio
                v-model="orientationSelected"
                value="VERTICAL"
                class="mt-50"
              >
                Vertical
              </b-form-radio>
            </div>
          </b-form-group>
        </b-col>

        <b-col
          v-if="urlForExportData"
          cols="12"
        >
          <b-form-group
            label="¿Qué datos deseas exportar?"
          >
            <v-select
              id="count"
              v-model="numberOfRecordsToExport"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="['Todos', 'Página actual']"
              :clearable="false"
            >
              <template v-slot:no-options>
                No se encontraron resultados.
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <b-col
          v-if="columnsAvailableForExport.length"
          cols="12"
        >
          <b-form-group
            label="Selecciona las Columnas"
          >
            <draggable
              v-model="columnsAvailableForExport"
              tag="ul"
              class="list-group list-group-flush cursor-move"
            >
              <transition-group
                type="transition"
                name="flip-list"
              >
                <b-list-group-item
                  v-for="column in columnsAvailableForExport"
                  :key="column.field"
                  tag="li"
                >
                  <b-form-checkbox
                    v-model="columnsSelected"
                    :value="column.field"
                    class="mt-50"
                  >
                    {{ column.label }}
                  </b-form-checkbox>
                </b-list-group-item>
              </transition-group>
            </draggable>
            <!-- <div class="checkbox-grid mb-75">
            </div> -->
          </b-form-group>
        </b-col>

      </b-row>

      <template #modal-footer>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="dowloandDataInDocument"
        >
          <feather-icon
            icon="DownloadIcon"
            class="mr-25"
          />
          Descargar
        </b-button>
      </template>

    </b-modal>
    <b-button
      v-if="dataForExport.data.length && columnsAvailableForExport.length"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="openModalExportData"
    >
      <feather-icon
        icon="ExternalLinkIcon"
        class="mr-0 mr-sm-50"
      />
      <span class="d-none d-sm-inline">
        Exportar
      </span>
    </b-button>
  </div>
</template>

<script>
import { ref, inject } from '@vue/composition-api'
import draggable from 'vuedraggable'
import {
  BRow, BCol, BModal, BFormGroup, BButton, BFormCheckbox, BFormRadio, BListGroupItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  name: 'ExportTable',
  components: {
    draggable,
    BRow,
    BCol,
    BModal,
    BFormGroup,
    BButton,
    BFormCheckbox,
    BFormRadio,
    BListGroupItem,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup(props, context) {
    const documentTypesSelected = ref([])
    const orientationSelected = ref('')
    const numberOfRecordsToExport = ref('')
    const columnsAvailableForExport = ref(inject('columnsAvailableForExport', []))
    const columnsSelected = ref([])
    const dataForExport = inject('data', [{ data: [] }])
    const urlForExportData = inject('urlForExportData', null)

    const openModalExportData = () => {
      context.refs['modal-export'].show()
    }

    const dowloandDataInDocument = () => {
      console.log(urlForExportData)
      console.log(dataForExport.value.data)
    }

    return {
      openModalExportData,
      documentTypesSelected,
      orientationSelected,
      numberOfRecordsToExport,
      columnsAvailableForExport,
      columnsSelected,
      dataForExport,
      urlForExportData,
      dowloandDataInDocument,
    }
  },
}
</script>

<style lang="scss">
.checkbox-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 1em;
}
.list-group-item {
  transition: all 1s
}
</style>
