<template>
  <b-modal
    id="modal-search-article-component"
    hide-footer
    modal-class="modal-primary"
    centered
    title="Buscar Articulo"
    size="lg"
  >
    <b-row>
      <b-col
        cols="12"
        md="4"
      >
        <b-form-group
          label="Campo"
          label-for="field"
        >
          <v-select
            v-model="serverParamsSearchArticle.columnFilters.field"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="option => option.field"
            label="title"
            :options="optionsColumnsFilter"
            :clearable="false"
            @option:selected="searchColumnFilter"
          />
        </b-form-group>
      </b-col>
      <b-col
        cols="12"
        md="8"
      >
        <b-form-group
          label="Buscador"
          label-for="value"
        >
          <b-form-input
            id="value"
            ref="serverParamsValueArticle"
            v-model="serverParamsSearchArticle.columnFilters.value"
            placeholder="Escribe el nombre del articulo para buscar"
            @keyup="searchArticle"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <table-component
      :buttons-enabled="false"
      class="mb-2"
      :clickable="true"
      @on-row-click="onRowClick"
    >
      <template #custom="{ props }">
        <span class="d-block p-75">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </table-component>
  </b-modal>

</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BRow, BCol, BFormGroup, BFormInput, BModal,
} from 'bootstrap-vue'
import {
  inject, provide,
} from '@vue/composition-api'
import vSelect from 'vue-select'
import TableComponent from './TableComponent.vue'

export default {
  name: 'ModalSearchArticleComponent',
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BModal,
    TableComponent,
    vSelect,
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500
    // const messageToast = inject('messageToast')
    const tableInfo = inject('tableInfo')
    const loadArticlesForSearch = inject('loadArticlesForSearch')
    const serverParamsSearchArticle = inject('serverParamsSearchArticle')
    const columns = [
      {
        label: 'Id',
        field: '_id',
      },
      {
        label: 'Articulo',
        field: 'nombre',
      },
    ]

    const optionsColumnsFilter = [
      {
        title: 'Id',
        field: 'a._id',
      },
      {
        title: 'SKU',
        field: 'sku',
      },
      {
        title: 'Nombre',
        field: 'a.nombre',
      },
      {
        title: 'Tipo de Producto',
        field: 'a.nombreTipoProducto',
      },
      {
        title: 'Grupo Unidad',
        field: 'a.nombreGrupoUnidad',
      },
      {
        title: 'Unidad Venta',
        field: 'a.nombreUnidadVenta',
      },
    ]

    const searchArticle = async () => {
      tableInfo.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        loadArticlesForSearch()
      }, timeForLoad)
    }

    const searchColumnFilter = async () => {
      serverParamsSearchArticle.value.columnFilters.value = ''
      await searchArticle()
      context.refs.serverParamsValueArticle.focus()
    }

    const onRowClick = ({ row }) => {
      context.emit('selected-article', row)
      context.root.$bvModal.hide('modal-search-article-component')
    }

    provide('loadTable', loadArticlesForSearch)
    provide('columns', columns)
    provide('data', tableInfo)
    provide('serverParams', serverParamsSearchArticle)

    return {
      serverParamsSearchArticle,
      optionsColumnsFilter,
      searchArticle,
      searchColumnFilter,
      onRowClick,
    }
  },
}
</script>
