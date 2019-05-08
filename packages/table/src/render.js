import UtilTools from '../../../src/tools/utils'

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRender (h, attrs, editRender, params) {
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
      return defaultRender(h, { type: 'text' }, editRender, params)
    }
  },
  textarea: {
    autofocus: 'input.vxe-textarea',
    renderEdit (h, editRender, params) {
      return defaultRender(h, null, editRender, params)
    }
  }
}

export default renderMap
