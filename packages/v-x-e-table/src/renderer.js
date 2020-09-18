import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

const inputEventTypes = ['input', 'textarea', '$input', '$textarea']
const defaultCompProps = { transfer: true }

function isEmptyValue (cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === ''
}

function getChangeEvent (renderOpts) {
  return inputEventTypes.indexOf(renderOpts.name) > -1 ? 'input' : 'change'
}

function parseDate (value, props) {
  return value && props.valueFormat ? XEUtils.toStringDate(value, props.valueFormat) : value
}

function getFormatDate (value, props, defaultFormat) {
  const { dateConfig = {} } = props
  return XEUtils.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat)
}

function getLabelFormatDate (value, props) {
  return getFormatDate(value, props, GlobalConfig.i18n(`vxe.input.date.labelFormat.${props.type}`))
}

function getDefaultComponentName ({ name }) {
  return `vxe-${name.replace('$', '')}`
}

function handleConfirmFilter (params, checked, option) {
  const { $panel } = params
  $panel.changeOption({}, checked, option)
}

function getNativeAttrs ({ name, attrs }) {
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

function getCellEditFilterProps (renderOpts, params, value, defaultProps) {
  const { vSize } = params.$table
  return XEUtils.assign(vSize ? { size: vSize } : {}, defaultCompProps, defaultProps, renderOpts.props, { value })
}

function getItemProps (renderOpts, params, value, defaultProps) {
  const { vSize } = params.$form
  return XEUtils.assign(vSize ? { size: vSize } : {}, defaultCompProps, defaultProps, renderOpts.props, { value })
}

function getNativeOns (renderOpts, params) {
  const { nativeEvents } = renderOpts
  const nativeOns = {}
  XEUtils.objectEach(nativeEvents, (func, key) => {
    nativeOns[key] = function (...args) {
      func(params, ...args)
    }
  })
  return nativeOns
}

function getOns (renderOpts, params, inputFunc, changeFunc) {
  const { events } = renderOpts
  const modelEvent = 'input'
  const changeEvent = getChangeEvent(renderOpts)
  const isSameEvent = changeEvent === modelEvent
  const ons = {}
  XEUtils.objectEach(events, (func, key) => {
    ons[key] = function (...args) {
      func(params, ...args)
    }
  })
  if (inputFunc) {
    ons[modelEvent] = function (targetEvnt) {
      inputFunc(targetEvnt)
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt)
      }
      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt)
      }
    }
  }
  if (!isSameEvent && changeFunc) {
    ons[changeEvent] = function (...args) {
      changeFunc(...args)
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args)
      }
    }
  }
  return ons
}

function getEditOns (renderOpts, params) {
  const { $table, row, column } = params
  return getOns(renderOpts, params, (value) => {
    // 处理 model 值双向绑定
    XEUtils.set(row, column.property, value)
  }, () => {
    // 处理 change 事件相关逻辑
    $table.updateStatus(params)
  })
}

function getFilterOns (renderOpts, params, option) {
  return getOns(renderOpts, params, (value) => {
    // 处理 model 值双向绑定
    option.data = value
  }, () => {
    handleConfirmFilter(params, !XEUtils.eqNull(option.data), option)
  })
}

function getItemOns (renderOpts, params) {
  const { $form, data, property } = params
  return getOns(renderOpts, params, (value) => {
    // 处理 model 值双向绑定
    XEUtils.set(data, property, value)
  }, () => {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params)
  })
}

function isSyncCell (renderOpts, params) {
  // 在 v3.0 中废弃 editRender.type
  return renderOpts.immediate || renderOpts.type === 'visible' || params.$type === 'cell'
}

function getNativeEditOns (renderOpts, params) {
  const { $table, row, column } = params
  const { model } = column
  return getOns(renderOpts, params, (evnt) => {
    // 处理 model 值双向绑定
    const cellValue = evnt.target.value
    if (isSyncCell(renderOpts, params)) {
      UtilTools.setCellValue(row, column, cellValue)
    } else {
      model.update = true
      model.value = cellValue
    }
  }, (evnt) => {
    // 处理 change 事件相关逻辑
    const cellValue = evnt.target.value
    $table.updateStatus(params, cellValue)
  })
}

function getNativeFilterOns (renderOpts, params, option) {
  return getOns(renderOpts, params, (evnt) => {
    // 处理 model 值双向绑定
    option.data = evnt.target.value
  }, () => {
    handleConfirmFilter(params, !XEUtils.eqNull(option.data), option)
  })
}

