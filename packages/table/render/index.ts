import { CreateElement, VNode } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getCellValue, setCellValue } from '../src/util'
import { getFuncText, formatText, isEmptyValue } from '../../ui/src/utils'
import { getOnName, getModelEvent, getChangeEvent, hasInputType } from '../../ui/src/vn'
import { createComponentLog } from '../../ui/src/log'

import type { VxeGlobalRendererHandles, VxeColumnPropTypes, VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines, TableReactData } from '../../../types'

const { errLog } = createComponentLog('table')

const { getConfig, renderer, getI18n, getComponent } = VxeUI

const componentDefaultModelProp = 'value'

const defaultCompProps = {}

function handleDefaultValue (value: any, defaultVal: any, initVal: any) {
  return XEUtils.eqNull(value) ? (XEUtils.eqNull(defaultVal) ? initVal : defaultVal) : value
}

function parseDate (value: any, props: any) {
  return value && props.valueFormat ? XEUtils.toStringDate(value, props.valueFormat) : value
}

function getFormatDate (value: any, props: any, defaultFormat: string) {
  const { dateConfig = {} } = props
  return XEUtils.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat)
}

function getLabelFormatDate (value: any, props: any) {
  return getFormatDate(value, props, getI18n(`vxe.input.date.labelFormat.${props.type || 'date'}`))
}

/**
 * 已废弃
 * @deprecated
 */
function getOldComponentName (name: string) {
  return `vxe-${name.replace('$', '')}`
}

/**
 * 已废弃
 * @deprecated
 */
function getOldComponent ({ name }: any) {
  return getOldComponentName(name)
}

function getDefaultComponent ({ name }: any) {
  return getComponent(name) || name
}

function updateFilterChangeOption (params: VxeGlobalRendererHandles.RenderTableFilterParams | VxeGlobalRendererHandles.RenderTableFloatingFilterParams, checked: boolean, option: VxeTableDefines.FilterOption) {
  const { $table } = params
  $table.updateFilterOptionStatus(option, checked)
}

function saveFilterEvent (params: VxeGlobalRendererHandles.RenderTableFilterParams | VxeGlobalRendererHandles.RenderTableFloatingFilterParams) {
  const { $table, column } = params
  $table.saveFilterByEvent(new Event('change'), column)
}

function getNativeAttrs (renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions) {
  let { name, attrs } = renderOpts
  if (name === 'input') {
    attrs = Object.assign({ type: 'text' }, attrs)
  }
  return attrs
}

