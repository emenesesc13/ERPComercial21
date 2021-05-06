<template>
  <div>
    <b-modal
      id="modal-export"
      ref="modal-export"
      centered
      title="Exportar en PDF"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-row>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Selecciona la Orientación"
          >
            <div class="demo-inline-spacing mb-75">
              <b-form-radio
                v-model="orientationSelected"
                value="p"
                class="mt-50"
              >
                Vertical
              </b-form-radio>
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
          cols="12"
        >
          <b-form-group
            label="¿Qué datos deseas exportar?"
          >
            <v-select
              id="count"
              v-model="exportWithFilters"
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
          cols="12"
        >
          <b-form-group
            label="Selecciona las Columnas"
          >
            <div class="list-group list-group-flush checkbox-grid p-2 border">
              <template v-for="(column) in columns">
                <b-form-checkbox
                  v-if="column.field !== 'action'"
                  :key="column.field"
                  v-model="column.pdf"
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
          :disabled="loadingDowloand"
          @click="dowloandPdf"
        >
          <template v-if="!loadingDowloand">
            <feather-icon
              icon="PrinterIcon"
              class="mr-25"
            />
            Imprimir
          </template>
          <template v-else>
            <b-spinner
              small
              class="mr-50"
            />
            Cargando...
          </template>
        </b-button>
      </template>

    </b-modal>
    <b-button
      v-if="columns.length && urlForExportData"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="openModalExportData"
    >
      <feather-icon
        icon="ClipboardIcon"
        class="mr-0 mr-sm-50"
      />
      <span class="d-none d-sm-inline">
        PDF
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
  name: 'ExportPdf',
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
    const messageToast = inject('messageToast')
    const titleForExport = inject('titleForExport', 'Listado')
    const orientationSelected = ref('p')
    const exportWithFilters = ref('Con filtro actual')
    const urlForExportData = inject('urlForExportData', null)
    const serverParams = inject('serverParams')
    const columns = inject('columns', null)
    const dataExport = ref([])
    const loadingDowloand = ref(false)

    const openModalExportData = () => {
      context.refs['modal-export'].show()
    }

    const dowloandPdf = async () => {
      loadingDowloand.value = true
      try {
        const { columnFilters } = serverParams.value
        const { field, value } = columnFilters
        const urlWithFilters = `${urlForExportData}&campofiltro=${field}&filtro=${value}`
        const url = exportWithFilters.value === 'Con filtro actual' ? urlWithFilters : urlForExportData
        const { error, data } = await useFetch(url)
        if (error) {
          throw error
        } else if (data) {
          if (data.length) {
            const columnsSelected = columns.filter(column => column.pdf)
            const renameColumns = columnsSelected.map(column => ({ header: column.label, dataKey: column.field, type: column.type }))
            dataExport.value = data
            if (exportWithFilters.value === 'Con filtro actual' && serverParams.value.columnFilters.field) {
              useExportPdf(renameColumns, dataExport.value, titleForExport, orientationSelected.value, serverParams.value.columnFilters)
            } else {
              useExportPdf(renameColumns, dataExport.value, titleForExport, orientationSelected.value)
            }
          } else {
            messageToast('warning', 'Advertencia', 'No hay datos para exportar')
          }
        }
      } catch (error) {
        messageToast('danger', 'Error', 'Error al momento de obtener los datos')
      }
      loadingDowloand.value = false
    }

    return {
      openModalExportData,
      orientationSelected,
      exportWithFilters,
      dataExport,
      urlForExportData,
      dowloandPdf,
      columns,
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
