<template>
  <!-- Modal para buscar articulos -->
  <b-modal
    id="modal-search-article-component"
    hide-footer
    modal-class="modal-primary modal--padding"
    centered
    title="Buscar Articulo"
    size="lg"
  >
    <b-row>
      <!-- Campo de busqueda -->
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
      <!-- Valor de busqueda -->
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

    <!-- Tabla con datos y paginación -->
    <table-component
      :header-buttons-enabled="false"
      class="mb-2"
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
// Importar dependecias del componente
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
    // Registrar componentes a utilizar
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BModal,
    TableComponent,
    vSelect,
  },
  setup(props, context) {
    // Crear variables
    let timer = null
    const timeForLoad = 500
    // const messageToast = inject('messageToast')
    // Inyectar variables o funciones que me provee un componente superior
    const tableInfo = inject('tableInfo')
    const loadArticlesForSearch = inject('loadArticlesForSearch')
    const serverParamsSearchArticle = inject('serverParamsSearchArticle')

    // Columnas a mostrar en la tabla
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

    // Columnas permitidas para el filtro
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

    // Funcipon asincrona para buscar
    const searchArticle = async () => {
      // Asignar que la pagina siempre sea 1
      serverParamsSearchArticle.value.page = 1
      // Activar el loader
      tableInfo.value.loading = true
      // Limpiar el intervalo de tiempo
      clearTimeout(timer)
      // Ejecutar el intervalo de tiempo con la funcion loadArticlesForSearch
      timer = setTimeout(() => {
        loadArticlesForSearch()
      }, timeForLoad)
    }

    // Función asincrona para buscar por filtros
    const searchColumnFilter = async () => {
      serverParamsSearchArticle.value.page = 1
      serverParamsSearchArticle.value.columnFilters.value = ''
      await searchArticle()
      context.refs.serverParamsValueArticle.focus()
    }

    // Emitir una funcion cuando el usuario da click en una fila y enviar como parametro los datos de la fila seleccionada
    const onRowClick = ({ row }) => {
      context.emit('selected-article', row)
      context.root.$bvModal.hide('modal-search-article-component')
    }

    // Proveer funciones y variables a los componentes hijos como TableComponent
    provide('loadTable', loadArticlesForSearch)
    provide('columns', columns)
    provide('data', tableInfo)
    provide('serverParams', serverParamsSearchArticle)

    // Retornar variables y funciones que se utilizaran en el template
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
