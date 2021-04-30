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
                value="PDF"
                class="mt-50"
              >
                Pdf
              </b-form-checkbox>
              <b-form-checkbox
                v-model="documentTypesSelected"
                value="EXCEL"
                class="mt-50"
              >
                Excel
              </b-form-checkbox>
            </div>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Selecciona la Orientación"
          >
            <b-form-radio
              v-model="orientationSelected"
              value="p"
              class="mt-50"
            >
              Vertical
            </b-form-radio>
            <div class="demo-inline-spacing mb-75">
              <b-form-radio
                v-model="orientationSelected"
                value="l"
                class="mt-50"
              >
                Horizontal
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
              :options="['Todos los datos', 'Con filtro actual']"
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
            <div class="list-group-item checkbox-grid">
              <template v-for="(column, index) in columnsAvailableForExport">
                <b-form-checkbox
                  v-if="column.field !== 'action'"
                  :key="column.field"
                  v-model="columnsSelected"
                  :value="{ index, field: column.field, label: column.label }"
                  class="mt-50"
                >
                  {{ column.label }}
                </b-form-checkbox>
              </template>
            </div>
          </b-form-group>
        </b-col>

      </b-row>

      <template #modal-footer>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          :disabled="!documentTypesSelected.length || !columnsSelected.length || loadingDowloand"
          @click="dowloandDataInDocument"
        >
          <template v-if="!loadingDowloand">
            <feather-icon
              icon="DownloadIcon"
              class="mr-25"
            />
            Descargar
          </template>
          <template v-else>
            <b-spinner
              small
              class="mr-50"
            />
            Descargando...
          </template>
        </b-button>
      </template>

    </b-modal>
    <b-button
      v-if="dataForExport.data.length && columnsAvailableForExport.length && urlForExportData"
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
import {
  BRow, BCol, BModal, BFormGroup, BButton, BFormCheckbox, BFormRadio, BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import useFetch from '@/hooks/useFetch'
import useExportPdf from '@/hooks/useExportPdf'

export default {
  name: 'ExportTable',
  components: {
    BRow,
    BCol,
    BModal,
    BFormGroup,
    BButton,
    BFormCheckbox,
    BFormRadio,
    BSpinner,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup(props, context) {
    const loadingDowloand = ref(false)
    const documentTypesSelected = ref(['PDF'])
    const orientationSelected = ref('p')
    const numberOfRecordsToExport = ref('Con filtro actual')
    const dataForExport = inject('data', [{ data: [] }])
    const urlForExportData = inject('urlForExportData', null)
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
    const dataForSendToExport = ref([])
    const columnsAvailableForExport = inject('columnsAvailableForExport', [])
    const columnsSelected = ref([])
    const titleForPdf = inject('titleForPdf', 'Listado')

    const openModalExportData = () => {
      context.refs['modal-export'].show()
    }

    const dowloandDataInDocument = async () => {
      loadingDowloand.value = true
      try {
        const { columnFilters } = serverParams.value
        const { field, value } = columnFilters
        const urlWithFilters = `${urlForExportData}&campofiltro=${field}&filtro=${value}`
        const url = numberOfRecordsToExport.value === 'Con filtro actual' ? urlWithFilters : urlForExportData
        const { error, data } = await useFetch(url)
        columnsSelected.value.sort((n1, n2) => n1.index - n2.index)
        if (error) {
          throw error
        } else if (data) {
          if (numberOfRecordsToExport.value === 'Con filtro actual' && serverParams.value.columnFilters.field) {
            useExportPdf(columnsSelected.value, data, titleForPdf, orientationSelected.value, true, serverParams.value.columnFilters)
          } else {
            useExportPdf(columnsSelected.value, data, titleForPdf, orientationSelected.value)
          }
        }
      } catch (error) {
        messageToast('danger', 'Error', 'Error al momento de obtener todos los datos')
      }
      loadingDowloand.value = false
    }

    return {
      openModalExportData,
      documentTypesSelected,
      orientationSelected,
      numberOfRecordsToExport,
      dataForExport,
      urlForExportData,
      dowloandDataInDocument,
      dataForSendToExport,
      columnsAvailableForExport,
      columnsSelected,
      loadingDowloand,
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
