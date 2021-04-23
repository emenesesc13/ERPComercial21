<template>
  <table-component>
    <template #custom="{ props }">
      <!-- Column: flgStock -->
      <span v-if="props.column.field === 'flgStock'">
        <b-badge :variant="props.row.flgStock ? 'light-success' : 'light-danger'">
          <feather-icon :icon="props.row.flgStock ? 'CheckIcon' : 'SlashIcon'" />
        </b-badge>
      </span>
      <!-- Column: flgServicio -->
      <span v-else-if="props.column.field === 'flgServicio'">
        <b-badge :variant="props.row.flgServicio ? 'light-success' : 'light-danger'">
          <feather-icon :icon="props.row.flgServicio ? 'CheckIcon' : 'SlashIcon'" />
        </b-badge>
      </span>
    </template>
  </table-component>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import useFetch from '@/hooks/useFetch'
import TableComponent from '@/components/TableComponent.vue'
import { BBadge } from 'bootstrap-vue'

export default {
  name: 'TableArticles',
  components: {
    TableComponent,
    BBadge,
  },
  setup() {
    const article = inject('article')
    const selectedStockOrService = inject('selectedStockOrService')
    const articles = inject('articles')
    const loadFeaturesArticleByArticleId = inject('loadFeaturesArticleByArticleId')
    const loadArticles = inject('loadArticles')
    const resetArticle = inject('resetArticle')
    const resetFeatureArticle = inject('resetFeatureArticle')
    const resetFeaturesArticle = inject('resetFeaturesArticle')
    const resetSelectedStockOrService = inject('resetSelectedStockOrService')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
    const combos = inject('combos')
    const resetCombos = inject('resetCombos')
    const loadComboBoxes = inject('loadComboBoxes')

    const columns = [
      {
        label: 'Acción',
        field: 'action',
        width: '85px',
        thClass: 'align-middle',
      },
      {
        label: 'Id',
        field: '_id',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Nombre',
        field: 'nombre',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Tipo',
        field: 'nombreTipoProducto',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Unidad',
        field: 'nombreGrupoUnidad',
        thClass: 'align-middle',
        tdClass: 'align-middle',
      },
      {
        label: 'Precio Venta',
        field: 'precioVenta',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
        formatFn: value => `S/. ${value.toFixed(2)}`,
      },
      {
        label: 'Precio min. Venta',
        field: 'precioMinimoVenta',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
        formatFn: value => `S/. ${value.toFixed(2)}`,
      },
      {
        label: 'Stock',
        field: 'flgStock',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
      },
      {
        label: 'Servicio',
        field: 'flgServicio',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
      },
      {
        label: 'Stock min.',
        field: 'stockMinimo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
      },
      {
        label: 'Stock max.',
        field: 'stockMaximo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
      },
      {
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
      },
    ]

    const idModal = 'modal-article'
    const url = '/articulos'

    const loadDataForRegister = async () => {
      resetFeatureArticle()
      resetCombos(['valuesByFeature'])
      resetFeaturesArticle()
      resetSelectedStockOrService()
      await loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/grupounidad/${article.value.idGrupoUnidad}`, 'Error al momento de cargar las Unidades por Grupo')
      return true
    }

    const loadDataForEdit = async (rowSelected, row) => {
      resetFeatureArticle()
      resetCombos(['valuesByFeature'])
      const { error, data } = await useFetch(`/articulos/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = data
      selectedStockOrService.value = row.value.flgStock ? 'stock' : 'service'

      await loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/grupounidad/${row.value.idGrupoUnidad}`, 'Error al momento de cargar las Unidades por Grupo')
      await loadFeaturesArticleByArticleId(row.value._id)
      return true
    }

    provide('columns', columns)
    provide('data', articles)
    provide('row', article)
    provide('resetRow', resetArticle)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadArticles)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)
    provide('loadDataForRegister', loadDataForRegister)
  },
}
</script>
