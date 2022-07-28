import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import UtilTools, { getFuncText } from '../../tools/utils'
import { warnLog } from '../../tools/log'

const defaultCompProps = { transfer: true }

const componentDefaultModelProp = 'value'

function isEmptyValue (cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === ''
}

function getChangeEvent (renderOpts) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case '$input':
    case '$textarea':
      return 'input'
  }
  return 'change'
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

function getInputImmediateModel (renderOpts) {
  const { name, immediate, props } = renderOpts
  if (!immediate) {
    if (name === '$input') {
      const { type } = props || {}
      return !(!type || type === 'text' || type === 'number' || type === 'integer' || type === 'float')
    }
    if (name === 'input' || name === 'textarea' || name === '$textarea') {
      return false
    }
    return true
  }
  return immediate
}

function isImmediateCell (renderOpts, params) {
  return params.$type === 'cell' || getInputImmediateModel(renderOpts)
}

function getCellEditProps (renderOpts, params, value, defaultProps) {
  const { vSize } = params.$table
  return XEUtils.assign({ immediate: getInputImmediateModel(renderOpts) }, vSize ? { size: vSize } : {}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function getFilterProps (renderOpts, params, value, defaultProps) {
  const { vSize } = params.$table
  return XEUtils.assign(vSize ? { size: vSize } : {}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function getItemProps (renderOpts, params, value, defaultProps) {
  const { vSize } = params.$form
  return XEUtils.assign(vSize ? { size: vSize } : {}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function getCellLabelVNs (h, renderOpts, params, cellLabel) {
  const { placeholder } = renderOpts
  return [
    h('span', {
      class: 'vxe-cell--label'
    }, placeholder && isEmptyValue(cellLabel) ? [
      h('span', {
        class: 'vxe-cell--placeholder'
      }, UtilTools.formatText(getFuncText(placeholder), 1))
    ] : [cellLabel])
  ]
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
  const { name, events } = renderOpts
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
      // 对输入框进行优化
      inputFunc(name === '$input' || name === '$textarea' ? targetEvnt.value : targetEvnt)
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
  const { name } = renderOpts
  const { model } = column
  const isImmediate = isImmediateCell(renderOpts, params)
  return getOns(renderOpts, params, (cellValue) => {
    // 处理 model 值双向绑定
    if (isImmediate) {
      UtilTools.setCellValue(row, column, cellValue)
    } else {
      model.update = true
      model.value = cellValue
    }
  }, (eventParams) => {
    // 处理 change 事件相关逻辑
    if (!isImmediate && (name === '$input' || name === '$textarea')) {
      $table.updateStatus(params, eventParams.value)
    } else {
      $table.updateStatus(params)
    }
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

function getNativeEditOns (renderOpts, params) {
  const { $table, row, column } = params
  const { model } = column
  return getOns(renderOpts, params, (evnt) => {
    // 处理 model 值双向绑定
    const cellValue = evnt.target.value
    if (isImmediateCell(renderOpts, params)) {
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
  const cellValue = isImmediateCell(renderOpts, params) ? UtilTools.getCellValue(row, column) : column.model.value
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
      props: getCellEditProps(renderOpts, params, cellValue),
      on: getEditOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    })
  ]
}

function defaultButtonEditRender (h, renderOpts, params) {
  return [
    h('vxe-button', {
      props: getCellEditProps(renderOpts, params),
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
  const cellValue = isImmediateCell(renderOpts, params) ? UtilTools.getCellValue(row, column) : column.model.value
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
      props: getFilterProps(renderOpts, renderOpts, optionValue),
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
    h('select',
      {
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
      props: getCellEditProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps }),
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
  const { row, column, options } = params
  return options.original ? UtilTools.getCellValue(row, column) : getSelectCellValue(column.editRender || column.cellRender, params)
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
  // 如果是分组
  if (options) {
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
  return [
    h(name, {
      props: getItemProps(renderOpts, params, itemValue),
      on: getItemOns(renderOpts, params),
      nativeOn: getNativeOns(renderOpts, params)
    })
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
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: nativeItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: nativeEditRender,
    renderItemContent: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell (h, renderOpts, params) {
      return getCellLabelVNs(h, renderOpts, params, getSelectCellValue(renderOpts, params))
    },
    renderFilter (h, renderOpts, params) {
      const { column } = params
      return column.filters.map((option, oIndex) => {
        return h('select',
          {
            key: oIndex,
            class: 'vxe-default-select',
            attrs: getNativeAttrs(renderOpts),
            on: getNativeFilterOns(renderOpts, params, option)
          },
          renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))
      })
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent (h, renderOpts, params) {
      return [
        h('select',
          {
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
      const digits = props.digits || GlobalConfig.input.digits
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
            cellValue = XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
            break
        }
      }
      return getCellLabelVNs(h, renderOpts, params, cellValue)
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: defaultItemRender
  },
  $textarea: {
    autofocus: '.vxe-textarea--inner',
    renderItemContent: defaultItemRender
  },
  $button: {
    renderDefault: defaultButtonEditRender,
    renderItemContent: defaultButtonItemRender
  },
  $buttons: {
    renderDefault: defaultButtonsEditRender,
    renderItemContent: defaultButtonsItemRender
  },
  $select: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell (h, renderOpts, params) {
      return getCellLabelVNs(h, renderOpts, params, getSelectCellValue(renderOpts, params))
    },
    renderFilter (h, renderOpts, params) {
      const { column } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      const nativeOn = getNativeOns(renderOpts, params)
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data
        return h(getDefaultComponentName(renderOpts), {
          key: oIndex,
          props: getFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
          on: getFilterOns(renderOpts, params, option),
          nativeOn
        })
      })
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent (h, renderOpts, params) {
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
    renderItemContent: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    autofocus: '.vxe-checkbox--input',
    renderItemContent: defaultFormItemRadioAndCheckboxRender
  },
  $switch: {
    autofocus: '.vxe-switch--button',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderItemContent: defaultItemRender
  }
}

/**
 * 全局渲染器
 */
export const renderer = {
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
        // 检测是否覆盖
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          XEUtils.each(options, (val, key) => {
            if (!XEUtils.eqNull(renders[key]) && renders[key] !== val) {
              warnLog('vxe.error.coverProp', [`Renderer.${name}`, key])
            }
          })
        }

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
