import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

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
          value: UtilTools.getCellValue(row, column)
        },
        on: {
          input (evnt) {
            let cellValue = evnt.target.value
            UtilTools.setCellValue(row, column, evnt.target.value)
            $table.updateStatus(params, cellValue)
          }
        }
      })
    ])
  ]
}

const _storeMap = {
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