function getNativeItemOns (renderOpts, params) {
  const { $form, data, property } = params
  return getOns(renderOpts, params, (evnt) => {
    // 处理 model 值双向绑定
    const itemValue = evnt.target.value
    XEUtils.set(data, property, itemValue)
  }, () => {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params)
  })
}

/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea、select
 */
function nativeEditRender (h, renderOpts, params) {
  const { row, column } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  const cellValue = isSyncCell(renderOpts, params) ? UtilTools.getCellValue(row, column) : column.model.value
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: {
        value: cellValue
      },
      on: getNativeEditOns(renderOpts, params)
    })
  ]
}

function defaultEditRender (h, renderOpts, params) {
  const { row, column } = params
  const cellValue = UtilTools.getCellValue(row, column)
  return [
    h(getDefaultComponentName(renderOpts), {
      props: getCellEditFilterProps(renderOpts, params, cellValue),
      on: getEditOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    })
  ]
}

function defaultButtonEditRender (h, renderOpts, params) {
  return [
    h('vxe-button', {
      props: getCellEditFilterProps(renderOpts, params),
      on: getOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    })
  ]
}

function defaultButtonsEditRender (h, renderOpts, params) {
  return renderOpts.children.map(childRenderOpts => defaultButtonEditRender(h, childRenderOpts, params)[0])
}

function renderNativeOptgroups (h, renderOpts, params, renderOptionsMethods) {
  const { optionGroups, optionGroupProps = {} } = renderOpts
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map((group, gIndex) => {
    return h('optgroup', {
      key: gIndex,
      domProps: {
        label: group[groupLabel]
      }
    }, renderOptionsMethods(h, group[groupOptions], renderOpts, params))
  })
}

/**
 * 渲染原生的 option 标签
 */
function renderNativeOptions (h, options, renderOpts, params) {
  const { optionProps = {} } = renderOpts
  const { row, column } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const cellValue = isSyncCell(renderOpts, params) ? UtilTools.getCellValue(row, column) : column.model.value
  return options.map((option, oIndex) => {
    return h('option', {
      key: oIndex,
      attrs: {
        value: option[valueProp],
        disabled: option[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: option[valueProp] == cellValue
      }
    }, option[labelProp])
  })
}

function nativeFilterRender (h, renderOpts, params) {
  const { column } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  return column.filters.map((option, oIndex) => {
    return h(name, {
      key: oIndex,
      class: `vxe-default-${name}`,
      attrs,
      domProps: {
        value: option.data
      },
      on: getNativeFilterOns(renderOpts, params, option)
    })
  })
}

function defaultFilterRender (h, renderOpts, params) {
  const { column } = params
  return column.filters.map((option, oIndex) => {
    const optionValue = option.data
    return h(getDefaultComponentName(renderOpts), {
      key: oIndex,
      props: getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      on: getFilterOns(renderOpts, params, option)
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
      on: getNativeEditOns(renderOpts, params)
    },
    renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))
  ]
}

function defaultSelectEditRender (h, renderOpts, params) {
  const { row, column } = params
  const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
  const cellValue = UtilTools.getCellValue(row, column)
  return [
    h(getDefaultComponentName(renderOpts), {
      props: getCellEditFilterProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps }),
      on: getEditOns(renderOpts, params)
    })
  ]
}

function getSelectCellValue (renderOpts, { row, column }) {
  const { props = {}, options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts
  const cellValue = XEUtils.get(row, column.property)
  let selectItem
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  if (!isEmptyValue(cellValue)) {
    return XEUtils.map(props.multiple ? cellValue : [cellValue], optionGroups ? (value) => {
      const groupOptions = optionGroupProps.options || 'options'
      for (let index = 0; index < optionGroups.length; index++) {
        /* eslint-disable eqeqeq */
        selectItem = XEUtils.find(optionGroups[index][groupOptions], item => item[valueProp] == value)
        if (selectItem) {
          break
        }
      }
      return selectItem ? selectItem[labelProp] : value
    } : (value) => {
      /* eslint-disable eqeqeq */
      selectItem = XEUtils.find(options, item => item[valueProp] == value)
      return selectItem ? selectItem[labelProp] : value
    }).join(', ')
  }
  return null
}

/**
 * 渲染表单-项
 * 用于渲染原生的标签
 */
function nativeItemRender (h, renderOpts, params) {
  const { data, property } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  const itemValue = XEUtils.get(data, property)
  return [
    h(name, {
      class: `vxe-default-${name}`,
      attrs,
      domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
        value: itemValue
      },
      on: getNativeItemOns(renderOpts, params)
    })
  ]
}

