<template>
  <div>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between mb-1 flex-wrap">
      <div
        class="d-flex align-items-start"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="openModal"
        >
          Nuevo
        </b-button>
      </div>
      <div>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="openModalSearch"
        >
          Buscar Por ...
        </b-button>
      </div>
    </div>

    <!-- table -->
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
        enabled: true,
      }"
      :total-rows="dataTable.totalRecords"
      @on-page-change="onPageChange"
      @on-per-page-change="onPageChange"
    >
      <template slot="loadingContent">
        <img
          width="30"
          src="@/assets/images/loaders/circles.svg"
          class="m-0 p-0"
        >
      </template>
      <div
        slot="emptystate"
        class="text-center p-2"
      >
        <small v-if="!dataTable.loading">
          No se encontraron resultados
        </small>
      </div>
      <template
        slot="table-row"
        slot-scope="props"
      >

        <slot
          name="custom"
          :props="props"
        />
        <!-- Column: Status -->
        <span v-if="props.column.field === 'activo'">
          <b-badge :variant="props.row.activo ? 'light-success' : 'light-danger'">
            {{ props.row.activo ? 'Activo' : 'Desactivo' }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
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
              <b-dropdown-item @click="changeStatus(props.row)">
                <feather-icon
                  :icon="props.row.activo ? 'SlashIcon' : 'CheckCircleIcon'"
                  class="mr-50"
                />
                <span>{{ props.row.activo ? 'Desactivar' : 'Activar' }}</span>
              </b-dropdown-item>
              <b-dropdown-item @click="openModalForEdit(props.row)">
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Editar</span>
              </b-dropdown-item>
              <b-dropdown-item @click="deleteRow(props.row)">
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Eliminar</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>

        <!-- Column: Common
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span> -->
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Listar
            </span>
            <b-form-select
              v-model="serverParams.perPage"
              :options="['3','5','10','20']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> por página</span>
          </div>
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
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
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
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
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
    const columns = inject('columns')
    const dataTable = inject('data')
    const row = inject('row')
    const resetRow = inject('resetRow')
    const url = inject('url')
    const serverParams = inject('serverParams')
    const loadTable = inject('loadTable')
    const idModal = inject('idModal')
    const loadDataForRegister = inject('loadDataForRegister', null)
    const loadDataForEdit = inject('loadDataForEdit')
    const messageToast = inject('messageToast')
    const confirmSwal = inject('confirmSwal')

    const openModal = async () => {
      resetRow()
      if (loadDataForRegister) {
        const result = await loadDataForRegister()
        if (result) {
          context.root.$bvModal.show(idModal)
        }
      } else {
        context.root.$bvModal.show(idModal)
      }
    }

    const openModalForEdit = async rowSelected => {
      resetRow()
      const result = await loadDataForEdit(rowSelected, row)
      if (result) {
        context.root.$bvModal.show(idModal)
      }
    }

    const openModalSearch = () => {
      context.root.$bvModal.show(`${idModal}-search`)
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    // const onPerPageChange = params => {
    //   updateParams({ perPage: params.currentPerPage })
    //   loadTable()
    // }

    // const onPageChange = params => {
    //   updateParams({ page: params.currentPage })
    //   loadTable()
    // }

    const onPageChange = params => {
      if (serverParams.value.page !== params.currentPage) {
        updateParams({ page: params.currentPage, perPage: params.currentPerPage })
        loadTable()
      } else if (params.currentPage === 1) {
        updateParams({ page: params.currentPage, perPage: params.currentPerPage })
        loadTable()
      }
    }

    const changeStatus = async rowSelected => {
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

    const deleteRow = async rowSelected => {
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

    return {
      columns,
      dataTable,
      serverParams,
      openModal,
      openModalForEdit,
      openModalSearch,
      // onPerPageChange,
      onPageChange,
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
