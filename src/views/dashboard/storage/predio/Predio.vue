<template>
  <div>
    <!-- Modal de Registro / Actualizacion -->
    <modal-predio />
    <!-- Modal de Busqueda -->
    <modal-search-predio />
    <b-card>
      <!-- Tabla de Predio -->
      <table-predio />
    </b-card>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
// Importar dependencias del componente
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import store from '@/store'
import TablePredio from './TablePredio.vue'
import ModalSearchPredio from './ModalSearchPredio.vue'
import useVariables from './useVariables'
import ModalPredio from './ModalPredio.vue'

export default {
  name: 'Predio',
  components: {
    // Instalar componentes a utilizar
    BCard,
    TablePredio,
    ModalSearchPredio,
    ModalPredio,
  },
  setup() {
    // Obtener valores de la funcion useVariables()
    const {
      predios, predio, resetPredio, ubigeoSelected, resetUbigeoSelected, combos, resetCombo, optionsColumnsFilter, serverParams,
    } = useVariables()
    // Inyectar funciones que nos provee un componente superior
    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    // Funcion asincrona para cargar los predios
    const loadPredios = async () => {
      // Activar el loader
      predios.value.loading = true
      // Capturar los filtros por columna, pagina, por pagina
      const { columnFilters, page, perPage } = serverParams.value
      // Capturar el campo y valor del filtro
      const { field, value } = columnFilters
      // Crear la url para la peticion
      let url = `/predio/?_id=0&tabla=predios&idUsuario=${store.state.auth.user._id}&idNegocio=${0}&pinicio=${page}&pfin=${perPage}`
      // Verificar si tiene un campo de filtro, de ser asi agregar en la url
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      // Realizar la peticion
      const { data, error } = await useFetch(url)
      if (error) {
        // Si hay un error mostrar una notificacion
        messageToast('danger', 'Error', 'Error al momento de cargar los predios')
      } else if (data) {
        // Cargar los datos a la variable del listado
        predios.value.data = data
        predios.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) predios.value.totalRecords = data[0].numberRow
        }
      }
      predios.value.loading = false
    }

    // Ciclo de vida cuando se monta el componente
    onMounted(() => {
      // Cargar los predios
      loadPredios()
      // Cargar el combo de departamento
      loadComboBoxes(combos.value, ['departament'], '/ComboUbigeo/Departamento', 'Ocurrio un Error al momento de cargar los Departamentos')
    })

    // Proveer variables o funciones para los componentes hijos
    provide('predios', predios)
    provide('loadPredios', loadPredios)
    provide('predio', predio)
    provide('ubigeoSelected', ubigeoSelected)
    provide('resetUbigeoSelected', resetUbigeoSelected)
    provide('combos', combos)
    provide('resetCombo', resetCombo)
    provide('resetPredio', resetPredio)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
