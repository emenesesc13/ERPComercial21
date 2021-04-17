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
import { provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import ModalArticle from './ModalArticle.vue'
import ModalSearchArticle from './ModalSearchArticle.vue'
import TableArticles from './TableArticles.vue'
import useArticles from './useArticles'
import useVariables from './useVariables'

export default {
  name: 'Articles',
  components: {
    BCard,
    ModalArticle,
    ModalSearchArticle,
    TableArticles,
  },
  setup(props, context) {
    const {
      articles, article, resetArticle, serverParams, combos, resetCombos, optionsColumnsFilter,
    } = useVariables()

    const messageToast = (variant, title, message) => {
      context.root.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
      })
    }

    const {
      getArticles,
    } = useArticles()

    const loadArticles = async () => {
      articles.value.loading = true
      const { data, error } = await getArticles(serverParams.value)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los artículos')
      } else {
        articles.value.data = data
        articles.value.totalRecords = 0
        if (data.length > 0) {
          articles.value.totalRecords = data[0].numberRow
        }
      }
      articles.value.loading = false
    }

    const loadCombo = async (combosForLoad = [], functionLoad, messageError, ...parametes) => {
      combosForLoad.forEach(combo => {
        combos.value[combo].loading = true
        combos.value[combo].disabled = true
      })
      const { data, error } = await functionLoad(...parametes)
      if (error) {
        messageToast('danger', 'Error', messageError)
      } else {
        combosForLoad.forEach(combo => {
          combos.value[combo].data = data
        })
      }
      combosForLoad.forEach(combo => {
        combos.value[combo].loading = false
        combos.value[combo].disabled = false
      })
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPerPageChange = params => {
      updateParams({ perPage: Number(params.currentPerPage) })
      loadArticles()
    }

    const onPageChange = params => {
      updateParams({ page: Number(params.currentPage) })
      loadArticles()
    }

    loadArticles()

    provide('articles', articles)
    provide('loadArticles', loadArticles)
    provide('article', article)
    provide('resetArticle', resetArticle)
    provide('serverParams', serverParams)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('loadCombo', loadCombo)
    provide('messageToast', messageToast)
    provide('combos', combos)
    provide('resetCombos', resetCombos)
    provide('onPerPageChange', onPerPageChange)
    provide('onPageChange', onPageChange)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
