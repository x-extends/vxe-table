import UtilTools from '../../../tools/utils'

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRenderer (h, attrs, editRender, params) {
  let { row, column } = params
  let { name } = editRender
  return [
    h('div', {
      class: ['vxe-input--wrapper']
    }, [
      h(name, {
        class: [`vxe-${name}`],
        attrs,
        domProps: {
          value: UtilTools.getCellValue(row, column.property)
        },
        on: {
          input (evnt) {
            UtilTools.setCellValue(row, column.property, evnt.target.value)
          }
        }
      })
    ])
  ]
}

const renderMap = {
  input: {
    autofocus: 'input.vxe-input',
    renderEdit (h, editRender, params) {
      return defaultRenderer(h, { type: 'text' }, editRender, params)
    }
  },
  textarea: {
    autofocus: 'input.vxe-textarea',
    renderEdit (h, editRender, params) {
      return defaultRenderer(h, null, editRender, params)
    }
  }
}

export default renderMap
