import { h, resolveComponent, ComponentOptions } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from './conf'
import { getCellValue, setCellValue } from '../../table/src/util'
import { warnLog, getFuncText, formatText, isEmptyValue } from '../../tools/utils'
import { getOnName } from '../../tools/vn'

import { VxeGlobalRendererHandles, VxeGlobalRenderer, VxeColumnPropTypes } from '../../../types/all'

const componentDefaultModelProp = 'modelValue'

const defaultCompProps = { transfer: true }

function getModelEvent (renderOpts: any) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
      return 'input'
  }
  return 'update:modelValue'
}

function getChangeEvent (renderOpts: any) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case '$input':
    case '$textarea':
      return 'input'
  }
  return 'change'
}

function parseDate (value: any, props: any) {
  return value && props.valueFormat ? XEUtils.toStringDate(value, props.valueFormat) : value
}

function getFormatDate (value: any, props: any, defaultFormat: string) {
  const { dateConfig = {} } = props
  return XEUtils.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat)
}

function getLabelFormatDate (value: any, props: any) {
  return getFormatDate(value, props, GlobalConfig.i18n(`vxe.input.date.labelFormat.${props.type}`))
}

function getComponentName (name: string) {
  return `vxe-${name.replace('$', '')}`
}

function getDefaultComponent ({ name }: any) {
  return resolveComponent(getComponentName(name)) as ComponentOptions
}

function handleConfirmFilter (params: any, checked: any, option: any) {
  const { $panel } = params
  $panel.changeOption({}, checked, option)
}

