<template>
  <fragment>
    <!-- Elemento despegable para descargar excel -->
    <b-dropdown-item
      v-if="newColumns.length && urlForExportData"
      @click="dowloandExcel"
    >
      <span>Excel</span>
    </b-dropdown-item>
    <!-- Componente que genera el excel -->
    <vue-excel-xlsx
      ref="exportExcel"
      class="d-none"
      :data="dataExport"
      :columns="newColumns"
      :filename="`SISTEMAS INTEGRADOS Y MERCADEO S.A.C. ${titleForExport} ${(new Date()).toLocaleTimeString()}`"
      :sheetname="titleForExport"
    />
  </fragment>
</template>

<script>
import { ref, inject } from '@vue/composition-api'
import { Fragment } from 'vue-fragment'
import { BDropdownItem } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ExportExcel',
  components: {
    Fragment,
    BDropdownItem,
  },
  directives: {
    Ripple,
  },
  setup(props, context) {
    // INyectando variables reactivas o funciones que nos provee un componente superior
    const messageToast = inject('messageToast')
    const titleForExport = inject('titleForExport', 'Listado')
    const urlForExportData = inject('urlForExportData', null)
    const columns = inject('columns', null)
    // Creando variables
    const dataExport = ref([])
    let newColumns = []

    // Seleccionar todas la columnas excepto la de action
    if (columns) {
      newColumns = columns.filter(column => column.field !== 'action')
    }

    // Función asincrona para descargar el excel
    const dowloandExcel = async () => {
      // Realizar la peticion
      const { error, data } = await useFetch(urlForExportData)
      if (error) {
        // Si hay un error mostrar una notificación
        messageToast('warning', 'Advertencia', 'Error al momento de obtener los datos')
      } else if (data) {
        // Verificar que la data tenga filas
        if (data.length) {
          // Recorrer las filas y formatear los campos dependiendo su tipo
          dataExport.value = data.map(row => {
            const fila = { ...row }
            columns.forEach(col => {
              if (col?.type === 'boolean') {
                fila[col.field] = row[col.field] ? 'SI' : 'NO'
              }
              if (col?.field === 'activo') {
                fila[col.field] = row[col.field] ? 'ACTIVO' : 'DESACTIVO'
              }
            })
            return fila
          })
          setTimeout(() => {
            context.refs.exportExcel.$el.click()
          }, 0)
        } else {
          // Si la data no tiene filas mostrar una notificación
          messageToast('warning', 'Advertencia', 'No hay datos para exportar')
        }
      }
    }

    // Retornar variables y funciones que se utilizaran en el template
    return {
      titleForExport,
      urlForExportData,
      newColumns,
      dataExport,
      dowloandExcel,
    }
  },
}
</script>
