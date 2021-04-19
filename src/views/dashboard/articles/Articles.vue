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
import { onMounted, provide } from '@vue/composition-api'
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
  setup(props, context) {
    const {
      articles, article, resetArticle, serverParams, combos, resetCombos, featureSelected, valueSelected, optionsColumnsFilter,
    } = useVariables()

    const messageToast = (variant, title, message) => {
      context.root.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
      })
    }

    const loadArticles = async () => {
      articles.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/articulos/?_id=0&tabla=articulos&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
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

    const loadCombos = async (combosForLoad = [], url, messageError) => {
      combosForLoad.forEach(combo => {
        combos.value[combo].loading = true
        combos.value[combo].disabled = true
      })
      const { data, error } = await useFetch(url)
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

    onMounted(() => {
      loadArticles()
      loadCombos(['productTypes'], '/combo/tipoproducto/1', 'Error al momento de cargar los Tipos de Producto')
      loadCombos(['unitGroup'], '/combo/grupounidad/0', 'Error al momento de cargar las Unidades de Grupo')
      loadCombos(['features'], '/combo/caracteristica/1', 'Error al momento de cargar las Características')
    })

    provide('articles', articles)
    provide('loadArticles', loadArticles)
    provide('article', article)
    provide('resetArticle', resetArticle)
    provide('serverParams', serverParams)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('loadCombo', loadCombo)
    provide('loadCombos', loadCombos)
    provide('messageToast', messageToast)
    provide('combos', combos)
    provide('resetCombos', resetCombos)
    provide('featureSelected', featureSelected)
    provide('valueSelected', valueSelected)
    provide('onPerPageChange', onPerPageChange)
    provide('onPageChange', onPageChange)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
