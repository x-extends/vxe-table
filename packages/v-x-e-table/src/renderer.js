import XEUtils from 'xe-utils/methods/xe-utils'

function getAttrs ({ name, attrs }) {
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

/**
 * 内置渲染器
 * 支持原生的 input、textarea、select
 */
function defaultCellRender (h, renderOpts, params) {
  let { column } = params
  let { name } = renderOpts
  let { model } = column
  let attrs = getAttrs(renderOpts)
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: {
        value: model.value
      },
      on: getEvents(renderOpts, params)
    })
  ]
}

function getEvents (renderOpts, params) {
  let { name, events } = renderOpts
  let { $table, column } = params
  let { model } = column
  let type = name === 'select' ? 'change' : 'input'
  let on = {
    [type] (evnt) {
      let cellValue = evnt.target.value
      model.update = true
      model.value = cellValue
      $table.updateStatus(params, cellValue)
    }
  }
  if (events) {
    XEUtils.assign(on, XEUtils.objectMap(events, cb => function () {
      cb.apply(null, [params].concat.apply(params, arguments))
    }))
  }
  return on
}

function renderOptgroups (h, renderOpts, params) {
  let { optionGroups, optionGroupProps = {} } = renderOpts
  let groupOptions = optionGroupProps.options || 'options'
  let groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map((group, gIndex) => {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderOptions(h, group[groupOptions], renderOpts, params))
  })
}

function renderOptions (h, options, renderOpts, params) {
  let { optionProps = {} } = renderOpts
  let { column } = params
  let labelProp = optionProps.label || 'label'
  let valueProp = optionProps.value || 'value'
  return options.map((item, index) => {
    return h('option', {
      domProps: {
        value: item[valueProp],
        selected: item.value === column.model.value
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

function renderSelectEdit (h, renderOpts, params) {
  return [
    h('select', {
      class: 'vxe-default-select',
      on: getEvents(renderOpts, params)
    },
    renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params))
  ]
}

const renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: defaultCellRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: defaultCellRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  select: {
    renderEdit: renderSelectEdit,
    renderDefault: renderSelectEdit,
    renderCell (h, renderOpts, params) {
      let { options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts
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