function getNativeAttrs (renderOpts: any) {
  let { name, attrs } = renderOpts
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

function getInputImmediateModel (renderOpts: VxeColumnPropTypes.EditRender) {
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

function getCellEditProps (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderEditParams, value: any, defaultProps?: any) {
  return XEUtils.assign({ immediate: getInputImmediateModel(renderOpts) }, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function getCellEditFilterProps (renderOpts: any, params: any, value: any, defaultProps?: any) {
  return XEUtils.assign({}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function getComponentFormItemProps (renderOpts: any, params: any, value: any, defaultProps?: any) {
  return XEUtils.assign({}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function isImmediateCell (renderOpts: VxeColumnPropTypes.EditRender, params: any) {
  return params.$type === 'cell' || getInputImmediateModel(renderOpts)
}

function getCellLabelVNs (renderOpts: any, params: any, cellLabel: any) {
  const { placeholder } = renderOpts
  return [
    h('span', {
      class: 'vxe-cell--label'
    }, placeholder && isEmptyValue(cellLabel) ? [
      h('span', {
        class: 'vxe-cell--placeholder'
      }, formatText(getFuncText(placeholder), 1))
    ] : formatText(cellLabel, 1))
  ]
}

/**
 * 原生事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getElementOns (renderOpts: any, params: any, modelFunc?: any, changeFunc?: any) {
  const { events } = renderOpts
  const modelEvent = getModelEvent(renderOpts)
  const changeEvent = getChangeEvent(renderOpts)
  const isSameEvent = changeEvent === modelEvent
  const ons: any = {}
  if (events) {
    XEUtils.objectEach(events, (func, key: any) => {
      ons[getOnName(key)] = function (...args: any[]) {
        func(params, ...args)
      }
    })
  }
  if (modelFunc) {
    ons[getOnName(modelEvent)] = function (targetEvnt: any) {
      modelFunc(targetEvnt)
      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt)
      }
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt)
      }
    }
  }
  if (!isSameEvent && changeFunc) {
    ons[getOnName(changeEvent)] = function (...args: any[]) {
      changeFunc(...args)
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args)
      }
    }
  }
  return ons
}

/**
 * 组件事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getComponentOns (renderOpts: any, params: any, modelFunc?: any, changeFunc?: any) {
  const { events } = renderOpts
  const modelEvent = getModelEvent(renderOpts)
  const changeEvent = getChangeEvent(renderOpts)
  const ons: any = {}
  XEUtils.objectEach(events, (func, key: any) => {
    ons[getOnName(key)] = function (...args: any[]) {
      func(params, ...args)
    }
  })
  if (modelFunc) {
    ons[getOnName(modelEvent)] = function (targetEvnt: any) {
      modelFunc(targetEvnt)
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt)
      }
    }
  }
  if (changeFunc) {
    ons[getOnName(changeEvent)] = function (...args: any[]) {
      changeFunc(...args)
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args)
      }
    }
  }
  return ons
}

function getEditOns (renderOpts: any, params: any) {
  const { $table, row, column } = params
  const { name } = renderOpts
  const { model } = column
  const isImmediate = isImmediateCell(renderOpts, params)
  return getComponentOns(renderOpts, params, (cellValue: any) => {
    // 处理 model 值双向绑定
    if (isImmediate) {
      setCellValue(row, column, cellValue)
    } else {
      model.update = true
      model.value = cellValue
    }
  }, (eventParams: any) => {
    // 处理 change 事件相关逻辑
    if (!isImmediate && (name === '$input' || name === '$textarea')) {
      const cellValue = eventParams.value
      model.update = true
      model.value = cellValue
      $table.updateStatus(params, cellValue)
    } else {
      $table.updateStatus(params)
    }
  })
}

function getFilterOns (renderOpts: any, params: any, option: any) {
  return getComponentOns(renderOpts, params, (value: any) => {
    // 处理 model 值双向绑定
    option.data = value
  }, () => {
    handleConfirmFilter(params, !XEUtils.eqNull(option.data), option)
  })
}

function getItemOns (renderOpts: any, params: any) {
  const { $form, data, property } = params
  return getComponentOns(renderOpts, params, (value: any) => {
    // 处理 model 值双向绑定
    XEUtils.set(data, property, value)
  }, () => {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params)
  })
}

function getNativeEditOns (renderOpts: any, params: any) {
  const { $table, row, column } = params
  const { model } = column
  return getElementOns(renderOpts, params, (evnt: any) => {
    // 处理 model 值双向绑定
    const cellValue = evnt.target.value
    if (isImmediateCell(renderOpts, params)) {
      setCellValue(row, column, cellValue)
    } else {
      model.update = true
      model.value = cellValue
    }
  }, (evnt: any) => {
    // 处理 change 事件相关逻辑
    const cellValue = evnt.target.value
    $table.updateStatus(params, cellValue)
  })
}

function getNativeFilterOns (renderOpts: any, params: any, option: any) {
  return getElementOns(renderOpts, params, (evnt: any) => {
    // 处理 model 值双向绑定
    option.data = evnt.target.value
  }, () => {
    handleConfirmFilter(params, !XEUtils.eqNull(option.data), option)
  })
}

function getNativeItemOns (renderOpts: any, params: any) {
  const { $form, data, property } = params
  return getElementOns(renderOpts, params, (evnt: any) => {
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
function nativeEditRender (renderOpts: any, params: any) {
  const { row, column } = params
  const { name } = renderOpts
  const cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value
  return [
    h(name, {
      class: `vxe-default-${name}`,
      ...getNativeAttrs(renderOpts),
      value: cellValue,
      ...getNativeEditOns(renderOpts, params)
    })
  ]
}

function defaultEditRender (renderOpts: VxeGlobalRendererHandles.RenderEditOptions, params: VxeGlobalRendererHandles.RenderEditParams) {
  const { row, column } = params
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      ...getCellEditProps(renderOpts, params, cellValue),
      ...getEditOns(renderOpts, params)
    })
  ]
}

function defaultButtonEditRender (renderOpts: any, params: any) {
  return [
    h('vxe-button', {
      ...getCellEditProps(renderOpts, params, null),
      ...getComponentOns(renderOpts, params)
    })
  ]
}

function defaultButtonsEditRender (renderOpts: any, params: any) {
  return renderOpts.children.map((childRenderOpts: any) => defaultButtonEditRender(childRenderOpts, params)[0])
}

function renderNativeOptgroups (renderOpts: any, params: any, renderOptionsMethods: any) {
  const { optionGroups, optionGroupProps = {} } = renderOpts
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
  return optionGroups.map((group: any, gIndex: any) => {
    return h('optgroup', {
      key: gIndex,
      label: group[groupLabel]
    }, renderOptionsMethods(group[groupOptions], renderOpts, params))
  })
}

/**
 * 渲染原生的 option 标签
 */
function renderNativeOptions (options: any, renderOpts: any, params: any) {
  const { optionProps = {} } = renderOpts
  const { row, column } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value
  return options.map((option: any, oIndex: any) => {
    return h('option', {
      key: oIndex,
      value: option[valueProp],
      disabled: option[disabledProp],
      /* eslint-disable eqeqeq */
      selected: option[valueProp] == cellValue
    }, option[labelProp])
  })
}

function nativeFilterRender (renderOpts: any, params: any) {
  const { column } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  return column.filters.map((option: any, oIndex: any) => {
    return h(name, {
      key: oIndex,
      class: `vxe-default-${name}`,
      ...attrs,
      value: option.data,
      ...getNativeFilterOns(renderOpts, params, option)
    })
  })
}

function defaultFilterRender (renderOpts: any, params: any) {
  const { column } = params
  return column.filters.map((option: any, oIndex: any) => {
    const optionValue = option.data
    return h(getDefaultComponent(renderOpts), {
      key: oIndex,
      ...getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      ...getFilterOns(renderOpts, params, option)
    })
  })
}

function handleFilterMethod ({ option, row, column }: any) {
  const { data } = option
  const cellValue = XEUtils.get(row, column.property)
  /* eslint-disable eqeqeq */
  return cellValue == data
}

function nativeSelectEditRender (renderOpts: any, params: any) {
  return [
    h('select', {
      class: 'vxe-default-select',
      ...getNativeAttrs(renderOpts),
      ...getNativeEditOns(renderOpts, params)
    },
    renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params))
  ]
}

function defaultSelectEditRender (renderOpts: any, params: any) {
  const { row, column } = params
  const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      ...getCellEditProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps }),
      ...getEditOns(renderOpts, params)
    })
  ]
}

function getSelectCellValue (renderOpts: any, { row, column }: any) {
  const { props = {}, options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts
  const cellValue = XEUtils.get(row, column.property)
  let selectItem: any
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
  return ''
}

/**
 * 渲染表单-项
 * 用于渲染原生的标签
 */
function nativeItemRender (renderOpts: any, params: any) {
  const { data, property } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  const itemValue = XEUtils.get(data, property)
  return [
    h(name, {
      class: `vxe-default-${name}`,
      ...attrs,
      value: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : itemValue,
      ...getNativeItemOns(renderOpts, params)
    })
  ]
}

function defaultItemRender (renderOpts: any, params: any) {
  const { data, property } = params
  const itemValue = XEUtils.get(data, property)
  return [
    h(getDefaultComponent(renderOpts), {
      ...getComponentFormItemProps(renderOpts, params, itemValue),
      ...getItemOns(renderOpts, params)
    })
  ]
}

function defaultButtonItemRender (renderOpts: any, params: any) {
  return [
    h(resolveComponent('vxe-button') as ComponentOptions, {
      ...getComponentFormItemProps(renderOpts, params, null),
      ...getComponentOns(renderOpts, params)
    })
  ]
}

function defaultButtonsItemRender (renderOpts: any, params: any) {
  return renderOpts.children.map((childRenderOpts: any) => defaultButtonItemRender(childRenderOpts, params)[0])
}

/**
 * 渲染原生的 select 标签
 */
function renderNativeFormOptions (options: any, renderOpts: any, params: any) {
  const { data, property } = params
  const { optionProps = {} } = renderOpts
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const cellValue = XEUtils.get(data, property)
  return options.map((item: any, oIndex: any) => {
    return h('option', {
      key: oIndex,
      value: item[valueProp],
      disabled: item[disabledProp],
      /* eslint-disable eqeqeq */
      selected: item[valueProp] == cellValue
    }, item[labelProp])
  })
}

function handleExportSelectMethod (params: any) {
  const { row, column, options } = params
  return options.original ? getCellValue(row, column) : getSelectCellValue(column.editRender || column.cellRender, params)
}

/**
 * 渲染表单-项中
 * 单选框和复选框
 */
function defaultFormItemRadioAndCheckboxRender (renderOpts: any, params: any) {
  const { name, options, optionProps = {} } = renderOpts
  const { data, property } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const itemValue = XEUtils.get(data, property)
  const compName = getComponentName(name)
  return [
    h(resolveComponent(`${compName}-group`) as ComponentOptions, {
      ...getComponentFormItemProps(renderOpts, params, itemValue),
      ...getItemOns(renderOpts, params)
    }, {
      default: () => {
        return options.map((item: any, index: any) => {
          return h(resolveComponent(compName) as ComponentOptions, {
            key: index,
            label: item[valueProp],
            content: item[labelProp],
            disabled: item[disabledProp]
          })
        })
      }
    })
  ]
}

/**
 * 内置的组件渲染
 */
const renderMap: { [name: string]: any } = {
  input: {
    autofocus: 'input',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
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
    renderCell (renderOpts: any, params: any) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params))
    },
    renderFilter (renderOpts: any, params: any) {
      const { column } = params
      return column.filters.map((option: any, oIndex: any) => {
        return h('select', {
          key: oIndex,
          class: 'vxe-default-select',
          ...getNativeAttrs(renderOpts),
          ...getNativeFilterOns(renderOpts, params, option)
        },
        renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params))
      })
    },
    filterMethod: handleFilterMethod,
    renderItemContent (renderOpts: any, params: any) {
      return [
        h('select', {
          class: 'vxe-default-select',
          ...getNativeAttrs(renderOpts),
          ...getNativeItemOns(renderOpts, params)
        },
        renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(renderOpts.options, renderOpts, params))
      ]
    },
    cellExportMethod: handleExportSelectMethod
  },
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell (renderOpts: any, params: any) {
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
      return getCellLabelVNs(renderOpts, params, cellValue)
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: handleFilterMethod,
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
    renderCell (renderOpts: any, params: any) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params))
    },
    renderFilter (renderOpts: any, params: any) {
      const { column } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      return column.filters.map((option: any, oIndex: any) => {
        const optionValue = option.data
        return h(getDefaultComponent(renderOpts), {
          key: oIndex,
          ...getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
          ...getFilterOns(renderOpts, params, option)
        })
      })
    },
    filterMethod: handleFilterMethod,
    renderItemContent (renderOpts: any, params: any) {
      const { data, property } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      const itemValue = XEUtils.get(data, property)
      return [
        h(getDefaultComponent(renderOpts), {
          ...getComponentFormItemProps(renderOpts, params, itemValue, { options, optionProps, optionGroups, optionGroupProps }),
          ...getItemOns(renderOpts, params)
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
export const renderer: VxeGlobalRenderer = {
  mixin (opts) {
    XEUtils.each(opts, (options, name) => renderer.add(name, options))
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
