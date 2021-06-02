<template>
  <div>
    <!-- Componente Modal para registro y actualizacion -->
    <modal-business-unit />
    <!-- Componente Modal de busqueda para filtrar los campos -->
    <modal-search-business-unit />
    <b-card>
      <!-- Componente Tabla para mostrar el listado de Unidades de Negocio -->
      <table-business-unit />
    </b-card>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, onMounted, provide } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import store from '@/store'
import TableBusinessUnit from './TableBusinessUnit.vue'
import ModalBusinessUnit from './ModalBusinessUnit.vue'
import ModalSearchBusinessUnit from './ModalSearchBusinessUnit.vue'
import useVariables from './useVariables'

export default {
  name: 'BusinessUnit',
  components: {
    // Instalando los componentes que se van a utilizar en este template
    BCard,
    TableBusinessUnit,
    ModalBusinessUnit,
    ModalSearchBusinessUnit,
  },
  // Funcion setup se ejecuta cuando el componente se crea
  setup() {
    // Desetructuro el objeto que me trae la funcion useVariables(), el cual contiene las variables reactivas y funciones
    const {
      businessUnits, businessUnit, resetBusinessUnit, optionsColumnsFilter, serverParams,
    } = useVariables()

    // Inyectando la funcion messageToast que me provee el cmoponente APP para mostrar mensajes de notificación
    const messageToast = inject('messageToast')

    // Función para listar las unidades de negocio
    const loadBusinessUnits = async () => {
      businessUnits.value.loading = true // Mostrar el loader
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/unidadnegocio/?_id=0&tabla=negocio&idUsuario=${store.state.auth.user._id}&idNegocio=${0}&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}` // verificar si hay filtros para agregarlo a la url
      const { data, error } = await useFetch(url) // Hacer la peticion
      if (error) {
        // Mostrar un mensaje si falla la peticion
        messageToast('danger', 'Error', 'Error al momento de cargar las unidades de negocio')
      } else if (data) {
        // Llenar de datos la variable de la tabla
        businessUnits.value.data = data
        businessUnits.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) businessUnits.value.totalRecords = data[0].numberRow
        }
      }
      businessUnits.value.loading = false // Terminar el loader
    }

    // Ciclo de vida que ocurre cuando el componente esta montado en el DOM
    onMounted(() => {
      // Ejecutar la función de carga
      loadBusinessUnits()
    })

    // Proveer mis variables reactivas y funciones a mis componentes hijos o inferiores
    provide('businessUnits', businessUnits)
    provide('loadBusinessUnits', loadBusinessUnits)
    provide('businessUnit', businessUnit)
    provide('resetBusinessUnit', resetBusinessUnit)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
