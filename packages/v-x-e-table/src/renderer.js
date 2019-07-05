import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRenderer (h, attrs, editRender, params) {
  let { $table, column } = params
  let { name } = editRender
  let { model } = column
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: {
        value: model.value
      },
      on: {
        input (evnt) {
          let cellValue = evnt.target.value
          model.update = true
          model.value = cellValue
          // UtilTools.setCellValue(row, column, evnt.target.value)
          $table.updateStatus(params, cellValue)
        }
      }
    })
  ]
}

const rowHeight = 24
const _storeMap = {
  input: {
    autofocus: 'input',
    renderEdit (h, editRender, params) {
      return defaultRenderer(h, { type: 'text' }, editRender, params)
    }
  },
  textarea: {
    autofocus: 'textarea',
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
      let { model } = column
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
              value: model.value
            },
            on: {
              input (evnt) {
                let inpElem = evnt.target
                model.update = true
                model.value = inpElem.value
                if (inpElem.scrollHeight > inpElem.offsetHeight) {
                  if (uploadRows.indexOf(row) === -1) {
                    inpElem.style.width = `${inpElem.offsetWidth + 20}px`
                  } else {
                    inpElem.style.height = `${inpElem.scrollHeight}px`
                  }
                }
              },
              change (evnt) {
                if (uploadRows.indexOf(row) === -1) {
                  uploadRows.push(row)
                }
              },
              keydown (evnt) {
                let inpElem = evnt.target
                if (evnt.altKey && evnt.keyCode === 13) {
                  evnt.preventDefault()
                  evnt.stopPropagation()
                  let rangeData = DomTools.getCursorPosition(inpElem)
                  let pos = rangeData.end
                  let cellValue = inpElem.value
                  cellValue = `${cellValue.slice(0, pos)}\n${cellValue.slice(pos, cellValue.length)}`
                  inpElem.value = cellValue
                  model.update = true
                  model.value = cellValue
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
            innerHTML: XEUtils.escape(UtilTools.getCellValue(row, column)).replace(/\n/g, '<br>')
          }
        })
      ]
    }
  }
}

/**
 * 全局渲染器
 */
export const Renderer = {
  mixin (map) {
    XEUtils.each(map, (options, name) => Renderer.add(name, options))
    return Renderer
  },
  get (name) {
    return _storeMap[name] || null
  },
  add (name, options) {
    if (name && options) {
      let renders = _storeMap[name]
      if (renders) {
        Object.assign(renders, options)
      } else {
        _storeMap[name] = options
      }
    }
    return Renderer
  },
  delete (name) {
    delete _storeMap[name]
    return Renderer
  }
}

export default Renderer
