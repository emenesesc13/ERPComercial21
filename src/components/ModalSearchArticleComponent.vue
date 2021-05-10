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
            v-model="serverParams.columnFilters.value"
            placeholder="Escribe 2 letras o más para buscar"
            @keypress.native="searchArticle"
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
        <!-- Column: Common -->
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
  inject, onMounted, provide, ref,
} from '@vue/composition-api'
import useFetch from '@/hooks/useFetch'
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
    const timeForLoad = 1000
    const messageToast = inject('messageToast')
    const tableInfo = ref({
      data: [],
      loading: false,
      totalRecords: 0,
    })
    const serverParams = ref({
      columnFilters: {
        field: 'a.nombre',
        value: '',
      },
      page: 1,
      perPage: 10,
    })
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

    const loadArticles = async () => {
      tableInfo.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/articulos/?_id=0&tabla=articulos&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los artículos')
      } else if (data) {
        tableInfo.value.data = data
        if (data?.length) {
          if (data[0]?.numberRow) tableInfo.value.totalRecords = data[0].numberRow
        }
      }
      tableInfo.value.loading = false
    }

    const searchArticle = async () => {
      tableInfo.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        loadArticles()
      }, timeForLoad)
    }

    const onRowClick = ({ row }) => {
      context.emit('selected-article', row)
      context.root.$bvModal.hide('modal-search-article-component')
    }

    onMounted(() => {
      loadArticles()
    })

    provide('loadTable', loadArticles)
    provide('columns', columns)
    provide('data', tableInfo)

    return {
      serverParams,
      searchArticle,
      onRowClick,
    }
  },
}
</script>
