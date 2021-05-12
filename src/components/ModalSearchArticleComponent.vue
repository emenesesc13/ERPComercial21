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
      >
        <b-form-group
          label="Buscador"
          label-for="value"
        >
          <b-form-input
            id="value"
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
// import useFetch from '@/hooks/useFetch'
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

    const searchArticle = async () => {
      tableInfo.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        loadArticlesForSearch()
      }, timeForLoad)
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
      searchArticle,
      onRowClick,
    }
  },
}
</script>
