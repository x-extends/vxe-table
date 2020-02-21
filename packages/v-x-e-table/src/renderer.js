import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

function getAttrs ({ name, attrs }) {
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

function getEvents (renderOpts, params) {
  const { name, events } = renderOpts
  const { $table, row, column } = params
  const type = name === 'select' ? 'change' : 'input'
  const on = {
    [type] (evnt) {
      const cellValue = evnt.target.value
      UtilTools.setCellValue(row, column, cellValue)
      $table.updateStatus(params, cellValue)
      if (events && events[type]) {
        events[type](params, evnt)
      }
    }
  }
  if (events) {
    return XEUtils.assign({}, XEUtils.objectMap(events, evntFn => function (...args) {
      args = [params].concat(args)
      evntFn(...args)
    }), on)
  }
  return on
}

/**
 * 内置渲染器
 * 支持原生的 input、textarea、select
 */
function defaultEditRender (h, renderOpts, params) {
  const { row, column } = params
  const { name } = renderOpts
  const attrs = getAttrs(renderOpts)
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

function renderOptgroups (h, renderOpts, params) {
  const { optionGroups, optionGroupProps = {} } = renderOpts
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
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
  const { optionProps = {} } = renderOpts
  const { row, column } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  return options.map((item, index) => {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == UtilTools.getCellValue(row, column)
      },
      key: index
    }, item[labelProp])
  })
}

function getFilterEvents (item, renderOpts, params) {
  const { column } = params
  const { events } = renderOpts
  const type = name === 'select' ? 'change' : 'input'
  const on = {
    [type] (evnt) {
      item.data = evnt.target.value
      handleConfirmFilter(params, column, !!item.data, item)
      if (events && events[type]) {
        events[type](params, evnt)
      }
    }
  }
  if (events) {
    return XEUtils.assign({}, XEUtils.objectMap(events, evntFn => function (...args) {
      args = [params].concat(args)
      evntFn(...args)
    }), on)
  }
  return on
}

function defaultFilterRender (h, renderOpts, params) {
  const { column } = params
  const { name } = renderOpts
  const attrs = getAttrs(renderOpts)
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
        on: getFilterEvents(item, renderOpts, params)
      })
    ])
  })
}

function handleConfirmFilter (params, column, checked, item) {
  const { $panel } = params
  $panel[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item)
}

function defaultFilterMethod ({ option, row, column }) {
  const { data } = option
  const cellValue = XEUtils.get(row, column.property)
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
  const { options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts
  const cellValue = XEUtils.get(row, column.property)
  let selectItem
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  if (optionGroups) {
    const groupOptions = optionGroupProps.options || 'options'
    for (let index = 0; index < optionGroups.length; index++) {
      /* eslint-disable eqeqeq */
      selectItem = XEUtils.find(optionGroups[index][groupOptions], item => item[valueProp] == cellValue)
      if (selectItem) {
        break
      }
    }
    return selectItem ? selectItem[labelProp] : cellValue
  }
  /* eslint-disable eqeqeq */
  selectItem = XEUtils.find(options, item => item[valueProp] == cellValue)
  return selectItem ? selectItem[labelProp] : cellValue
}

/**
 * 表单渲染器
 */
function defaultItemRender (h, renderOpts, params) {
  const { data, property } = params
  const { name } = renderOpts
  const attrs = getAttrs(renderOpts)
  const cellValue = XEUtils.get(data, property)
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
        value: cellValue
      },
      on: getFormEvents(renderOpts, params)
    })
  ]
}

function getFormEvents (renderOpts, params) {
  const { $form, data, property } = params
  const { events } = renderOpts
  const type = name === 'select' ? 'change' : 'input'
  const on = {
    [type] (evnt) {
      const itemValue = evnt.target.value
      XEUtils.set(data, property, itemValue)
      $form.updateStatus(params, itemValue)
      if (events && events[type]) {
        events[type](params, evnt)
      }
    }
  }
  if (events) {
    return XEUtils.assign({}, XEUtils.objectMap(events, evntFn => function (...args) {
      args = [params].concat(args)
      evntFn(...args)
    }), on)
  }
  return on
}

function renderFormOptions (h, options, renderOpts, params) {
  const { data, property } = params
  const { optionProps = {} } = renderOpts
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const cellValue = XEUtils.get(data, property)
  return options.map((item, index) => {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
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
    renderFilter (h, renderOpts, params) {
      const { column } = params
      return column.filters.map(item => {
        return h('select', {
          class: 'vxe-default-select',
          attrs: getAttrs(renderOpts),
          on: getFilterEvents(item, renderOpts, params)
        },
        renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: defaultFilterMethod,
    renderItem (h, renderOpts, params) {
      return [
        h('select', {
          class: 'vxe-default-select',
          attrs: getAttrs(renderOpts),
          on: getFormEvents(renderOpts, params)
        },
        renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params, renderFormOptions) : renderFormOptions(h, renderOpts.options, renderOpts, params))
      ]
    },
    editCellExportMethod: createExportMethod(getSelectCellValue, true),
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
      const renders = renderMap[name]
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