function getInputImmediateModel (renderOpts: VxeColumnPropTypes.EditRender) {
  const { name, immediate, props } = renderOpts
  if (!immediate) {
    if (name === 'VxeInput' || name === '$input') {
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

function getCellEditFilterProps (renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: any, value: any, defaultProps?: any) {
  return XEUtils.assign({}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value })
}

function isImmediateCell (renderOpts: VxeColumnPropTypes.EditRender, params: any) {
  return params.$type === 'cell' || getInputImmediateModel(renderOpts)
}

function getCellLabelVNs (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any, cellLabel: any, opts?: {
  class?: string
}) {
  const { placeholder } = renderOpts
  return [
    h('span', {
      key: 1,
      class: ['vxe-cell--label', opts ? opts.class : '']
    }, placeholder && isEmptyValue(cellLabel)
      ? [
          h('span', {
            class: 'vxe-cell--placeholder'
          }, formatText(getFuncText(placeholder), 1))
        ]
      : formatText(cellLabel, 1))
  ]
}

/**
 * 原生事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getNativeElementOns (renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions | VxeGlobalRendererHandles.RenderTableFilterOptions, params: any, eFns?: {
  model: (evnt: Event) => void
  change?: (evnt: Event) => void
  blur?: (evnt: Event) => void
}) {
  const { events } = renderOpts
  const modelEvent = getModelEvent(renderOpts)
  const changeEvent = getChangeEvent(renderOpts)
  const { model: modelFunc, change: changeFunc, blur: blurFunc } = eFns || {}
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
    ons[getOnName(changeEvent)] = function (evnt: Event) {
      changeFunc(evnt)
      if (events && events[changeEvent]) {
        events[changeEvent](params, evnt)
      }
    }
  }
  if (blurFunc) {
    ons[getOnName(blurEvent)] = function (evnt: Event) {
      blurFunc(evnt)
      if (events && events[blurEvent]) {
        events[blurEvent](params, evnt)
      }
    }
  }
  return ons
}

const blurEvent = 'blur'
const clearEvent = 'clear'

/**
 * 组件事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getComponentOns (renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions | VxeGlobalRendererHandles.RenderTableFilterOptions, params: any, eFns?: {
  model: (cellValue: any) => void
  change?: (...args: any[]) => void
  blur?: (...args: any[]) => void
  clear?: (...args: any[]) => void
}, eventOns?: Record<string, any>) {
  const { events } = renderOpts
  const modelEvent = getModelEvent(renderOpts)
  const changeEvent = getChangeEvent(renderOpts)
  const { model: modelFunc, change: changeFunc, blur: blurFunc, clear: clearFunc } = eFns || {}
  const ons: any = {}
  XEUtils.objectEach(events, (func, key: any) => {
    ons[getOnName(key)] = function (...args: any[]) {
      if (!XEUtils.isFunction(func)) {
        errLog('vxe.error.errFunc', [func])
      }
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
  if (blurFunc) {
    ons[getOnName(blurEvent)] = function (...args: any[]) {
      blurFunc(...args)
      if (events && events[blurEvent]) {
        events[blurEvent](params, ...args)
      }
    }
  }
  if (clearFunc) {
    ons[getOnName(clearEvent)] = function (...args: any[]) {
      clearFunc(...args)
      if (events && events[clearEvent]) {
        events[clearEvent](params, ...args)
      }
    }
  }
  return eventOns ? Object.assign(ons, eventOns) : ons
}

function getEditOns (renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, row, column } = params
  const { name } = renderOpts
  const { model } = column
  const isImmediate = isImmediateCell(renderOpts, params)
  return getComponentOns(renderOpts, params, {
    model (cellValue) {
      // 处理 model 值双向绑定
      model.update = true
      model.value = cellValue
      if (isImmediate) {
        setCellValue(row, column, cellValue)
      }
    },
    change (eventParams) {
      // 处理 change 事件相关逻辑
      if (!isImmediate && name && (['VxeInput', 'VxeNumberInput', 'VxeTextarea', '$input', '$textarea'].includes(name))) {
        const cellValue = eventParams.value
        model.update = true
        model.value = cellValue
        $table.updateStatus(params, cellValue)
      } else {
        $table.updateStatus(params)
      }
    },
    blur () {
      if (isImmediate) {
        $table.handleCellRuleUpdateStatus('blur', params)
      } else {
        $table.handleCellRuleUpdateStatus('blur', params, model.value)
      }
    }
  })
}

function getFilterOns (renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: VxeGlobalRendererHandles.RenderTableFilterParams, option: VxeTableDefines.FilterOption) {
  return getComponentOns(renderOpts, params, {
    model (value) {
      // 处理 model 值双向绑定
      option.data = value
    },
    change () {
      updateFilterChangeOption(params, !isEmptyValue(option.data), option)
    },
    blur () {
      updateFilterChangeOption(params, !isEmptyValue(option.data), option)
    }
  })
}

function getFloatingFilterOns (renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: VxeGlobalRendererHandles.RenderTableFloatingFilterParams, option: VxeTableDefines.FilterOption) {
  const { $table, column } = params
  if (hasInputType(renderOpts)) {
    return getComponentOns(renderOpts, params, {
      model (value: any) {
        // 处理 model 值双向绑定
        option.data = value
      },
      change () {
        updateFilterChangeOption(params, !isEmptyValue(option.data), option)
      },
      clear () {
        updateFilterChangeOption(params, !isEmptyValue(option.data), option)
        saveFilterEvent(params)
      },
      blur () {
        $table.saveFilterByEvent(new Event('change'), column)
      }
    }, renderOpts.name === 'VxeNumberInput'
      ? {
          [getOnName('plus-number')] () {
            updateFilterChangeOption(params, !isEmptyValue(option.data), option)
            saveFilterEvent(params)
          },
          [getOnName('minus-number')] () {
            updateFilterChangeOption(params, !isEmptyValue(option.data), option)
            saveFilterEvent(params)
          }
        }
      : {})
  }
  return getComponentOns(renderOpts, params, {
    model (value: any) {
      // 处理 model 值双向绑定
      option.data = value
    },
    clear () {
      updateFilterChangeOption(params, !isEmptyValue(option.data), option)
      $table.saveFilterByEvent(new Event('change'), column)
    },
    change () {
      updateFilterChangeOption(params, !isEmptyValue(option.data), option)
      $table.saveFilterByEvent(new Event('change'), column)
    }
  })
}

function getNativeEditOns (renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any) {
  const { $table, row, column } = params
  const { model } = column
  return getNativeElementOns(renderOpts, params, {
    model (evnt) {
      // 处理 model 值双向绑定
      const targetEl = evnt.target as HTMLInputElement
      if (targetEl) {
        const cellValue = targetEl.value
        if (isImmediateCell(renderOpts, params)) {
          setCellValue(row, column, cellValue)
        } else {
          model.update = true
          model.value = cellValue
        }
      }
    },
    change (evnt) {
      // 处理 change 事件相关逻辑
      const targetEl = evnt.target as HTMLInputElement
      if (targetEl) {
        const cellValue = targetEl.value
        $table.updateStatus(params, cellValue)
      }
    },
    blur (evnt) {
      const targetEl = evnt.target as HTMLInputElement
      if (targetEl) {
        const cellValue = targetEl.value
        $table.updateStatus(params, cellValue)
      }
    }
  })
}

function getNativeFilterOns (renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: any, option: any) {
  return getNativeElementOns(renderOpts, params, {
    model (evnt) {
      // 处理 model 值双向绑定
      const targetEl = evnt.target as HTMLInputElement
      if (targetEl) {
        option.data = targetEl.value
      }
    },
    change () {
      updateFilterChangeOption(params, !XEUtils.eqNull(option.data), option)
    },
    blur () {
      updateFilterChangeOption(params, !XEUtils.eqNull(option.data), option)
    }
  })
}

function nativeInputCellRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions, renderParams: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { row, column } = renderParams
  const cellValue = XEUtils.get(row, column.field)
  const cellVNs = [
    h('span', {
      key: 1
    }, cellValue)
  ]
  return getNativeInputRenderCellVNs(h, cellValue, cellVNs, renderOpts, renderParams)
}

/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea
 */
function nativeInputEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, renderParams: VxeGlobalRendererHandles.RenderTableEditParams) {
  const { row, column } = renderParams
  const { name } = renderOpts
  const cellValue = isImmediateCell(renderOpts, renderParams) ? getCellValue(row, column) : column.model.value
  return [
    h('' + name, {
      key: 2,
      class: `vxe-default-${name}`,
      attrs: getNativeAttrs(renderOpts),
      domProps: {
        value: cellValue
      },
      on: getNativeEditOns(renderOpts, renderParams)
    })
  ]
}

function buttonCellRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions, params: any) {
  return [
    h(getDefaultComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, null),
      on: getComponentOns(renderOpts, params)
    })
  ]
}

function defaultInputEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { row, column } = params
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      key: 2,
      props: getCellEditProps(renderOpts, params, cellValue),
      on: getEditOns(renderOpts, params)
    })
  ]
}

function defaultEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { row, column } = params
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, cellValue),
      on: getEditOns(renderOpts, params)
    })
  ]
}

function checkboxEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { row, column } = params
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, cellValue),
      on: getEditOns(renderOpts, params)
    })
  ]
}

function radioAndCheckboxGroupEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { options } = renderOpts
  const { row, column } = params
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      props: {
        options,
        ...getCellEditProps(renderOpts, params, cellValue)
      },
      on: getEditOns(renderOpts, params)
    })
  ]
}

/**
 * 已废弃
 * @deprecated
 */
function oldEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { row, column } = params
  const cellValue = getCellValue(row, column)
  return [
    h(getOldComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, cellValue),
      on: getEditOns(renderOpts, params)
    })
  ]
}

/**
 * 已废弃
 * @deprecated
 */
function oldButtonEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any) {
  return [
    h('vxe-button', {
      props: getCellEditProps(renderOpts, params, null),
      on: getComponentOns(renderOpts, params)
    })
  ]
}

/**
 * 已废弃
 * @deprecated
 */
function oldButtonsEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: any) {
  const { children } = renderOpts
  return children ? children.map((childRenderOpts: any) => oldButtonEditRender(h, childRenderOpts, params)[0]) : []
}

function renderNativeOptgroups (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions, params: any, renderOptionsMethods: any) {
  const { optionGroups, optionGroupProps = {} } = renderOpts
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
  if (optionGroups) {
    return optionGroups.map((group: any, gIndex: any) => {
      return h('optgroup', {
        key: gIndex,
        attrs: {
          label: group[groupLabel]
        }
      }, renderOptionsMethods(h, group[groupOptions], renderOpts, params))
    })
  }
  return []
}

/**
 * 渲染原生的 option 标签
 */
function renderNativeOptions (h: CreateElement, options: any, renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: any) {
  const { optionProps = {} } = renderOpts
  const { row, column } = params
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  const cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value
  if (options) {
    return options.map((option: any, oIndex: any) => {
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
  return []
}

function nativeFilterRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: VxeGlobalRendererHandles.RenderTableFilterParams) {
  const { column } = params
  const { name } = renderOpts
  const attrs = getNativeAttrs(renderOpts)
  return column.filters.map((option, oIndex) => {
    return h(`${name}`, {
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

function defaultFilterRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: VxeGlobalRendererHandles.RenderTableFilterParams) {
  const { column } = params
  return column.filters.map((option, oIndex) => {
    const optionValue = option.data
    return h(getDefaultComponent(renderOpts), {
      key: oIndex,
      props: getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      on: getFilterOns(renderOpts, params, option)
    })
  })
}

function defaultFloatingFilterRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableFloatingFilterOptions, params: VxeGlobalRendererHandles.RenderTableFloatingFilterParams) {
  const { option } = params
  const optionValue = option.data
  return [
    h(getDefaultComponent(renderOpts), {
      props: getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      on: getFloatingFilterOns(renderOpts, params, option)
    })
  ]
}

function defaultFilterOptions () {
  return [
    { data: null }
  ]
}

/**
 * 已废弃
 * @deprecated
 */
function oldFilterRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, params: any) {
  const { column } = params
  return column.filters.map((option: any, oIndex: any) => {
    const optionValue = option.data
    return h(getOldComponent(renderOpts), {
      key: oIndex,
      props: getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      on: getFilterOns(renderOpts, params, option)
    })
  })
}

function handleFilterMethod ({ option, row, column }: any) {
  const { data } = option
  const cellValue = XEUtils.get(row, column.field)
  /* eslint-disable eqeqeq */
  return cellValue == data
}

function handleInputFilterMethod ({ option, row, column }: any) {
  const { data } = option
  const cellValue = XEUtils.get(row, column.field)
  /* eslint-disable eqeqeq */
  return XEUtils.toValueString(cellValue).indexOf(data) > -1
}

function nativeSelectEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any) {
  return [
    h('select', {
      class: 'vxe-default-select',
      attrs: getNativeAttrs(renderOpts),
      on: getNativeEditOns(renderOpts, params)
    },
    renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))
  ]
}

function defaultSelectEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any) {
  const { row, column } = params
  const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps }),
      on: getEditOns(renderOpts, params)
    })
  ]
}

function defaultTableOrTreeSelectEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any) {
  const { row, column } = params
  const { options, optionProps } = renderOpts
  const cellValue = getCellValue(row, column)
  return [
    h(getDefaultComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, cellValue, { options, optionProps }),
      on: getEditOns(renderOpts, params)
    })
  ]
}

/**
 * 已废弃
 * @deprecated
 */
function oldSelectEditRender (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: any) {
  const { row, column } = params
  const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
  const cellValue = getCellValue(row, column)
  return [
    h(getOldComponent(renderOpts), {
      props: getCellEditProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps }),
      on: getEditOns(renderOpts, params)
    })
  ]
}

