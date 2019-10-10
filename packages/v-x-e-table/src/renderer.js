import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools } from '../../tools'

function getAttrs ({ name, attrs }) {
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

function isSyncCell (renderOpts, params, context) {
  return renderOpts.type === 'visible' || context.$type === 'cell'
}

/**
 * 内置渲染器
 * 支持原生的 input、textarea、select
 */
function defaultEditRender (h, renderOpts, params, context) {
  let { row, column } = params
  let { name } = renderOpts
  let attrs = getAttrs(renderOpts)
  let cellValue = isSyncCell(renderOpts, params, context) ? UtilTools.getCellValue(row, column) : column.model.value
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: {
        value: cellValue
      },
      on: getEvents(renderOpts, params, context)
    })
  ]
}

function getEvents (renderOpts, params, context) {
  let { name, events } = renderOpts
  let { $table, row, column } = params
  let { model } = column
  let isSelect = name === 'select'
  let type = isSelect ? 'change' : 'input'
  let on = {
    [type] (evnt) {
      let cellValue = evnt.target.value
      if (isSyncCell(renderOpts, params, context)) {
        UtilTools.setCellValue(row, column, cellValue)
      } else {
        model.update = true
        model.value = cellValue
        $table.updateStatus(params, cellValue)
      }
    }
  }
  if (events) {
    XEUtils.assign(on, XEUtils.objectMap(events, cb => function () {
      cb.apply(null, [params].concat.apply(params, arguments))
    }))
  }
  return on
}

function renderOptgroups (h, renderOpts, params, context) {
  let { optionGroups, optionGroupProps = {} } = renderOpts
  let groupOptions = optionGroupProps.options || 'options'
  let groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map((group, gIndex) => {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderOptions(h, group[groupOptions], renderOpts, params, context))
  })
}

function renderOptions (h, options, renderOpts, params, context) {
  let { optionProps = {} } = renderOpts
  let { row, column } = params
  let labelProp = optionProps.label || 'label'
  let valueProp = optionProps.value || 'value'
  let disabledProp = optionProps.value || 'disabled'
  let cellValue = isSyncCell(renderOpts, params, context) ? UtilTools.getCellValue(row, column) : column.model.value
  return options.map((item, index) => {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        selected: item[valueProp] === cellValue
      },
      key: index
    }, item[labelProp])
  })
}

function getFilterEvents (item, renderOpts, params, context) {
  let { column } = params
  let { events } = renderOpts
  let type = name === 'select' ? 'change' : 'input'
  let on = {
    [type] (evnt) {
      item.data = evnt.target.value
      handleConfirmFilter(context, column, !!item.data, item)
    }
  }
  if (events) {
    XEUtils.assign(on, XEUtils.objectMap(events, cb => function () {
      cb.apply(null, [params].concat.apply(params, arguments))
    }))
  }
  return on
}

function defaultFilterRender (h, renderOpts, params, context) {
  let { column } = params
  let { name } = renderOpts
  let attrs = getAttrs(renderOpts)
  return column.filters.map(item => {
    return h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: {
        value: item.data
      },
      on: getFilterEvents(item, renderOpts, params, context)
    })
  })
}

function handleConfirmFilter (context, column, checked, item) {
  context[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item)
}

function defaultFilterMethod ({ option, row, column }) {
  let { data } = option
  let cellValue = XEUtils.get(row, column.property)
  /* eslint-disable eqeqeq */
  return cellValue == data
}

function renderSelectEdit (h, renderOpts, params, context) {
  return [
    h('select', {
      class: 'vxe-default-select',
      on: getEvents(renderOpts, params, context)
    },
    renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params, context) : renderOptions(h, renderOpts.options, renderOpts, params, context))
  ]
}

const renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  select: {
    renderEdit: renderSelectEdit,
    renderDefault: renderSelectEdit,
    renderCell (h, renderOpts, params, context) {
      let { options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts
      let { row, column } = params
      let cellValue = XEUtils.get(row, column.property)
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
        return selectItem ? selectItem[labelProp] : cellValue
      } else {
        selectItem = options.find(item => item[valueProp] === cellValue)
        return selectItem ? selectItem[labelProp] : cellValue
      }
    },
    renderFilter (h, renderOpts, params, context) {
      let { column } = params
      let { attrs } = renderOpts
      return column.filters.map(item => {
        return h('select', {
          class: 'vxe-default-select',
          attrs,
          on: getFilterEvents(item, renderOpts, params, context)
        },
        renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: defaultFilterMethod
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
    return renderMap[name] || null
  },
  add (name, options) {
    if (name && options) {
      let renders = renderMap[name]
      if (renders) {
        Object.assign(renders, options)
      } else {
        renderMap[name] = options
      }
    }
    return Renderer
  },
  delete (name) {
    delete renderMap[name]
    return Renderer
  }
}

export default Renderer
