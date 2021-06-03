<template>
  <div>
    <!-- Cabecera de botones para la Tabla -->
    <div
      v-if="headerButtonsEnabled"
      class="custom-search d-flex justify-content-between mb-1 flex-wrap"
    >
      <!-- Proporcionando una ranura al componente que lo utilice para definir su propia cabecera de botónes, ya que por defecto viene con los botones nuevos, exportar y buscar que se definieron en este mismo componente -->
      <slot name="replaceFefaultHeaderButtonsTable">
        <div
          class="d-flex align-items-start"
        >
          <!-- Botón para abrir el modal de registrar -->
          <b-button
            v-if="buttonCreate"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="openModal"
          >
            <feather-icon
              icon="PlusCircleIcon"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">
              Nuevo
            </span>
          </b-button>
        </div>
        <div class="d-flex">
          <!-- Botón desplegable para exportar en documentos -->
          <b-dropdown
            v-if="exportExcel || exportPdf"
            id="dropdown-right"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            right
            variant="primary"
            class="mr-1"
          >
            <template #button-content>
              <feather-icon
                icon="ExternalLinkIcon"
                class="mr-0 mr-sm-50"
              />
              <span class="d-none d-sm-inline">
                Exportar
              </span>
            </template>

            <!-- Botón (Componente personalizado) para exportar en Excel -->
            <export-excel v-if="exportExcel" />

            <!-- Botón (componente personalizado) para abrir un modal -->
            <export-pdf v-if="exportPdf" />
          </b-dropdown>

          <!-- Botón para abrir el modal de busqueda -->
          <b-button
            v-if="buttonSearch"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="openModalSearch"
          >
            <feather-icon
              icon="FilterIcon"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">
              Filtrar
            </span>
          </b-button>
        </div>
      </slot>
    </div>

    <!-- Tabla en modo Remoto (Servidor) -->
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="dataTable.data"
      :rtl="direction"
      :is-loading="dataTable.loading"
      class="vgt-table condensed"
      :search-options="{
        enabled: true,
        externalQuery: serverParams.columnFilters }"
      :pagination-options="{
        enabled: paginationEnable,
      }"
      :sort-options="{
        enabled: false,
      }"
      :total-rows="dataTable.totalRecords"
      @on-page-change="onPageChange"
      @on-per-page-change="onPageChange"
      @on-row-click="onRowClick"
    >
      <!-- Usando ranura "loadingContent(contenido de carga)" de vue-good-table para mostrar una svg al momento de regrescar -->
      <template slot="loadingContent">
        <img
          width="30"
          src="@/assets/images/loaders/circles.svg"
          class="m-0 p-0"
        >
      </template>

      <!-- Usando ranura "emptystate (tabla vacia)" de vue-good-table para mostrar un mensaje cuando no encuentre datos para el listado -->
      <div
        slot="emptystate"
        class="text-center p-2"
      >
        <small v-if="!dataTable.loading">
          No se encontraron resultados
        </small>
      </div>

      <!-- Usando ranura "table-row (fila de la tabla)" de vue-good-table para personalizar las columnas de una fila -->
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Proporcionando una ranura al componente que lo utilice para que pueda personalizar las columnas que desee -->
        <slot
          name="custom"
          :props="props"
        />

        <!-- Verificamos si existe la columna de activo -->
        <span v-if="props.column.field === 'activo'">
          <b-badge :variant="props.row.activo ? 'light-success' : 'light-danger'">
            {{ props.row.activo ? 'Activo' : 'Desactivo' }}
          </b-badge>
        </span>

        <!-- Verificamos si existe la columna de acción -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <!-- Creando una lista despegable para las acciones -->
            <b-dropdown
              v-if="dropDownActionsTable"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>

              <!-- Elemento del despegable para cambiar el estado de la fila -->
              <b-dropdown-item
                v-if="buttonStatus"
                @click="changeStatus(props.row)"
              >
                <feather-icon
                  :icon="props.row.activo ? 'SlashIcon' : 'CheckCircleIcon'"
                  class="mr-50"
                />
                <span>{{ props.row.activo ? 'Desactivar' : 'Activar' }}</span>
              </b-dropdown-item>

              <!-- Elemento del despegable para editar el registro de la fila -->
              <b-dropdown-item
                v-if="buttonEdit"
                @click="openModalForEdit(props.row)"
              >
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Editar</span>
              </b-dropdown-item>

              <!-- Proporcionando una ranura al componente que lo utilice para que pueda personalizar añadir mas elementos despegables y permitar agregar una accion -->
              <slot
                name="options-row"
                :props="props"
              />

              <!-- Elemento del despegable para eliminar el registro de la fila -->
              <b-dropdown-item
                v-if="buttonDelete"
                @click="deleteRow(props.row)"
              >
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Eliminar</span>
              </b-dropdown-item>
            </b-dropdown>
            <template v-else>
              <b-button
                v-if="buttonStatus"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="flat-primary"
                title="Eliminar"
                class="btn-icon rounded-circle"
                @click="changeStatus(props.row)"
              >
                <feather-icon :icon="props.row.activo ? 'SlashIcon' : 'CheckCircleIcon'" />
              </b-button>

              <b-button
                v-if="buttonEdit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="flat-warning"
                title="Eliminar"
                class="btn-icon rounded-circle"
                @click="openModalForEdit(props.row)"
              >
                <feather-icon icon="Edit2Icon" />
              </b-button>

              <slot
                name="options-row"
                :props="props"
              />

              <b-button
                v-if="buttonDelete"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="flat-danger"
                title="Eliminar"
                class="btn-icon rounded-circle"
                @click="deleteRow(props.row)"
              >
                <feather-icon icon="Trash2Icon" />
              </b-button>
            </template>
          </span>
        </span>

      </template>

      <!-- Paginación de la tabla (solo se mostrara cuando la prop "paginationEnable" tenga el valor de true (que es el valor por defecto), de no querer mostrar la paginación, el componente que lo utilice deberá enviar una prop "paginationEnable" con el valor de false) -->
      <template
        v-if="paginationEnable"
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">

          <!-- Sección para seleccionar por cuantos registros se listara -->
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Listar
            </span>
            <b-form-select
              v-model="serverParams.perPage"
              :options="['5','10','15' ,'20']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> por página</span>
          </div>

          <!-- Sección de la paginación -->
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="serverParams.perPage"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="16"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="16"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject } from '@vue/composition-api'
import {
  BPagination, BFormSelect, BDropdown, BDropdownItem, VBModal, BButton, BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import useFetch from '@/hooks/useFetch'
import ExportPdf from './ExportPdf.vue'
import ExportExcel from './ExportExcel.vue'

export default {
  name: 'TableComponent',
  components: {
    VueGoodTable,
    BPagination,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    BBadge,
    ExportPdf,
    ExportExcel,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    // Props definidas para el componente con sus valores por defecto
    headerButtonsEnabled: {
      type: Boolean,
      default: true,
    },
    buttonCreate: {
      type: Boolean,
      default: true,
    },
    buttonSearch: {
      type: Boolean,
      default: true,
    },
    exportExcel: {
      type: Boolean,
      default: false,
    },
    exportPdf: {
      type: Boolean,
      default: false,
    },
    dropDownActionsTable: {
      type: Boolean,
      default: true,
    },
    buttonStatus: {
      type: Boolean,
      default: true,
    },
    buttonEdit: {
      type: Boolean,
      default: true,
    },
    buttonDelete: {
      type: Boolean,
      default: true,
    },
    paginationEnable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dir: false,
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  setup(props, context) {
    // Inyectando variables o funciones que me provee un componente superior
    const columns = inject('columns', []) // Arreglo de las columnas de la tabla
    const dataTable = inject('data', {
      data: [],
      loading: false,
      totalRecords: 0,
    }) // Objeto reactivo con los datos de la tabla
    const row = inject('row', null) // Objeto reactivo con propiedades de un nuevo registro
    const resetRow = inject('resetRow', null) // Función para resetear el valor de la variable row
    const url = inject('url', null) // String de la ruta para gestionar la eliminacion, actualización, activar, desactivar
    const serverParams = inject('serverParams', null) // Objeto con los parametros de busqueda
    const loadTable = inject('loadTable', null) // Funcion para cargar la tabla
    const idModal = inject('idModal', null) // String con id del Modal que abrira el botón nuevo, actualizar
    const loadDataForRegister = inject('loadDataForRegister', null) // Funcion que se ejecutara antes de abrir el formulario para registrar (Pre-cargado)
    const loadDataForEdit = inject('loadDataForEdit', null) // Función que se ejecutara antes de abrir el formulario para editar (Pre-cargado)
    const messageToast = inject('messageToast') // Función para mostrar una notificación
    const confirmSwal = inject('confirmSwal') // Función para confirmar una acción

    // Funcion para abrir el modal para registrar
    const openModal = async () => {
      if (idModal && resetRow) {
        // Resetear el estado de un nuevo registro
        resetRow()
        // Verificar si el componente padre proporciono (provide) una funcion loadDataForRegister
        if (loadDataForRegister) {
          const result = await loadDataForRegister()
          if (result) {
            context.root.$bvModal.show(idModal)
          }
        } else {
          context.root.$bvModal.show(idModal)
        }
      }
    }

    // Función para abrir el modal para editar un registro
    const openModalForEdit = async rowSelected => {
      if (idModal && resetRow && loadDataForEdit) {
        // Resetear el estado para volver a rellenar con los valores de la fila seleccionada
        resetRow()
        const result = await loadDataForEdit(rowSelected, row)
        if (result) {
          context.root.$bvModal.show(idModal)
        }
      }
    }

    // Función para abrir el modal de busqueda
    const openModalSearch = () => {
      if (idModal) {
        context.root.$bvModal.show(`${idModal}-search`)
      }
    }

    // Función para actualizar los server params
    const updateParams = newProps => {
      if (serverParams) {
        serverParams.value = { ...serverParams.value, ...newProps }
      }
    }

    // Función para ejecutar cuando se cambia de página
    const onPageChange = params => {
      if (serverParams && loadTable) {
        if (serverParams.value.page !== params.currentPage) {
          updateParams({ page: params.currentPage, perPage: params.currentPerPage })
          loadTable()
        } else if (params.currentPage === 1) {
          updateParams({ page: params.currentPage, perPage: params.currentPerPage })
          loadTable()
        }
      }
    }

    // Función para que el componente al momento de dar click en una fila emita un evento y lo pueda utilizar un componente superior
    const onRowClick = params => {
      context.emit('on-row-click', params)
    }

    // Función para actualizar el estado
    const changeStatus = async rowSelected => {
      if (row && loadTable && resetRow) {
        const { value } = await confirmSwal(`Desea ${rowSelected.activo ? 'desactivar' : 'activar'} este registro?`, '¿Está seguro de hacer esto?', `¡Si, ${rowSelected.activo ? 'desactivalo' : 'activalo'}!`)
        if (value) {
          row.value._id = rowSelected._id
          row.value.accion = 4
          row.value.idUsuario = store.state.auth.user._id
          const { error, data } = await useFetch(url, row.value, 'POST')
          if (error) {
            messageToast('danger', 'Error', 'Ocurrio un error')
          } else {
            data.forEach(({ id, mensaje }) => {
              if (id === 0) {
                messageToast('warning', 'Advertencia', mensaje)
              } else {
                messageToast('success', 'Exitoso', mensaje)
                loadTable()
              }
            })
          }
          resetRow()
        }
      }
    }

    // Función para eliminar el registro seleccionado
    const deleteRow = async rowSelected => {
      if (row && loadTable) {
        const { value } = await confirmSwal('Desea eliminar el registro?', '¡No podrás revertir esto!', '¡Si, eliminalo!')
        if (value) {
          const { error: errorGet, data: dataGet } = await useFetch(`${url}/${rowSelected._id}`)
          if (errorGet) {
            messageToast('danger', 'Error', 'Ocurrio un error')
          } else {
            row.value = { ...dataGet }
            row.value._id = rowSelected._id
            row.value.accion = 3
            row.value.idUsuario = store.state.auth.user._id
            const { error: errorPost, data: dataPost } = await useFetch(url, row.value, 'POST')
            if (errorPost) {
              messageToast('danger', 'Error', 'Ocurrio un error')
            } else {
              dataPost.forEach(({ id, mensaje }) => {
                if (id === 0) {
                  messageToast('warning', 'Advertencia', mensaje)
                } else {
                  messageToast('success', 'Exitoso', mensaje)
                  loadTable()
                }
              })
            }
          }
        }
      }
    }

    // Retornar solo las variables reactivas y funciones que se utilizaran en el template del componente
    return {
      columns,
      dataTable,
      serverParams,
      openModal,
      openModalForEdit,
      openModalSearch,
      onPageChange,
      onRowClick,
      changeStatus,
      deleteRow,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-good-table.scss';
  th span,
  td span {
    font-size: 12px !important;
  }
  [dir] .vgt-table.condensed td, [dir] .vgt-table.condensed th.vgt-row-header {
    padding: 0.1em 0.4em;
  }
  .vgt-loading .vgt-center-align {
    margin-top: 0;
    top: 40%;
    transform: translateY(-50%);
  }
</style>