function handleSelectCellValue (cellValue: any, renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions) {
  const { options, optionGroups, optionProps = {}, optionGroupProps = {}, props = {} } = renderOpts
  let selectItem: any
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  if (!(cellValue === null || cellValue === undefined)) {
    let vals = []
    if (XEUtils.isArray(cellValue)) {
      vals = cellValue
    } else {
      if (props.multiple && `${cellValue}`.indexOf(',') > -1) {
        vals = `${cellValue}`.split(',')
      } else {
        vals = [cellValue]
      }
    }
    return XEUtils.map(vals, optionGroups
      ? (value) => {
          const groupOptions = optionGroupProps.options || 'options'
          for (let index = 0; index < optionGroups.length; index++) {
            /* eslint-disable eqeqeq */
            selectItem = XEUtils.find(optionGroups[index][groupOptions], item => item[valueProp] == value)
            if (selectItem) {
              break
            }
          }
          return selectItem ? selectItem[labelProp] : value
        }
      : (value) => {
          /* eslint-disable eqeqeq */
          selectItem = XEUtils.find(options, item => item[valueProp] == value)
          return selectItem ? selectItem[labelProp] : value
        }
    ).join(', ')
  }
  return ''
}

function getSelectCellValue (renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions, { row, column }: any) {
  const cellValue = XEUtils.get(row, column.field)
  return handleSelectCellValue(cellValue, renderOpts)
}

function handleExportSelectMethod (params: any) {
  const { row, column, options } = params
  return options.original ? getCellValue(row, column) : getSelectCellValue(column.editRender || column.cellRender, params)
}

function handleTreeSelectCellValue (cellValue: any, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions) {
  const { options, optionProps = {} } = renderOpts
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const childrenProp = optionProps.children || 'children'
  if (!(cellValue === null || cellValue === undefined)) {
    const keyMaps: Record<string, any> = {}
    XEUtils.eachTree(options, item => {
      keyMaps[XEUtils.get(item, valueProp)] = item
    }, { children: childrenProp })
    return XEUtils.map(XEUtils.isArray(cellValue) ? cellValue : [cellValue], (value) => {
      const item = keyMaps[value]
      return item ? XEUtils.get(item, labelProp) : item
    }
    ).join(', ')
  }
  return ''
}

function getTreeSelectCellValue (renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, { row, column }: any) {
  const cellValue = XEUtils.get(row, column.field)
  return handleTreeSelectCellValue(cellValue, renderOpts)
}

function handleExportTreeSelectMethod (params: any) {
  const { row, column, options } = params
  return options.original ? getCellValue(row, column) : getTreeSelectCellValue(column.editRender || column.cellRender, params)
}

function handleNumberCell (h: CreateElement, cellValue: any, renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.RenderTableDefaultParams) {
  const { props = {}, showNegativeStatus } = renderOpts
  const { type } = props
  let isNegative = false
  if (!isEmptyValue(cellValue)) {
    const numberInputConfig = getConfig().numberInput || {}
    if (type === 'float') {
      const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true)
      const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 1)
      cellValue = XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
      if (!autoFill) {
        cellValue = XEUtils.toNumber(cellValue)
      }
      if (showNegativeStatus) {
        if (cellValue < 0) {
          isNegative = true
        }
      }
    } else if (type === 'amount') {
      const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true)
      const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 2)
      const showCurrency = handleDefaultValue(props.showCurrency, numberInputConfig.showCurrency, false)
      cellValue = XEUtils.toNumber(cellValue)
      if (showNegativeStatus) {
        if (cellValue < 0) {
          isNegative = true
        }
      }
      cellValue = XEUtils.commafy(cellValue, { digits })
      if (!autoFill) {
        const [iStr, dStr] = cellValue.split('.')
        if (dStr) {
          const dRest = dStr.replace(/0+$/, '')
          cellValue = dRest ? [iStr, '.', dRest].join('') : iStr
        }
      }
      if (showCurrency) {
        cellValue = `${props.currencySymbol || numberInputConfig.currencySymbol || getI18n('vxe.numberInput.currencySymbol') || ''}${cellValue}`
      }
    } else {
      if (type === 'integer') {
        cellValue = XEUtils.toInteger(cellValue)
      }
      if (showNegativeStatus) {
        if (XEUtils.toNumber(cellValue) < 0) {
          isNegative = true
        }
      }
    }
  }
  return getCellLabelVNs(h, renderOpts, params, cellValue, isNegative
    ? {
        class: 'is--negative'
      }
    : {})
}

function handleFormatDatePicker (renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellFormatterParams) {
  const { props = {} } = renderOpts
  const { cellValue } = params
  if (cellValue) {
    if (props.type !== 'time') {
      return getLabelFormatDate(cellValue, props)
    }
  }
  return cellValue
}

function handleFormatSelect (renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellFormatterParams | VxeGlobalRendererHandles.TableCellCopyMethodParams) {
  const { cellValue } = params
  return handleSelectCellValue(cellValue, renderOpts)
}

function handleSetSelectValue (renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellFormatterParams | VxeGlobalRendererHandles.TableCellCopyMethodParams) {
  const { row, column, cellValue } = params
  const { field } = column
  if (field) {
    const { options, optionGroups, optionProps = {}, optionGroupProps = {}, props } = renderOpts
    if (isEmptyValue(cellValue)) {
      XEUtils.set(row, field, props && props.multiple ? [] : null)
      return
    }
    const isMultiVal = XEUtils.indexOf(`${cellValue}`, ',') > -1
    const labelProp = optionProps.label || 'label'
    const valueProp = optionProps.value || 'value'
    const labelMpas: Record<string, any> = {}
    if (optionGroups && optionGroups.length) {
      const groupOptions = optionGroupProps.options || 'options'
      for (let i = 0; i < optionGroups.length; i++) {
        const opts = optionGroups[i][groupOptions] || {}
        for (let j = 0; j < opts.length; j++) {
          const item = opts[j]
          if (isMultiVal) {
            labelMpas[item[labelProp]] = item
            /* eslint-disable eqeqeq */
          } else if (item[labelProp] == cellValue) {
            XEUtils.set(row, field, item[valueProp])
            return
          }
        }
      }
    } else {
      if (options) {
        for (let i = 0; i < options.length; i++) {
          const item = options[i]
          if (isMultiVal) {
            labelMpas[item[labelProp]] = item
            /* eslint-disable eqeqeq */
          } else if (item[labelProp] == cellValue) {
            XEUtils.set(row, field, item[valueProp])
            return
          }
        }
      }
    }
    if (isMultiVal) {
      XEUtils.set(row, field, (isMultiVal
        ? cellValue.split(',')
        : [cellValue]).map((label: any) => {
        const item = labelMpas[label]
        return item ? item[valueProp] : label
      }))
    } else {
      XEUtils.set(row, field, cellValue)
    }
  }
}

