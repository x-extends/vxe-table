import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

const rowHeight = 24

export default {
  cell: {
    autofocus: '.vxe-textarea',
    renderEdit (h, editRender, params, { $excel }) {
      const { excelStore } = $excel
      const { uploadRows } = excelStore
      const { row, column } = params
      return [
        h('div', {
          class: 'vxe-input--wrapper vxe-excel-cell',
          style: {
            height: `${column.renderHeight}px`
          }
        }, [
          h('textarea', {
            class: 'vxe-textarea',
            style: {
              width: `${column.renderWidth}px`
            },
            domProps: {
              value: UtilTools.getCellValue(row, column)
            },
            on: {
              input (evnt) {
                const inpElem = evnt.target
                UtilTools.setCellValue(row, column, inpElem.value)
                if (inpElem.scrollHeight > inpElem.offsetHeight) {
                  if (uploadRows.indexOf(row) === -1) {
                    inpElem.style.width = `${inpElem.offsetWidth + 20}px`
                  } else {
                    inpElem.style.height = `${inpElem.scrollHeight}px`
                  }
                }
              },
              change (evnt) {
                UtilTools.setCellValue(row, column, evnt.target.value)
                if (uploadRows.indexOf(row) === -1) {
                  uploadRows.push(row)
                }
              },
              keydown (evnt) {
                const inpElem = evnt.target
                if (evnt.altKey && evnt.keyCode === 13) {
                  evnt.preventDefault()
                  evnt.stopPropagation()
                  const rangeData = DomTools.getCursorPosition(inpElem)
                  let pos = rangeData.end
                  let cellValue = inpElem.value
                  cellValue = `${cellValue.slice(0, pos)}\n${cellValue.slice(pos, cellValue.length)}`
                  inpElem.value = cellValue
                  UtilTools.setCellValue(row, column, cellValue)
                  inpElem.style.height = `${(Math.floor(inpElem.offsetHeight / rowHeight) + 1) * rowHeight}px`
                  setTimeout(() => {
                    rangeData.start = rangeData.end = ++pos
                    DomTools.setCursorPosition(inpElem, rangeData)
                  })
                }
              }
            }
          })
        ])
      ]
    },
    renderCell (h, editRender, params) {
      const { row, column } = params
      return [
        h('span', {
          domProps: {
            innerHTML: XEUtils.escape(UtilTools.getCellValue(row, column)).replace(/\n/g, '<br>')
          }
        })
      ]
    }
  }
}
