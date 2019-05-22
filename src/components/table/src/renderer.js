import XEUtils from 'xe-utils'
import UtilTools from '../../../tools/utils'
import DomTools from '../../../tools/dom'

const rowHeight = 24

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRenderer (h, attrs, editRender, params) {
  let { $table, row, column } = params
  let { name } = editRender
  return [
    h('div', {
      class: 'vxe-input--wrapper'
    }, [
      h(name, {
        class: `vxe-${name}`,
        attrs,
        domProps: {
          value: UtilTools.getCellValue(row, column.property)
        },
        on: {
          input (evnt) {
            UtilTools.setCellValue(row, column.property, evnt.target.value)
            $table.updateStatus(params)
          }
        }
      })
    ])
  ]
}

const renderMap = {
  input: {
    autofocus: '.vxe-input',
    renderEdit (h, editRender, params) {
      return defaultRenderer(h, { type: 'text' }, editRender, params)
    }
  },
  textarea: {
    autofocus: '.vxe-textarea',
    renderEdit (h, editRender, params) {
      return defaultRenderer(h, null, editRender, params)
    }
  },
  cell: {
    autofocus: '.vxe-textarea',
    renderEdit (h, editRender, params, { $excel }) {
      let { excelStore } = $excel
      let { uploadRows } = excelStore
      let { row, column } = params
      return [
        h('div', {
          class: 'vxe-input--wrapper vxe-excel-cell',
          style: {
            height: `${column.renderHeight - 1}px`
          }
        }, [
          h('textarea', {
            class: 'vxe-textarea',
            style: {
              width: `${column.renderWidth}px`
            },
            domProps: {
              value: UtilTools.getCellValue(row, column.property)
            },
            on: {
              input (evnt) {
                let inpElem = evnt.target
                UtilTools.setCellValue(row, column.property, evnt.target.value)
                if (inpElem.scrollHeight > inpElem.offsetHeight) {
                  if (uploadRows.indexOf(row) === -1) {
                    inpElem.style.width = `${inpElem.offsetWidth + 20}px`
                  } else {
                    inpElem.style.height = `${inpElem.scrollHeight}px`
                  }
                }
              },
              change () {
                if (uploadRows.indexOf(row) === -1) {
                  uploadRows.push(row)
                }
              },
              keydown (evnt) {
                let inpElem = evnt.target
                if (evnt.altKey && evnt.keyCode === 13) {
                  evnt.preventDefault()
                  evnt.stopPropagation()
                  let value = inpElem.value
                  let rangeData = DomTools.getCursorPosition(inpElem)
                  let pos = rangeData.end
                  UtilTools.setCellValue(row, column.property, `${value.slice(0, pos)}\n${value.slice(pos, value.length)}`)
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
      let { row, column } = params
      return [
        h('span', {
          domProps: {
            innerHTML: XEUtils.escape(UtilTools.getCellValue(row, column.property)).replace(/\n/g, '<br>')
          }
        })
      ]
    }
  }
}

export default renderMap