function handleFormatTreeSelect (renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellFormatterParams | VxeGlobalRendererHandles.TableCellCopyMethodParams) {
  const { cellValue } = params
  return handleTreeSelectCellValue(cellValue, renderOpts)
}

function handleSetTreeSelectValue (renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellFormatterParams | VxeGlobalRendererHandles.TableCellCopyMethodParams) {
  const { row, column, cellValue } = params
  const { field } = column
  if (field) {
    const { options, optionProps = {} } = renderOpts
    const labelProp = optionProps.label || 'label'
    const valueProp = optionProps.value || 'value'
    const childrenProp = optionProps.children || 'children'
    const matchRest = XEUtils.findTree(options || [], item => XEUtils.get(item, labelProp) === cellValue, { children: childrenProp })
    if (matchRest) {
      const selectItem = matchRest.item
      if (selectItem) {
        XEUtils.set(row, field, selectItem[valueProp])
        return
      }
    }
    XEUtils.set(row, field, cellValue)
  }
}

function getNativeInputRenderCellVNs (h: CreateElement, cellValue: any, labelVNs: VNode[], renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, renderParams: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, row, column } = renderParams
  const { name } = renderOpts
  const tableProps = $table
  const { editConfig, mouseConfig } = tableProps
  let isColSelected = false
  let isActiveCellArea = false
  if (editConfig && mouseConfig) {
    const tableReactData = $table as unknown as TableReactData
    const { editStore } = tableReactData
    const { selected } = editStore
    isColSelected = row === selected.row && column === selected.column
    if ($table.getActiveCellArea) {
      const activeCellArea = $table.getActiveCellArea()
      if (activeCellArea) {
        isActiveCellArea = row === activeCellArea.row && column === activeCellArea.column
      }
    }
  }
  const cellVNs = labelVNs
  if (isActiveCellArea || isColSelected) {
    cellVNs.push(
      h('' + name, {
        key: 2,
        class: `vxe-default-${name} vxe-reusekeep-control`,
        attrs: getNativeAttrs(renderOpts),
        domProps: {
          value: cellValue
        },
        on: getNativeEditOns(renderOpts, renderParams)
      })
    )
  }
  return cellVNs
}

function getInputRenderCellVNs (h: CreateElement, cellValue: any, labelVNs: VNode[], renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, renderParams: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, row, column } = renderParams
  const tableProps = $table
  const { editConfig, mouseConfig } = tableProps
  let isColSelected = false
  let isActiveCellArea = false
  if (editConfig && mouseConfig) {
    const tableReactData = $table as unknown as TableReactData
    const { editStore } = tableReactData
    const editOpts = $table.computeEditOpts
    if (editOpts.isReuseKeep) {
      const { selected } = editStore
      isColSelected = row === selected.row && column === selected.column
      if ($table.getActiveCellArea) {
        const activeCellArea = $table.getActiveCellArea()
        if (activeCellArea) {
          isActiveCellArea = row === activeCellArea.row && column === activeCellArea.column
        }
      }
    }
  }
  const cellVNs = labelVNs
  if (isActiveCellArea || isColSelected) {
    const compProps = getCellEditProps(renderOpts, renderParams, cellValue)
    const { className, inputClassName } = compProps
    cellVNs.push(
      h(getDefaultComponent(renderOpts), {
        key: 2,
        props: {
          ...compProps,
          className: 'vxe-reusekeep-control' + (className ? (' ' + className) : ''),
          inputClassName: 'vxe-reusekeep-control' + (inputClassName ? (' ' + inputClassName) : '')
        },
        on: getEditOns(renderOpts, renderParams)
      })
    )
  }
  return cellVNs
}

/**
 * 表格 - 渲染器
 */
