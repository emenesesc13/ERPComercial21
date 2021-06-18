<template>
  <fragment>
    <div>
      <!-- Modal para configurar la exportación -->
      <b-modal
        id="modal-export"
        ref="modal-export"
        centered
        title="Exportar en PDF"
        modal-class="modal-primary modal--padding"
        no-close-on-esc
        no-close-on-backdrop
      >
        <b-row>

          <!-- Orientación del Documento -->
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

          <!-- Datos a exportar (Todos | Filtro Actual) -->
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

          <!-- Columnas a exportar -->
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

        <!-- Sección de botones -->
        <template #modal-footer>

          <!-- Boton imprimir -->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            :disabled="loadingPrint"
            @click="generatePdf('print')"
          >
            <template v-if="!loadingPrint">
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

          <!-- Botón descargar -->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            :disabled="loadingDownload"
            @click="generatePdf('download')"
          >
            <template v-if="!loadingDownload">
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
    </div>
    <!-- Elemento despegable PDF para abrir el modal de exportación -->
    <b-dropdown-item
      v-if="columns.length && urlForExportData"
      @click="openModalExportData"
    >
      <span>PDF</span>
    </b-dropdown-item>
  </fragment>
</template>

<script>
// Importar dependencias del componente
import { ref, inject } from '@vue/composition-api'
import { Fragment } from 'vue-fragment'
import {
  BRow, BCol, BModal, BFormGroup, BButton, BFormCheckbox, BFormRadio, BSpinner, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import useFetch from '@/hooks/useFetch'
import useExportPdf from '@/hooks/useExportPdf'

export default {
  name: 'ExportPdf',
  components: {
    // Registrar componentes a utilizar en el template
    Fragment,
    BRow,
    BCol,
    BModal,
    BFormGroup,
    BButton,
    BFormCheckbox,
    BFormRadio,
    BSpinner,
    BDropdownItem,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup(props, context) {
    // Inyectar variables y funciones que nos provee un componente superior
    const messageToast = inject('messageToast')
    const titleForExport = inject('titleForExport', 'Listado')
    const urlForExportData = inject('urlForExportData', null)
    const serverParams = inject('serverParams')
    const columns = inject('columns', null)
    // Crear varuables reactivas
    const orientationSelected = ref('p')
    const exportWithFilters = ref('Con filtro actual')
    const dataExport = ref([])
    const loadingDownload = ref(false)
    const loadingPrint = ref(false)

    // Funcipn para cerrar el Modal
    const openModalExportData = () => {
      context.refs['modal-export'].show()
    }

    // Función asincrona para generar el PDF
    // Recibe 1 parametro
    /*
      1.- Modo (print || download)
    */
    const generatePdf = async mode => {
      // Verificar el modo y activar el loader
      if (mode === 'download') loadingDownload.value = true
      else if (mode === 'print') loadingPrint.value = true
      try {
        // Armar la url dependiendo si tiene filtros
        const { columnFilters } = serverParams.value
        const { field, value } = columnFilters
        const urlWithFilters = `${urlForExportData}&campofiltro=${field}&filtro=${value}`
        const url = exportWithFilters.value === 'Con filtro actual' ? urlWithFilters : urlForExportData
        // Realizar la peticion
        const { error, data } = await useFetch(url)
        if (error) {
          // Lanzar un error si la peticion fallo
          throw error
        } else if (data) {
          // Verificar que los datos que me trajo la peticion tenga registros
          if (data.length) {
            // Verificar que columnas tienen la propiedad pdf en true
            const columnsSelected = columns.filter(column => column.pdf)
            // Renombrar las columnas para un mejor uso de la libreria jsPDF
            const renameColumns = columnsSelected.map(column => ({ header: column.label, dataKey: column.field, type: column.type }))
            // Asignar el valor de la petición a mi variable reactiva
            dataExport.value = data
            // Verificar que desea exportar con filtros
            if (exportWithFilters.value === 'Con filtro actual' && serverParams.value.columnFilters.field) {
              useExportPdf(mode, renameColumns, dataExport.value, titleForExport, orientationSelected.value, serverParams.value.columnFilters)
            } else {
              useExportPdf(mode, renameColumns, dataExport.value, titleForExport, orientationSelected.value)
            }
          } else {
            // Si no tiene registros la peticion mostrar, una notificacion
            messageToast('warning', 'Advertencia', 'No hay datos para exportar')
          }
        }
      } catch (error) {
        // Si falla algo mostrar una motificación
        messageToast('danger', 'Error', 'Error al momento de obtener los datos')
      }
      // Verificar el modo y desactivar el loader
      if (mode === 'download') loadingDownload.value = false
      else if (mode === 'print') loadingPrint.value = false
    }

    // Retornar las variables y funciones que se utilizaran en el template
    return {
      openModalExportData,
      orientationSelected,
      exportWithFilters,
      dataExport,
      urlForExportData,
      generatePdf,
      columns,
      loadingDownload,
      loadingPrint,
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
