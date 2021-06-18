/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import store from '@/store'
import axios from 'axios'

// Creando funcion para exportar PDF ya sea por descarga o impresión
// Recibe 7 parámetros
/*
  1.- El modo de exportacion (download || print)
  2.- Columnas que se van a imprimir
  3.- Arreglo de objetos donde se encuentran los datos a exportar
  4.- Titulo que aparecera en el Reporte
  5.- Orientación (p = vertical || l = horizontal)
  6.- Variable serverParams para verificar si tiene filtros, subtitle
*/

const useExportPdf = (mode = 'download', columns = [], dataExport = [], title = 'LISTADO', orientation = 'p', serverParams, subtitle) => {
  // Creando la instancia
  const doc = new jsPDF(orientation, 'pt', 'a4')
  // Modificar los valores de las columna de estado para mostrar activo si es true y desactivo si es false
  const body = dataExport.map(row => ({ ...row, activo: row.activo ? 'ACTIVO' : 'DESACTIVO' }))
  // Formater valores de columnas en base al tipo de dato que tienen
  body.forEach(row => {
    columns.forEach(column => {
      if (column.type === 'boolean') {
        row[column.dataKey] = row[column.dataKey] ? 'SI' : 'NO'
      }
      if (column.type === 'numberMoney') {
        row[column.dataKey] = `S./ ${row[column.dataKey].toFixed(2)}`
      }
    })
  })

  // Crear ancho de las 4 columnas con las que se manejaran los pdf
  const partColumn = doc.internal.pageSize.getWidth() / 4 - 80
  const lineHeight = 12

  // ==================================================================================
  // ================================ PRIMERA LINEA ===================================
  // ==================================================================================

  const topFirstLine = 40

  let linesUsedInFirstRow = 1

  doc.setFont('times')
  doc.setFontSize(8)
  doc.setTextColor('#444')
  const nameCompany = 'SISTEMAS INTEGRADOS Y MERCADEO S.A.C.'
  const linesUsedInNameCompany = Math.ceil(doc.getTextWidth(nameCompany) / partColumn)
  if (linesUsedInNameCompany > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInNameCompany

  doc.setFont('times')
  doc.setFontSize(9)
  doc.setTextColor('#222')
  const titleDocument = title
  const linesUsedInTitleDocument = Math.ceil(doc.getTextWidth(titleDocument) / (partColumn * 2))
  if (linesUsedInTitleDocument > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInTitleDocument

  doc.setFont('times')
  doc.setFontSize(8)
  doc.setTextColor('#444')
  const date = `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`
  const linesUsedInDate = Math.ceil(doc.getTextWidth(date) / partColumn)
  if (linesUsedInDate > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInDate

  // ==================================================================================
  // ================================ SEGUNDA LINEA ===================================
  // ==================================================================================

  let topSecondLine = topFirstLine

  if (linesUsedInFirstRow === 1) topSecondLine += 18
  else topSecondLine += (lineHeight * linesUsedInFirstRow)

  let linesUsedInSecondRow = 1

  doc.setFont('times')
  doc.setFontSize(8)
  doc.setTextColor('#444')
  const userName = `USUARIO: ${store.state.auth.user.usuario.toString().toUpperCase()}`
  const linesUsedInUserName = Math.ceil(doc.getTextWidth(userName) / partColumn)
  if (linesUsedInUserName > linesUsedInSecondRow) linesUsedInSecondRow = linesUsedInUserName

  if (subtitle) {
    doc.setFont('times')
    doc.setFontSize(9)
    doc.setTextColor('#333')
    const linesUsedInSubTitle = Math.ceil(doc.getTextWidth(subtitle) / (partColumn * 2))
    if (linesUsedInSubTitle > linesUsedInSecondRow) linesUsedInSecondRow = linesUsedInSubTitle
  }

  // ==================================================================================
  // ================================ TERCERA LINEA ===================================
  // ==================================================================================

  let topThirdLine = topSecondLine

  if (linesUsedInSecondRow === 1) topThirdLine += 18
  else topThirdLine += lineHeight * linesUsedInSecondRow

  let linesUsedInThirdRow = 1

  let topFourLine = topThirdLine

  let descriptionFilters = ''
  if (serverParams) {
    descriptionFilters = `FILTROS: ${serverParams.field} (${serverParams.value})`
    doc.setFont('times')
    doc.setFontSize(8)
    doc.setTextColor('#444')
    const lineUsedInDescriptionFilters = Math.ceil(doc.getTextWidth(descriptionFilters) / (partColumn * 4))
    if (lineUsedInDescriptionFilters > linesUsedInThirdRow) linesUsedInThirdRow = lineUsedInDescriptionFilters
    if (linesUsedInThirdRow === 1) topFourLine += 18
    else topFourLine += (lineHeight * linesUsedInThirdRow)
  }

  autoTable(doc, {
    headStyles: {
      font: 'times',
      fontSize: 7,
      textColor: '#444',
      lineColor: '#888',
      lineWidth: 1,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'times',
      fontSize: 7,
      fillColor: '#FFF',
      lineWidth: 0,
    },
    theme: 'plain',
    margin: {
      bottom: 60,
      top: topFourLine,
    },
    columns,
    body,
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage(data) {
      // ==================================================================================
      // ================================ PRIMERA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(nameCompany, 40, topFirstLine, {
        maxWidth: partColumn,
      })

      // Centro
      doc.setFont('times')
      doc.setFontSize(9)
      doc.setTextColor('#222')
      doc.text(title.toUpperCase(), doc.internal.pageSize.getWidth() / 2, topFirstLine, {
        maxWidth: partColumn * 2,
        align: 'center',
      })

      // Derecha
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(date, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(date), topFirstLine, {
        maxWidth: partColumn,
      })

      // ==================================================================================
      // ================================ SEGUNDA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(userName, 40, topSecondLine, {
        maxWidth: partColumn,
      })

      // Centro
      if (subtitle) {
        doc.setFont('times')
        doc.setFontSize(9)
        doc.setTextColor('#333')
        doc.text(subtitle.toUpperCase(), doc.internal.pageSize.getWidth() / 2, topSecondLine, {
          maxWidth: partColumn * 2,
          align: 'center',
        })
      }

      // Derecha
      const paginador = `PÁGINA ${data.pageNumber}`
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(paginador, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(paginador), topSecondLine, {
        maxWidth: partColumn,
      })

      // ==================================================================================
      // ================================ TERCERA LINEA ===================================
      // ==================================================================================

      if (serverParams) {
        doc.setFont('times')
        doc.setFontSize(8)
        doc.setTextColor('#444')
        doc.text(descriptionFilters, 40, topThirdLine, {
          maxWidth: partColumn * 4,
        })
      }

      // ==================================================================================
      // ================================ PIE DE PÁGINA ===================================
      // ==================================================================================

      doc.line(40, doc.internal.pageSize.getHeight() - 52, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 52, 'DF')
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#222')
      doc.text(`CÓDIGO: ${store.state.auth.user.secret}`, 40, doc.internal.pageSize.getHeight() - 38)
    },
  })
  if (mode === 'download') {
    doc.save(`SISTEMAS INTEGRADOS Y MERCADEO S.A.C. ${title} ${date}.pdf`)
  } else if (mode === 'print') {
    // doc.autoPrint()
    // doc.output('dataurlnewwindow', { filename: `SISTEMAS INTEGRADOS Y MERCADEO S.A.C. ${title} ${date}.pdf` })
    // const blob = doc.output('blob')
    // window.open(URL.createObjectURL(blob), '_blank')

    // Codigo para generar base64 del pdf
    const dataUriString = doc.output('datauristring')
    const positionBase64 = dataUriString.indexOf('base64,')
    const base64Pdf = dataUriString.substring(positionBase64 + 7)
    // Realizar una peticion POST donde se encuentra instalada la impresora enviando el pdf en base64
    axios.post('http://192.168.1.4:3333/api/print', {
      pdfBase64: base64Pdf,
    })
      .then(console.log)
      .catch(console.log)
  }
}

// Exportar la funcion
export default useExportPdf
