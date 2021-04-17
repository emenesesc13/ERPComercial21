<template>
  <b-table
    ref="refArticlesTable"
    class="position-relative"
    :items="articles"
    responsive
    :fields="tableColumns"
    primary-key="_id"
    show-empty
    empty-text="No se encontraros resultados"
  >

    <!-- Column: Status -->
    <template #cell(activo)="data">
      <b-badge
        pill
        :variant="data.item.activo ? 'light-success' : 'light-danger'"
        class="text-capitalize"
      >
        {{ data.item.activo ? 'Activo' : 'Desactivo' }}
      </b-badge>
    </template>

    <!-- Column: Actions -->
    <template #cell(actions)>
      <b-dropdown
        variant="link"
        no-caret
        :right="$store.state.appConfig.isRTL"
      >

        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="16"
            class="align-middle text-body"
          />
        </template>

        <b-dropdown-item :to="{ name: 'articles' }">
          <feather-icon icon="EditIcon" />
          <span class="align-middle ml-50">Edit</span>
        </b-dropdown-item>

        <b-dropdown-item>
          <feather-icon icon="TrashIcon" />
          <span class="align-middle ml-50">Delete</span>
        </b-dropdown-item>
      </b-dropdown>
    </template>

  </b-table>
</template>

<script>
import {
  BTable, BBadge, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'

export default {
  components: {
    BTable,
    BBadge,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      tableColumns: [
        {
          key: 'actions',
          label: 'Acción',
        },
        {
          key: 'nombre',
          label: 'Nombre',
          sortable: true,
        },
        {
          key: 'nombreTipoProducto',
          label: 'Tipo de Producto',
          sortable: true,
        },
        {
          key: 'nombreGrupoUnidad',
          label: 'Unidad',
          sortable: true,
        },
        {
          key: 'precioVenta',
          label: 'Precio de Venta',
          sortable: true,
        },
        {
          key: 'precioMinimoVenta',
          label: 'Precio minimo de Venta',
          sortable: true,
        },
        {
          key: 'stockMinimo',
          label: 'Stock minimo',
          sortable: true,
        },
        {
          key: 'stockMaximo',
          label: 'Stock maximo',
          sortable: true,
        },
        {
          key: 'activo',
          label: 'Estado',
          sortable: true,
        },
      ],
    }
  },
  setup() {
    const articles = inject('articles')

    return {
      articles,
    }
  },
}
</script>

<style>

</style>