renderer.mixin({
  input: {
    tableAutoFocus: true,
    renderTableEdit: nativeInputEditRender,
    renderTableCell: nativeInputCellRender,
    renderTableDefault: nativeInputEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: nativeFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod
  },
  textarea: {
    tableAutoFocus: true,
    renderTableEdit: nativeInputEditRender,
    renderTableCell: nativeInputCellRender,
    renderTableDefault: nativeInputEditRender
  },
  select: {
    renderTableEdit: nativeSelectEditRender,
    renderTableDefault: nativeSelectEditRender,
    renderTableCell (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    renderTableFilter (h, renderOpts, params) {
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
    tableCellFormatter: handleFormatSelect,
    tableCellCopyMethod: handleFormatSelect,
    tableCellPasteMethod: handleSetSelectValue,
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  VxeInput: {
    tableAutoFocus: true,
    renderTableEdit: defaultInputEditRender,
    renderTableCell (h, renderOpts, renderParams: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { props = {} } = renderOpts
      const { row, column } = renderParams
      const inputConfig = getConfig().input || {}
      const digits = props.digits || inputConfig.digits || 2
      let cellValue = XEUtils.get(row, column.field)
      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'quarter':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props)
            break
          case 'float':
            cellValue = XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
            break
        }
      }
      const cellVNs = getCellLabelVNs(h, renderOpts, renderParams, cellValue)
      return getInputRenderCellVNs(h, cellValue, cellVNs, renderOpts, renderParams)
    },
    renderTableDefault: defaultInputEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: defaultFilterRender,
    renderTableFloatingFilter: defaultFloatingFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod
  },
  FormatNumberInput: {
    renderTableDefault (h, renderOpts, renderParams) {
      const { row, column } = renderParams
      const cellValue = XEUtils.get(row, column.field)
      return handleNumberCell(h, cellValue, renderOpts, renderParams)
    },
    tableFilterDefaultMethod ({ option, row, column }) {
      const { data } = option
      const cellValue = XEUtils.get(row, column.field)
      /* eslint-disable eqeqeq */
      return cellValue == data
    },
    tableExportMethod (params) {
      const { row, column } = params
      const cellValue = XEUtils.get(row, column.field)
      return cellValue
    }
  },
  VxeNumberInput: {
    tableAutoFocus: true,
    renderTableEdit: defaultInputEditRender,
    renderTableCell (h, renderOpts, renderParams: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = renderParams
      const cellValue = XEUtils.get(row, column.field)
      const cellVNs = handleNumberCell(h, cellValue, renderOpts, renderParams)
      return getInputRenderCellVNs(h, cellValue, cellVNs, renderOpts, renderParams)
    },
    renderTableFooter (h, renderOpts, params) {
      const { props = {} } = renderOpts
      const { row, column, _columnIndex } = params
      const { type } = props
      // 兼容老模式
      const itemValue = XEUtils.isArray(row) ? row[_columnIndex] : XEUtils.get(row, column.field)
      if (XEUtils.isNumber(itemValue)) {
        const numberInputConfig = getConfig().numberInput || {}
        if (type === 'float') {
          const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true)
          const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 1)
          let amountLabel = XEUtils.toFixed(XEUtils.floor(itemValue, digits), digits)
          if (!autoFill) {
            amountLabel = '' + XEUtils.toNumber(amountLabel)
          }
          return amountLabel
        } else if (type === 'amount') {
          const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true)
          const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 2)
          const showCurrency = handleDefaultValue(props.showCurrency, numberInputConfig.showCurrency, false)
          let amountLabel = XEUtils.commafy(XEUtils.toNumber(itemValue), { digits })
          if (!autoFill) {
            const [iStr, dStr] = amountLabel.split('.')
            if (dStr) {
              const dRest = dStr.replace(/0+$/, '')
              amountLabel = dRest ? [iStr, '.', dRest].join('') : iStr
            }
          }
          if (showCurrency) {
            amountLabel = `${props.currencySymbol || numberInputConfig.currencySymbol || getI18n('vxe.numberInput.currencySymbol') || ''}${amountLabel}`
          }
          return amountLabel
        }
      }
      return getFuncText(itemValue, 1)
    },
    renderTableDefault: defaultInputEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: defaultFilterRender,
    renderTableFloatingFilter: defaultFloatingFilterRender,
    tableFilterDefaultMethod ({ option, row, column }) {
      const { data } = option
      const cellValue = XEUtils.get(row, column.field)
      /* eslint-disable eqeqeq */
      return cellValue == data
    },
    tableExportMethod (params) {
      const { row, column } = params
      const cellValue = XEUtils.get(row, column.field)
      return cellValue
    }
  },
  VxeDatePicker: {
    tableAutoFocus: true,
    renderTableEdit: defaultEditRender,
    renderTableCell (h, renderOpts, params) {
      const props = renderOpts.props || {}
      const { $table, row, column } = params
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        getResult ({ cellValue }) {
          if (cellValue) {
            if (props.type !== 'time') {
              return getLabelFormatDate(cellValue, props)
            }
          }
          return cellValue
        }
      })
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    tableCellFormatter: handleFormatDatePicker,
    renderTableDefault: defaultEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: defaultFilterRender,
    renderTableFloatingFilter: defaultFloatingFilterRender,
    tableFilterDefaultMethod: handleFilterMethod
  },
  VxeDateRangePicker: {
    tableAutoFocus: true,
    renderTableEdit (h: CreateElement, renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { startField, endField } = renderOpts
      const { $table, row, column } = params
      const { model } = column
      const cellValue = getCellValue(row, column)
      const seProps: Record<string, any> = {}
      const seOs: Record<string, any> = {}
      if (startField && endField) {
        seProps.startValue = XEUtils.get(row, startField)
        seProps.endValue = XEUtils.get(row, endField)
        seOs['update:startValue'] = (value: any) => {
          if (startField) {
            XEUtils.set(row, startField, value)
          }
        }
        seOs['update:endValue'] = (value: any) => {
          if (endField) {
            XEUtils.set(row, endField, value)
          }
        }
      }
      return [
        h(getDefaultComponent(renderOpts), {
          props: getCellEditProps(renderOpts, params, cellValue, seProps),
          on: getComponentOns(renderOpts, params, {
            model (cellValue) {
              model.update = true
              model.value = cellValue
              setCellValue(row, column, cellValue)
            },
            change () {
              $table.updateStatus(params)
            },
            blur () {
              $table.handleCellRuleUpdateStatus('blur', params)
            }
          }, seOs)
        })
      ]
    },
    renderTableDefault (h, renderOpts, params) {
      const { startField, endField } = renderOpts
      const { row, column } = params
      const { model } = column
      const cellValue = getCellValue(row, column)
      const seProps: Record<string, any> = {}
      const seOs: Record<string, any> = {}
      if (startField && endField) {
        seProps.startValue = XEUtils.get(row, startField)
        seProps.endValue = XEUtils.get(row, endField)
        seOs['update:startValue'] = (value: any) => {
          if (startField) {
            XEUtils.set(row, startField, value)
          }
        }
        seOs['update:endValue'] = (value: any) => {
          if (endField) {
            XEUtils.set(row, endField, value)
          }
        }
      }
      return [
        h(getDefaultComponent(renderOpts), {
          props: getCellEditProps(renderOpts, params, cellValue, seProps),
          on: getComponentOns(renderOpts, params, {
            model (cellValue) {
              model.update = true
              model.value = cellValue
              setCellValue(row, column, cellValue)
            }
          }, seOs)
        })
      ]
    },
    renderTableCell (h, renderOpts, params) {
      const { startField, endField } = renderOpts
      const { row, column } = params
      let startValue = ''
      let endValue = ''
      if (startField && endField) {
        startValue = XEUtils.get(row, startField)
        endValue = XEUtils.get(row, endField)
      } else {
        const cellValue = XEUtils.get(row, column.field)
        if (cellValue) {
          if (XEUtils.isArray(cellValue)) {
            startValue = cellValue[0]
            endValue = cellValue[1]
          } else {
            const strs = `${cellValue}`.split(',')
            startValue = strs[0]
            endValue = strs[1]
          }
        }
      }
      let cellLabel = ''
      if (startValue && endValue) {
        cellLabel = `${startValue} ~ ${endValue}`
      }
      return getCellLabelVNs(h, renderOpts, params, cellLabel)
    }
  },
  VxeTextarea: {
    tableAutoFocus: true,
    renderTableDefault: defaultInputEditRender,
    renderTableCell (h, renderOpts, renderParams: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = renderParams
      const cellValue = XEUtils.get(row, column.field)
      const cellVNs = getCellLabelVNs(h, renderOpts, renderParams, cellValue)
      return getInputRenderCellVNs(h, cellValue, cellVNs, renderOpts, renderParams)
    },
    renderTableEdit: defaultInputEditRender
  },
  VxeButton: {
    renderTableDefault: buttonCellRender
  },
  VxeButtonGroup: {
    renderTableDefault (h, renderOpts, params) {
      const { options } = renderOpts
      return [
        h(getDefaultComponent(renderOpts), {
          props: {
            options,
            ...getCellEditProps(renderOpts, params, null)
          },
          on: getComponentOns(renderOpts, params)
        })
      ]
    }
  },
  VxeSelect: {
    tableAutoFocus: true,
    renderTableEdit: defaultSelectEditRender,
    renderTableDefault: defaultSelectEditRender,
    renderTableCell (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter (h, renderOpts, params) {
      const { column } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data
        return h(getDefaultComponent(renderOpts), {
          key: oIndex,
          props: getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
          on: getFilterOns(renderOpts, params, option)
        })
      })
    },
    renderTableFloatingFilter (h, renderOpts, params) {
      const { option } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      const optionValue = option.data
      return h(getDefaultComponent(renderOpts), {
        props: getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
        on: getFloatingFilterOns(renderOpts, params, option)
      })
    },
    tableCellFormatter: handleFormatSelect,
    tableCellCopyMethod: handleFormatSelect,
    tableCellPasteMethod: handleSetSelectValue,
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  VxeText: {
    renderTableDefault (h, renderOpts, params) {
      const { $table, row, column } = params
      const { props } = renderOpts
      const cellLabel = $table.getCellLabel(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: {
            ...(props || {}),
            content: cellLabel
          },
          on: getComponentOns(renderOpts, params)
        })
      ]
    }
  },
  VxeLink: {
    renderTableDefault (h, renderOpts, params) {
      const { $table, row, column } = params
      const { props } = renderOpts
      const { href } = props || {}
      const cellLabel = $table.getCellLabel(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: {
            ...(props || {}),
            content: cellLabel,
            href: XEUtils.toFormatString(href, params)
          },
          on: getComponentOns(renderOpts, params)
        })
      ]
    }
  },
  /**
   * 已废弃，被 FormatSelect 替换
   * @deprecated
   */
  formatOption: {
    renderTableDefault (h, renderOpts, params) {
      return getCellLabelVNs(h, renderOpts, params, getSelectCellValue(renderOpts, params))
    }
  },
  FormatSelect: {
    renderTableDefault (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    tableCellFormatter: handleFormatSelect,
    tableCellCopyMethod: handleFormatSelect,
    tableCellPasteMethod: handleSetSelectValue,
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  VxeTreeSelect: {
    tableAutoFocus: true,
    renderTableEdit: defaultTableOrTreeSelectEditRender,
    renderTableCell (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleTreeSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getTreeSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  /**
   * 已废弃，被 FormatTreeSelect 替换
   * @deprecated
   */
  formatTree: {
    renderTableDefault (h, renderOpts, params) {
      return getCellLabelVNs(h, renderOpts, params, getTreeSelectCellValue(renderOpts, params))
    }
  },
  FormatTreeSelect: {
    renderTableDefault (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleTreeSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getTreeSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  VxeCascader: {
    tableAutoFocus: true,
    renderTableEdit: defaultTableOrTreeSelectEditRender,
    renderTableCell (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleTreeSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getTreeSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  VxeTableSelect: {
    tableAutoFocus: true,
    renderTableEdit: defaultTableOrTreeSelectEditRender,
    renderTableCell (h, renderOpts, params) {
      const { options, optionGroups } = renderOpts
      const { $table, row, column } = params
      const opSize = options ? options.length : null
      const ogSize = optionGroups ? optionGroups.length : null
      const { cellResult } = $table.effectCellData(row, column, {
        key: 'render_table_cell',
        isChanged ({ oldValue, cellValue }) {
          return oldValue && oldValue[0] === cellValue && oldValue[1] === opSize && oldValue[2] === ogSize
        },
        setValue ({ cellValue }) {
          return [cellValue, opSize, ogSize]
        },
        getResult ({ cellValue }) {
          return handleTreeSelectCellValue(cellValue, renderOpts)
        }
      })
      // const cellResult = getTreeSelectCellValue(renderOpts, params)
      return getCellLabelVNs(h, renderOpts, params, cellResult)
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  VxeColorPicker: {
    tableAutoFocus: true,
    renderTableEdit (h, renderOpts, params: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = params
      const { options } = renderOpts
      const cellValue = getCellValue(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: getCellEditProps(renderOpts, params, cellValue, { colors: options }),
          on: getEditOns(renderOpts, params)
        })
      ]
    },
    renderTableCell (h, renderOpts, params) {
      const { $table, row, column } = params
      const { props } = renderOpts
      const customSize = props ? props.size : null
      const vSize = customSize || $table.computeSize
      const cellValue = XEUtils.get(row, column.field)
      return h('span', {
        class: ['vxe-color-picker--readonly', {
          [`size--${vSize}`]: vSize
        }]
      }, [
        h('div', {
          class: ['vxe-color-picker--readonly-color', {
            'is--empty': !cellValue
          }],
          style: cellValue
            ? {
                backgroundColor: cellValue
              }
            : undefined
        })
      ])
    }
  },
  VxeIconPicker: {
    tableAutoFocus: true,
    renderTableEdit (h, renderOpts, params: VxeGlobalRendererHandles.RenderTableEditParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = params
      const { options } = renderOpts
      const cellValue = getCellValue(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: getCellEditProps(renderOpts, params, cellValue, { icons: options }),
          on: getEditOns(renderOpts, params)
        })
      ]
    },
    renderTableCell (h, renderOpts, params) {
      const { row, column } = params
      const cellValue = XEUtils.get(row, column.field)
      return h('i', {
        class: cellValue
      })
    }
  },
  VxeRadioGroup: {
    renderTableDefault: radioAndCheckboxGroupEditRender
  },
  VxeCheckbox: {
    renderTableDefault: checkboxEditRender
  },
  VxeCheckboxGroup: {
    renderTableDefault: radioAndCheckboxGroupEditRender
  },
  VxeSwitch: {
    tableAutoFocus: 'button',
    renderTableEdit: defaultEditRender,
    renderTableDefault: defaultEditRender
  },
  VxeUpload: {
    renderTableEdit: defaultEditRender,
    renderTableCell: defaultEditRender,
    renderTableDefault: defaultEditRender
  },
  VxeImage: {
    renderTableDefault (h, renderOpts, params: VxeGlobalRendererHandles.RenderTableDefaultParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = params
      const { props } = renderOpts
      const cellValue = getCellValue(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: {
            ...props,
            src: cellValue
          },
          on: getEditOns(renderOpts, params)
        })
      ]
    }
  },
  VxeImageGroup: {
    renderTableDefault (h, renderOpts, params: VxeGlobalRendererHandles.RenderTableDefaultParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = params
      const { props } = renderOpts
      const cellValue = getCellValue(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: {
            ...props,
            urlList: cellValue
          },
          on: getEditOns(renderOpts, params)
        })
      ]
    }
  },
  VxeTextEllipsis: {
    renderTableDefault (h, renderOpts, params: VxeGlobalRendererHandles.RenderTableDefaultParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const { row, column } = params
      const { props } = renderOpts
      const cellValue = getCellValue(row, column)
      return [
        h(getDefaultComponent(renderOpts), {
          props: {
            ...props,
            content: cellValue
          },
          on: getEditOns(renderOpts, params)
        })
      ]
    }
  },
  VxeRate: {
    renderTableDefault: defaultEditRender
  },
  VxeSlider: {
    renderTableDefault: defaultEditRender
  },

  // 以下已废弃
  $input: {
    tableAutoFocus: 'input',
    renderTableEdit: oldEditRender,
    renderTableCell (h, renderOpts, params) {
      const { props = {} } = renderOpts
      const { row, column } = params
      const digits = props.digits || getConfig().input?.digits || 2
      let cellValue = XEUtils.get(row, column.field)
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
    renderTableDefault: oldEditRender,
    renderTableFilter: oldFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod
  },
  $textarea: {
    tableAutoFocus: 'textarea'
  },
  $button: {
    renderTableDefault: oldButtonEditRender
  },
  $buttons: {
    renderTableDefault: oldButtonsEditRender
  },
  $select: {
    tableAutoFocus: 'input',
    renderTableEdit: oldSelectEditRender,
    renderTableDefault: oldSelectEditRender,
    renderTableCell (h, renderOpts, params) {
      return getCellLabelVNs(h, renderOpts, params, getSelectCellValue(renderOpts, params))
    },
    renderTableFilter (h, renderOpts, params) {
      const { column } = params
      const { options, optionProps, optionGroups, optionGroupProps } = renderOpts
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data
        return h(getOldComponent(renderOpts), {
          key: oIndex,
          props: getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
          on: getFilterOns(renderOpts, params, option)
        })
      })
    },
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  $radio: {
    tableAutoFocus: 'input'
  },
  $checkbox: {
    tableAutoFocus: 'input'
  },
  $switch: {
    tableAutoFocus: 'button',
    renderTableEdit: oldEditRender,
    renderTableDefault: oldEditRender
  }
  // 以上已废弃
})
