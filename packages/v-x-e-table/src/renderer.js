import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

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
function defaultEditRender (h, renderOpts, params) {
  let { row, column } = params
  let { name } = renderOpts
  let attrs = getAttrs(renderOpts)
  return [
    h('div', {
      class: `vxe-${name}`
    }, [
      h(name, {
        class: `vxe-${name}--inner`,
        attrs,
        domProps: {
          value: UtilTools.getCellValue(row, column)
        },
        on: getEvents(renderOpts, params)
      })
    ])
  ]
}

function getEvents (renderOpts, params) {
  let { name, events } = renderOpts
  let { $table, row, column } = params
  let type = name === 'select' ? 'change' : 'input'
  let on = {
    [type] (evnt) {
      let cellValue = evnt.target.value
      UtilTools.setCellValue(row, column, cellValue)
      $table.updateStatus(params, cellValue)
      if (events && events[type]) {
        events[type](params, evnt)
      }
    }
  }
  if (events) {
    return XEUtils.assign({}, XEUtils.objectMap(events, cb => function () {
      cb.apply(null, [params].concat.apply(params, arguments))
    }), on)
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
  let { row, column } = params
  let labelProp = optionProps.label || 'label'
  let valueProp = optionProps.value || 'value'
  let disabledProp = optionProps.disabled || 'disabled'
  return options.map((item, index) => {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        selected: item[valueProp] === UtilTools.getCellValue(row, column)
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
      if (events && events[type]) {
        events[type](Object.assign({ context }, params), evnt)
      }
    }
  }
  if (events) {
    return XEUtils.assign({}, XEUtils.objectMap(events, cb => function () {
      params = Object.assign({ context }, params)
      cb.apply(null, [params].concat.apply(params, arguments))
    }), on)
  }
  return on
}

function defaultFilterRender (h, renderOpts, params, context) {
  let { column } = params
  let { name } = renderOpts
  let attrs = getAttrs(renderOpts)
  return column.filters.map(item => {
    return h('div', {
      class: 'vxe-input--wrapper'
    }, [
      h(name, {
        class: `vxe-${name}`,
        attrs,
        domProps: {
          value: item.data
        },
        on: getFilterEvents(item, renderOpts, params, context)
      })
    ])
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
      attrs: getAttrs(renderOpts),
      on: getEvents(renderOpts, params)
    },
    renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params))
  ]
}

function getSelectCellValue (renderOpts, { row, column }) {
  let { options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts
  let cellValue = XEUtils.get(row, column.property)
  let selectItem
  let labelProp = optionProps.label || 'label'
  let valueProp = optionProps.value || 'value'
  if (optionGroups) {
    let groupOptions = optionGroupProps.options || 'options'
    for (let index = 0; index < optionGroups.length; index++) {
      selectItem = XEUtils.find(optionGroups[index][groupOptions], item => item[valueProp] === cellValue)
      if (selectItem) {
        break
      }
    }
    return selectItem ? selectItem[labelProp] : cellValue
  }
  selectItem = XEUtils.find(options, item => item[valueProp] === cellValue)
  return selectItem ? selectItem[labelProp] : cellValue
}

/**
 * 表单渲染器
 */
function defaultItemRender (h, renderOpts, params, context) {
  let { data, property } = params
  let { name } = renderOpts
  let attrs = getAttrs(renderOpts)
  let cellValue = XEUtils.get(data, property)
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
        value: cellValue
      },
      on: getFormEvents(renderOpts, params, context)
    })
  ]
}

function getFormEvents (renderOpts, params, context) {
  let { $form, data, property } = params
  let { events } = renderOpts
  let type = name === 'select' ? 'change' : 'input'
  let on = {
    [type] (evnt) {
      const itemValue = evnt.target.value
      XEUtils.set(data, property, itemValue)
      $form.updateStatus(params, itemValue)
      if (events && events[type]) {
        events[type](Object.assign({ context }, params), evnt)
      }
    }
  }
  if (events) {
    return XEUtils.assign({}, XEUtils.objectMap(events, cb => function () {
      params = Object.assign({ context }, params)
      cb.apply(null, [params].concat.apply(params, arguments))
    }), on)
  }
  return on
}

function renderFormOptions (h, options, renderOpts, params, context) {
  let { data, property } = params
  let { optionProps = {} } = renderOpts
  let labelProp = optionProps.label || 'label'
  let valueProp = optionProps.value || 'value'
  let disabledProp = optionProps.disabled || 'disabled'
  let cellValue = XEUtils.get(data, property)
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

function createExportMethod (valueMethod, isEdit) {
  const renderProperty = isEdit ? 'editRender' : 'cellRender'
  return function (params) {
    return valueMethod(params.column[renderProperty], params)
  }
}

const renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod,
    renderItem: defaultItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod,
    renderItem: defaultItemRender
  },
  select: {
    renderEdit: renderSelectEdit,
    renderDefault: renderSelectEdit,
    renderCell (h, renderOpts, params) {
      getSelectCellValue(renderOpts, params)
    },
    renderFilter (h, renderOpts, params, context) {
      let { column } = params
      return column.filters.map(item => {
        return h('select', {
          class: 'vxe-default-select',
          attrs: getAttrs(renderOpts),
          on: getFilterEvents(item, renderOpts, params, context)
        },
        renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: defaultFilterMethod,
    renderItem (h, renderOpts, params, context) {
      return [
        h('select', {
          class: 'vxe-default-select',
          attrs: getAttrs(renderOpts),
          on: getFormEvents(renderOpts, params, context)
        },
        renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params, context, renderFormOptions) : renderFormOptions(h, renderOpts.options, renderOpts, params, context))
      ]
    },
    editExportMethod: createExportMethod(getSelectCellValue, true),
    cellExportMethod: createExportMethod(getSelectCellValue)
  }
}

/**
 * 全局渲染器
 */
export const renderStore = {
  mixin (map) {
    XEUtils.each(map, (options, name) => renderStore.add(name, options))
    return renderStore
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
    return renderStore
  },
  delete (name) {
    delete renderMap[name]
    return renderStore
  }
}

export default renderStore
