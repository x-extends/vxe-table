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
            UtilTools.setCellValue(row, column, cellValue)
            $table.updateStatus(params, cellValue)
          }
        }
      })
    ])
  ]
}

function renderOptgroups (h, editRender, params) {
  let { optionGroups, optionGroupProps = {} } = editRender
  let groupOptions = optionGroupProps.options || 'options'
  let groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map((group, gIndex) => {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderOptions(h, group[groupOptions], editRender, params))
  })
}

function renderOptions (h, options, editRender, params) {
  let { optionProps = {} } = editRender
  let { row, column } = params
  let labelProp = optionProps.label || 'label'
  let valueProp = optionProps.value || 'value'
  return options.map((item, index) => {
    return h('option', {
      domProps: {
        value: item[valueProp],
        selected: item.value === UtilTools.getCellValue(row, column)
      },
      key: index
    }, item[labelProp])
  })
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
  },
  select: {
    renderEdit (h, editRender, params) {
      let { options, optionGroups } = editRender
      let { $table, row, column } = params
      return [
        h('select', {
          class: 'vxe-default-select',
          on: {
            change (evnt) {
              let cellValue = evnt.target.value
              UtilTools.setCellValue(row, column, cellValue)
              $table.updateStatus(params, cellValue)
            }
          }
        },
        optionGroups ? renderOptgroups(h, editRender, params) : renderOptions(h, options, editRender, params))
      ]
    },
    renderCell (h, editRender, params) {
      let { options, optionGroups, optionProps = {}, optionGroupProps = {} } = editRender
      let { row, column } = params
      let cellValue = XEUtils.get(row, column.property)
      if (!(cellValue === null || cellValue === undefined || cellValue === '')) {
        let selectItem
        let labelProp = optionProps.label || 'label'
        let valueProp = optionProps.value || 'value'
        if (optionGroups) {
          let groupOptions = optionGroupProps.options || 'options'
          for (let index = 0; index < optionGroups.length; index++) {
            selectItem = optionGroups[index][groupOptions].find(item => item[valueProp] === cellValue)
            if (selectItem) {
              break
            }
          }
          return selectItem ? selectItem[labelProp] : null
        } else {
          selectItem = options.find(item => item[valueProp] === cellValue)
          return selectItem ? selectItem[labelProp] : null
        }
      }
      return ''
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
