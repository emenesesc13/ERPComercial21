<template>
  <fragment>
    <b-dropdown-item
      v-if="newColumns.length && urlForExportData"
      @click="dowloandExcel"
    >
      <span>Excel</span>
    </b-dropdown-item>
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
    const messageToast = inject('messageToast')
    const dataExport = ref([])
    const titleForExport = inject('titleForExport', 'Listado')
    const urlForExportData = inject('urlForExportData', null)
    const columns = inject('columns', null)
    let newColumns = []

    if (columns) {
      newColumns = columns.filter(column => column.field !== 'action')
    }

    const dowloandExcel = async () => {
      const { error, data } = await useFetch(urlForExportData)
      if (error) {
        messageToast('warning', 'Advertencia', 'Error al momento de obtener los datos')
      } else if (data) {
        if (data.length) {
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
          messageToast('warning', 'Advertencia', 'No hay datos para exportar')
        }
      }
    }

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
