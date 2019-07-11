import XEUtils from 'xe-utils'

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
          $table.updateStatus(params, cellValue)
        }
      }
    })
  ]
}

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
      return defaultRenderer(h, {}, editRender, params)
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
