<template>
  <div>
    <modal-article />
    <modal-search-article />
    <b-card>
      <table-articles />
    </b-card>
  </div>
</template>

<script>
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import ModalArticle from './ModalArticle.vue'
import ModalSearchArticle from './ModalSearchArticle.vue'
import TableArticles from './TableArticles.vue'
import useVariables from './useVariables'

export default {
  name: 'Articles',
  components: {
    BCard,
    ModalArticle,
    ModalSearchArticle,
    TableArticles,
  },
  setup() {
    const {
      articles, article, resetArticle, selectedStockOrService, resetSelectedStockOrService, featuresArticle, resetFeaturesArticle, featureArticle, resetFeatureArticle, serverParams, combos, resetCombos, optionsColumnsFilter,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadArticles = async () => {
      articles.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/articulos/?_id=0&tabla=articulos&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los artículos')
      } else if (data) {
        articles.value.data = data
        articles.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) articles.value.totalRecords = data[0].numberRow
        }
      }
      articles.value.loading = false
    }

    const loadFeaturesArticleByArticleId = async articleId => {
      featuresArticle.value.loading = true
      const url = `/ACaracteristica/?_id=0&tabla=ARTICULOCARACTERISTICA&campo=a.idarticulo&indice=${articleId}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los características')
      } else {
        featuresArticle.value.data = data
      }
      featuresArticle.value.loading = false
    }

    onMounted(() => {
      loadArticles()
      loadComboBoxes(combos.value, ['productTypes'], '/combo/tipoproducto/1', 'Error al momento de cargar los Tipos de Producto')
      loadComboBoxes(combos.value, ['unitGroup'], '/combo/grupounidad/0', 'Error al momento de cargar las Unidades de Grupo')
      loadComboBoxes(combos.value, ['features'], '/combo/caracteristica/1', 'Error al momento de cargar las Características')
    })

    provide('articles', articles)
    provide('loadArticles', loadArticles)
    provide('article', article)
    provide('resetArticle', resetArticle)
    provide('featuresArticle', featuresArticle)
    provide('resetFeaturesArticle', resetFeaturesArticle)
    provide('loadFeaturesArticleByArticleId', loadFeaturesArticleByArticleId)
    provide('featureArticle', featureArticle)
    provide('resetFeatureArticle', resetFeatureArticle)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
    provide('combos', combos)
    provide('resetCombos', resetCombos)
    provide('selectedStockOrService', selectedStockOrService)
    provide('resetSelectedStockOrService', resetSelectedStockOrService)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
