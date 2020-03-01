import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

const inputEventTypes = ['input', 'textarea', '$input', '$textarea']
const defaultCompProps = { transfer: true }

function parseDate (value, props) {
  return value && props.valueFormat ? XEUtils.toStringDate(value, props.valueFormat) : value
}

function getFormatDate (value, props, defaultFormat) {
  return XEUtils.toDateString(parseDate(value, props), props.labelFormat || defaultFormat)
}

function getEventUpdateType (renderOpts) {
  return inputEventTypes.indexOf(renderOpts.name) > -1 ? 'input' : 'change'
}

function getDefaultComponentName ({ name }) {
  return name.replace('$', 'vxe-')
}

function getNativeAttrs ({ name, attrs }) {
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

function getDefaultProps ({ $table }, { props }, defaultProps) {
  return XEUtils.assign($table.vSize ? { size: $table.vSize } : {}, defaultCompProps, defaultProps, props)
}

function getEvents (renderOpts, params) {
  const { events } = renderOpts
  const { $table, row, column } = params
  const type = getEventUpdateType(renderOpts)
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

function getDefaultEvents (renderOpts, params) {
  const { events } = renderOpts
  const { $table } = params
  const type = getEventUpdateType(renderOpts)
  const on = {
    [type] (obj, evnt) {
      $table.updateStatus(params)
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
function nativeEditRender (h, renderOpts, params) {
  const { row, column } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
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

function defaultEditRender (h, renderOpts, params) {
  const { row, column } = params
  const cellValue = UtilTools.getCellValue(row, column)
  const props = getDefaultProps(params, renderOpts)
  return [
    h(getDefaultComponentName(renderOpts), {
      model: {
        value: cellValue,
        callback (value) {
          UtilTools.setCellValue(row, column, value)
        }
      },
      props,
      on: getDefaultEvents(renderOpts, params)
    })
  ]
}

function defaultButtonEditRender (h, renderOpts, params) {
  const props = getDefaultProps(params, renderOpts)
  return [
    h('vxe-button', {
      props,
      on: getDefaultEvents(renderOpts, params)
    })
  ]
}

function defaultButtonsEditRender (h, renderOpts, params) {
  return renderOpts.children.map(childRenderOpts => defaultButtonEditRender(h, childRenderOpts, params)[0])
}

function renderNativeOptions (h, options, renderOpts, params) {
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

function renderDefaultOptions (h, options, renderOpts) {
  const { optionProps = {} } = renderOpts
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  return options.map(item => {
    return h('vxe-option', {
      props: {
        value: item[valueProp],
        label: item[labelProp],
        disabled: item[disabledProp]
      }
    })
  })
}

function renderNativeOptgroups (h, renderOpts, params) {
  const { optionGroups, optionGroupProps = {} } = renderOpts
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map((group, gIndex) => {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderNativeOptions(h, group[groupOptions], renderOpts, params))
  })
}

function renderDefaultOptgroups (h, renderOpts, params, renderOptionsMethods) {
  const { optionGroups, optionGroupProps = {} } = renderOpts
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map(group => {
    return h('vxe-optgroup', {
      props: {
        label: group[groupLabel]
      }
    }, renderOptionsMethods(h, group[groupOptions], renderOpts, params))
  })
}

function handleConfirmFilter (params, column, checked, item) {
  const { $panel } = params
  $panel[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item)
}

function getNativeFilterEvents (item, renderOpts, params) {
  const { column } = params
  const { events } = renderOpts
  const type = getEventUpdateType(renderOpts)
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

function getDefaultFilterEvents (item, renderOpts, params) {
  const { column } = params
  const { events } = renderOpts
  const type = getEventUpdateType(renderOpts)
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

function nativeFilterRender (h, renderOpts, params) {
  const { column } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
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
        on: getNativeFilterEvents(item, renderOpts, params)
      })
    ])
  })
}

function defaultFilterRender (h, renderOpts, params) {
  const { column } = params
  const props = getDefaultProps(renderOpts, renderOpts)
  return column.filters.map(item => {
    return h(getDefaultComponentName(renderOpts), {
      model: {
        value: item.data,
        callback (value) {
          item.data = value
        }
      },
      props,
      on: getDefaultFilterEvents(item, renderOpts, params)
    })
  })
}

function handleFilterMethod ({ option, row, column }) {
  const { data } = option
  const cellValue = XEUtils.get(row, column.property)
  /* eslint-disable eqeqeq */
  return cellValue == data
}

function nativeSelectEditRender (h, renderOpts, params) {
  return [
    h('select', {
      class: 'vxe-default-select',
      attrs: getNativeAttrs(renderOpts),
      on: getEvents(renderOpts, params)
    },
    renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params) : renderNativeOptions(h, renderOpts.options, renderOpts, params))
  ]
}

function defaultSelectEditRender (h, renderOpts, params) {
  const { row, column } = params
  const cellValue = UtilTools.getCellValue(row, column)
  const props = getDefaultProps(params, renderOpts)
  return [
    h(getDefaultComponentName(renderOpts), {
      model: {
        value: cellValue,
        callback (value) {
          UtilTools.setCellValue(row, column, value)
        }
      },
      props,
      on: getDefaultEvents(renderOpts, params)
    },
    renderOpts.optionGroups ? renderDefaultOptgroups(h, renderOpts, params, renderDefaultOptions) : renderDefaultOptions(h, renderOpts.options, renderOpts, params))
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

function getNativeFormEvents (renderOpts, params) {
  const { $form, data, property } = params
  const { events } = renderOpts
  const type = getEventUpdateType(renderOpts)
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

function getDefaultFormEvents (renderOpts, params) {
  const { $form } = params
  const { events } = renderOpts
  const type = getEventUpdateType(renderOpts)
  const on = {
    [type] ({ value: itemValue }, evnt) {
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

function getDefaultFormItemProps ({ $form }, { props }, defaultProps) {
  return XEUtils.assign($form.vSize ? { size: $form.vSize } : {}, defaultCompProps, defaultProps, props)
}

/**
 * 表单渲染器
 */
function nativeItemRender (h, renderOpts, params) {
  const { data, property } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  const cellValue = XEUtils.get(data, property)
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
        value: cellValue
      },
      on: getNativeFormEvents(renderOpts, params)
    })
  ]
}

function defaultItemRender (h, renderOpts, params) {
  const { data, property } = params
  const itemValue = XEUtils.get(data, property)
  const props = getDefaultFormItemProps(params, renderOpts)
  return [
    h(getDefaultComponentName(renderOpts), {
      model: {
        value: itemValue,
        callback (value) {
          XEUtils.set(data, property, value)
        }
      },
      props,
      on: getDefaultFormEvents(renderOpts, params)
    })
  ]
}

function defaultButtonItemRender (h, renderOpts, params) {
  const props = getDefaultFormItemProps(params, renderOpts)
  return [
    h('vxe-button', {
      props,
      on: getDefaultFormEvents(renderOpts, params)
    })
  ]
}

function defaultButtonsItemRender (h, renderOpts, params) {
  return renderOpts.children.map(childRenderOpts => defaultButtonItemRender(h, childRenderOpts, params)[0])
}

function renderNativeFormOptions (h, options, renderOpts, params) {
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

function defaultFormItemRadioAndCheckboxRender (h, renderOpts, params) {
  const { options, optionProps = {} } = renderOpts
  const { data, property } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const itemValue = XEUtils.get(data, property)
  const props = getDefaultFormItemProps(params, renderOpts)
  const name = getDefaultComponentName(renderOpts)
  return [
    h(`${name}-group`, {
      props,
      model: {
        value: itemValue,
        callback (value) {
          XEUtils.set(data, property, value)
        }
      },
      on: getDefaultFormEvents(renderOpts, params)
    }, options.map(option => {
      return h(name, {
        props: {
          label: option[valueProp],
          content: option[labelProp],
          disabled: option[disabledProp]
        }
      })
    }))
  ]
}

const renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: nativeItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell (h, renderOpts, params) {
      getSelectCellValue(renderOpts, params)
    },
    renderFilter (h, renderOpts, params) {
      const { column } = params
      return column.filters.map(item => {
        return h('select', {
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeFilterEvents(item, renderOpts, params)
        },
        renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params) : renderNativeOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: handleFilterMethod,
    renderItem (h, renderOpts, params) {
      return [
        h('select', {
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeFormEvents(renderOpts, params)
        },
        renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(h, renderOpts.options, renderOpts, params))
      ]
    },
    editCellExportMethod: createExportMethod(getSelectCellValue, true),
    cellExportMethod: createExportMethod(getSelectCellValue)
  },
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell (h, renderOpts, params) {
      const { props = {} } = renderOpts
      const { row, column } = params
      let cellValue = XEUtils.get(row, column.property)
      switch (props.type) {
        case 'date':
          cellValue = getFormatDate(cellValue, props, 'yyyy-MM-dd')
          break
        case 'month':
          cellValue = getFormatDate(cellValue, props, 'yyyy-MM')
          break
        case 'year':
          cellValue = getFormatDate(cellValue, props, 'yyyy')
          break
      }
      return cellValue
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: defaultItemRender
  },
  $button: {
    renderEdit: defaultButtonEditRender,
    renderDefault: defaultButtonEditRender,
    renderItem: defaultButtonItemRender
  },
  $buttons: {
    renderEdit: defaultButtonsEditRender,
    renderDefault: defaultButtonsEditRender,
    renderItem: defaultButtonsItemRender
  },
  $select: {
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell (h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params)
    },
    renderFilter (h, renderOpts, params) {
      const { column } = params
      const props = getDefaultProps(params, renderOpts)
      return column.filters.map(item => {
        return h(getDefaultComponentName(renderOpts), {
          model: {
            value: item.data,
            callback (value) {
              item.data = value
            }
          },
          props,
          on: getDefaultFilterEvents(item, renderOpts, params)
        },
        renderOpts.optionGroups ? renderDefaultOptgroups(h, renderOpts, params, renderDefaultOptions) : renderDefaultOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: handleFilterMethod,
    renderItem (h, renderOpts, params) {
      const { data, property } = params
      const itemValue = XEUtils.get(data, property)
      const props = getDefaultFormItemProps(params, renderOpts)
      return [
        h(getDefaultComponentName(renderOpts), {
          model: {
            value: itemValue,
            callback (value) {
              XEUtils.set(data, property, value)
            }
          },
          props,
          on: getDefaultFormEvents(renderOpts, params)
        },
        renderOpts.optionGroups ? renderDefaultOptgroups(h, renderOpts, params, renderDefaultOptions) : renderDefaultOptions(h, renderOpts.options, renderOpts, params))
      ]
    },
    editCellExportMethod: createExportMethod(getSelectCellValue, true),
    cellExportMethod: createExportMethod(getSelectCellValue)
  },
  $radio: {
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    renderItem: defaultFormItemRadioAndCheckboxRender
  }
}

/**
 * 全局渲染器
 */
const renderer = {
  mixin (map) {
    XEUtils.each(map, (options, name) => renderer.add(name, options))
    return renderer
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
    return renderer
  },
  delete (name) {
    delete renderMap[name]
    return renderer
  }
}

export default renderer
