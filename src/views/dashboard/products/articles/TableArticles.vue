<template>
  <table-component
    :export-pdf="true"
    :export-excel="true"
  >
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
    const articles = inject('articles')
    const loadFeaturesArticleByArticleId = inject('loadFeaturesArticleByArticleId')
    const loadRecetasArticleByArticleId = inject('loadRecetasArticleByArticleId')
    const loadArticles = inject('loadArticles')
    const resetArticle = inject('resetArticle')
    const resetFeatureArticle = inject('resetFeatureArticle')
    const resetFeaturesArticle = inject('resetFeaturesArticle')
    const resetRecetaArticle = inject('resetRecetaArticle')
    const resetRecetasArticle = inject('resetRecetasArticle')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
    const combos = inject('combos')
    const tabIndex = inject('tabIndex')
    const resetCombos = inject('resetCombos')
    const loadComboBoxes = inject('loadComboBoxes')

    const columns = [
      {
        label: 'Acción',
        field: 'action',
        width: '69px',
        thClass: 'align-middle text-center',
        pdf: false,
      },
      {
        label: 'Id',
        field: '_id',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Nombre',
        field: 'nombre',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Tipo',
        field: 'nombreTipoProducto',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Unidad',
        field: 'nombreGrupoUnidad',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Precio Venta',
        field: 'precioVenta',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
        formatFn: value => `S/. ${value.toFixed(2)}`,
        pdf: true,
        type: 'numberMoney',
      },
      {
        label: 'Precio min. Venta',
        field: 'precioMinimoVenta',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
        formatFn: value => `S/. ${value.toFixed(2)}`,
        pdf: true,
        type: 'numberMoney',
      },
      {
        label: 'Stock',
        field: 'flgStock',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
        type: 'boolean',
      },
      {
        label: 'Servicio',
        field: 'flgServicio',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
        type: 'boolean',
      },
      {
        label: 'Stock min.',
        field: 'stockMinimo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
        pdf: true,
      },
      {
        label: 'Stock max.',
        field: 'stockMaximo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-right',
        pdf: true,
      },
      {
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
      },
    ]

    const idModal = 'modal-article'
    const url = '/articulos'

    const loadDataForRegister = async () => {
      tabIndex.value = 0
      resetFeatureArticle()
      resetCombos(['valuesByFeature', 'unitMeasure'])
      resetFeaturesArticle()
      resetRecetaArticle()
      resetRecetasArticle()
      await loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/grupounidad/${article.value.idGrupoUnidad}`, 'Error al momento de cargar las Unidades por Grupo')
      return true
    }

    const loadDataForEdit = async (rowSelected, row) => {
      tabIndex.value = 0
      resetFeatureArticle()
      resetRecetaArticle()
      resetCombos(['valuesByFeature', 'unitMeasure'])
      const { error, data } = await useFetch(`/articulos/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = { ...row.value, ...data }
      if (row.value.flgStock) row.value.flgSelected = 'stock'
      else if (row.value.flgServicio) row.value.flgSelected = 'servicio'
      else if (row.value.flgReceta) row.value.flgSelected = 'receta'
      row.value.nombreGrupoUnidad = rowSelected.nombreGrupoUnidad

      await loadComboBoxes(combos.value, ['inventoryUnit', 'unitSale'], `/combo/grupounidad/${row.value.idGrupoUnidad}`, 'Error al momento de cargar las Unidades por Grupo')
      await loadFeaturesArticleByArticleId(row.value._id)
      await loadRecetasArticleByArticleId(row.value._id)
      return true
    }

    const urlForExportData = '/articulos/?_id=0&tabla=articulos'

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

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Reporte de Artículos')
  },
}
</script>
