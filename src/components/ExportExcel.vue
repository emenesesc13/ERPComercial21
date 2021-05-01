<template>
  <div>
    <b-button
      v-if="newColumns.length && urlForExportData"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="dowloandExcel"
    >
      <feather-icon
        icon="FileTextIcon"
        class="mr-0 mr-sm-50"
      />
      <span class="d-none d-sm-inline">
        Excel
      </span>
    </b-button>
    <vue-excel-xlsx
      ref="exportExcel"
      class="d-none"
      :data="dataExport"
      :columns="newColumns"
      :filename="titleForExport"
      :sheetname="titleForExport"
    />
  </div>
</template>

<script>
import { ref, inject } from '@vue/composition-api'
import { BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ExportExcel',
  components: {
    BButton,
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
          dataExport.value = data
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