function defaultItemRender (h, renderOpts, params) {
  const { data, property } = params
  const itemValue = XEUtils.get(data, property)
  return [
    h(getDefaultComponentName(renderOpts), {
      props: getItemProps(renderOpts, params, itemValue),
      on: getItemOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    })
  ]
}

function defaultButtonItemRender (h, renderOpts, params) {
  return [
    h('vxe-button', {
      props: getItemProps(renderOpts, params),
      on: getOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    })
  ]
}

function defaultButtonsItemRender (h, renderOpts, params) {
  return renderOpts.children.map(childRenderOpts => defaultButtonItemRender(h, childRenderOpts, params)[0])
}

/**
 * 渲染原生的 select 标签
 */
function renderNativeFormOptions (h, options, renderOpts, params) {
  const { data, property } = params
  const { optionProps = {} } = renderOpts
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const cellValue = XEUtils.get(data, property)
  return options.map((item, oIndex) => {
    return h('option', {
      key: oIndex,
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
      }
    }, item[labelProp])
  })
}

function handleExportSelectMethod (params) {
  const { column } = params
  return getSelectCellValue(column.editRender || column.cellRender, params)
}

/**
 * 渲染表单-项中
 * 单选框和复选框
 */
function defaultFormItemRadioAndCheckboxRender (h, renderOpts, params) {
  const { options, optionProps = {} } = renderOpts
  const { data, property } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const itemValue = XEUtils.get(data, property)
  const name = getDefaultComponentName(renderOpts)
  return [
    h(`${name}-group`, {
      props: getItemProps(renderOpts, params, itemValue),
      on: getItemOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    }, options.map((item, index) => {
      return h(name, {
        key: index,
        props: {
          label: item[valueProp],
          content: item[labelProp],
          disabled: item[disabledProp]
        }
      })
    }))
  ]
}

/**
 * 内置的组件渲染
 */
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
    renderItem: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell (h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params)
    },
    renderFilter (h, renderOpts, params) {
      const { column } = params
      return column.filters.map((option, oIndex) => {
        return h('select', {
          key: oIndex,
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeFilterOns(renderOpts, params, option)
        },
        renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: handleFilterMethod,
    renderItem (h, renderOpts, params) {
      return [
        h('select', {
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeItemOns(renderOpts, params)
        },
        renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(h, renderOpts.options, renderOpts, params))
      ]
    },
    cellExportMethod: handleExportSelectMethod
  },
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell (h, renderOpts, params) {
      const { props = {} } = renderOpts
      const { row, column } = params
      let cellValue = XEUtils.get(row, column.property)
      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props)
            break
          case 'float':
            cellValue = XEUtils.toFixedString(cellValue, XEUtils.toNumber(props.digits || GlobalConfig.input.digits))
            break
        }
      }
      return cellValue
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: defaultItemRender
  },
  $textarea: {
    autofocus: '.vxe-textarea--inner',
    renderItem: defaultItemRender
  },
  $button: {
    renderDefault: defaultButtonEditRender,
    renderItem: defaultButtonItemRender
  },
  $buttons: {
    renderDefault: defaultButtonsEditRender,
    renderItem: defaultButtonsItemRender
  },
  $select: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell (h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params)
    },
    renderFilter (h, renderOpts, params) {
      const { column } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      const nativeOn = getNativeOns(renderOpts, params)
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data
        return h(getDefaultComponentName(renderOpts), {
          key: oIndex,
          props: getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
          on: getFilterOns(renderOpts, params, option),
          nativeOn
        })
      })
    },
    filterMethod: handleFilterMethod,
    renderItem (h, renderOpts, params) {
      const { data, property } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      const itemValue = XEUtils.get(data, property)
      return [
        h(getDefaultComponentName(renderOpts), {
          props: getItemProps(renderOpts, params, itemValue, { options, optionProps, optionGroups, optionGroupProps }),
          on: getItemOns(renderOpts, params),
          nativeOn: getNativeOns(renderOpts, params)
        })
      ]
    },
    cellExportMethod: handleExportSelectMethod
  },
  $radio: {
    autofocus: '.vxe-radio--input',
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    autofocus: '.vxe-checkbox--input',
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $switch: {
    autofocus: '.vxe-switch--button',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderItem: defaultItemRender
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
