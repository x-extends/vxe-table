import { defineComponent, h, ref, Ref, createCommentVNode, provide, computed, inject, reactive, watch, nextTick, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import { getFuncText, isEnableConf, eqEmptyValue } from '../../tools/utils'
import { errLog, warnLog } from '../../tools/log'
import { scrollToView } from '../../tools/dom'
import { createItem, handleFieldOrItem, isHiddenItem, isActivetem } from './util'
import { useSize } from '../../hooks/size'
import VxeTooltipComponent from '../../tooltip'
import VxeFormConfigItem from './form-config-item'
import VxeLoading from '../../loading/index'
import { getSlotVNs } from '../../tools/vn'

import { VxeFormConstructor, VxeFormPropTypes, VxeFormEmits, FormReactData, FormMethods, FormPrivateRef, VxeFormPrivateMethods, VxeFormDefines, VxeFormItemPropTypes, VxeTooltipInstance, FormInternalData, VxeFormPrivateComputed, VxeGridConstructor, VxeGridPrivateMethods } from '../../../types/all'

class Rule {
  constructor (rule: any) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    })
  }

  get content () {
    return getFuncText(this.$options.content || this.$options.message)
  }

  get message () {
    return this.content
  }

  [key: string]: any
}

const validErrorRuleValue = (rule: VxeFormDefines.FormRule, val: any) => {
  const { type, min, max, pattern } = rule
  const isNumType = type === 'number'
  const numVal = isNumType ? XEUtils.toNumber(val) : XEUtils.getSize(val)
  // 判断数值
  if (isNumType && isNaN(val)) {
    return true
  }
  // 如果存在 min，判断最小值
  if (!XEUtils.eqNull(min) && numVal < XEUtils.toNumber(min)) {
    return true
  }
  // 如果存在 max，判断最大值
  if (!XEUtils.eqNull(max) && numVal > XEUtils.toNumber(max)) {
    return true
  }
  // 如果存在 pattern，正则校验
  if (pattern && !(XEUtils.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return true
  }
  return false
}

function getResetValue (value: any, resetValue: any) {
  if (XEUtils.isArray(value)) {
    resetValue = []
  }
  return resetValue
}

export default defineComponent({
  name: 'VxeForm',
  props: {
    collapseStatus: { type: Boolean as PropType<VxeFormPropTypes.CollapseStatus>, default: true },
    loading: Boolean as PropType<VxeFormPropTypes.Loading>,
    data: Object as PropType<VxeFormPropTypes.Data>,
    size: { type: String as PropType<VxeFormPropTypes.Size>, default: () => GlobalConfig.form.size || GlobalConfig.size },
    span: { type: [String, Number] as PropType<VxeFormPropTypes.Span>, default: () => GlobalConfig.form.span },
    align: { type: String as PropType<VxeFormPropTypes.Align>, default: () => GlobalConfig.form.align },
    titleAlign: { type: String as PropType<VxeFormPropTypes.TitleAlign>, default: () => GlobalConfig.form.titleAlign },
    titleWidth: { type: [String, Number] as PropType<VxeFormPropTypes.TitleWidth>, default: () => GlobalConfig.form.titleWidth },
    titleColon: { type: Boolean as PropType<VxeFormPropTypes.TitleColon>, default: () => GlobalConfig.form.titleColon },
    titleAsterisk: { type: Boolean as PropType<VxeFormPropTypes.TitleAsterisk>, default: () => GlobalConfig.form.titleAsterisk },
    titleOverflow: { type: [Boolean, String] as PropType<VxeFormPropTypes.TitleOverflow>, default: null },
    vertical: {
      type: Boolean as PropType<VxeFormPropTypes.Vertical>,
      default: null
    },
    className: [String, Function] as PropType<VxeFormPropTypes.ClassName>,
    readonly: Boolean as PropType<VxeFormPropTypes.Readonly>,
    items: Array as PropType<VxeFormPropTypes.Items>,
    rules: Object as PropType<VxeFormPropTypes.Rules>,
    preventSubmit: { type: Boolean as PropType<VxeFormPropTypes.PreventSubmit>, default: () => GlobalConfig.form.preventSubmit },
    validConfig: Object as PropType<VxeFormPropTypes.ValidConfig>,
    tooltipConfig: Object as PropType<VxeFormPropTypes.TooltipConfig>,
    customLayout: { type: Boolean as PropType<VxeFormPropTypes.CustomLayout>, default: () => GlobalConfig.form.customLayout }
  },
  emits: [
    'update:collapseStatus',
    'collapse',
    'toggle-collapse',
    'submit',
    'submit-invalid',
    'reset'
  ] as VxeFormEmits,
  setup (props, context) {
    const hasUseTooltip = VXETable.tooltip

    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive<FormReactData>({
      collapseAll: props.collapseStatus,
      staticItems: [],
      formItems: []
    })

    const internalData = reactive<FormInternalData>({
      tooltipTimeout: null,
      tooltipStore: {
        item: null,
        visible: false
      }
    })

    const $xegrid = inject<(VxeGridConstructor & VxeGridPrivateMethods) | null>('$xegrid', null)

    const refElem = ref() as Ref<HTMLFormElement>
    const refTooltip = ref() as Ref<VxeTooltipInstance>

    let formMethods = {} as FormMethods

    const computeValidOpts = computed(() => {
      return Object.assign({}, GlobalConfig.form.validConfig, props.validConfig)
    })

    const computeTooltipOpts = computed(() => {
      return Object.assign({}, GlobalConfig.tooltip, GlobalConfig.form.tooltipConfig, props.tooltipConfig)
    })

    const refMaps: FormPrivateRef = {
      refElem
    }

    const computeMaps: VxeFormPrivateComputed = {
      computeSize,
      computeValidOpts,
      computeTooltipOpts
    }

    const $xeform = {
      xID,
      props,
      context,
      reactData,

      xegrid: $xegrid,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeFormConstructor & VxeFormPrivateMethods

    const callSlot = (slotFunc: ((params: any) => any) | string | null, params: any) => {
      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params))
        }
      }
      return []
    }

    const loadItem = (list: VxeFormPropTypes.Items) => {
      if (list.length) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          list.forEach((item) => {
            if (item.slots) {
              XEUtils.each(item.slots, (func) => {
                if (!XEUtils.isFunction(func)) {
                  if (!slots[func]) {
                    errLog('vxe.error.notSlot', [func])
                  }
                }
              })
            }
          })
        }
      }
      reactData.staticItems = XEUtils.mapTree(list, item => createItem($xeform, item), { children: 'children' })
      return nextTick()
    }

    const getItems = () => {
      const itemList: VxeFormDefines.ItemInfo[] = []
      XEUtils.eachTree(reactData.formItems, item => {
        itemList.push(item)
      }, { children: 'children' })
      return itemList
    }

    const getItemByField = (field: string) => {
      const rest = XEUtils.findTree(reactData.formItems, item => item.field === field, { children: 'children' })
      return rest ? rest.item : null
    }

    const getCollapseStatus = () => {
      return reactData.collapseAll
    }

    const toggleCollapse = () => {
      const status = !getCollapseStatus()
      reactData.collapseAll = status
      emit('update:collapseStatus', status)
      return nextTick()
    }

    const toggleCollapseEvent = (evnt: Event) => {
      toggleCollapse()
      const status = getCollapseStatus()
      formMethods.dispatchEvent('toggle-collapse', { status, collapse: status, data: props.data }, evnt)
      formMethods.dispatchEvent('collapse', { status, collapse: status, data: props.data }, evnt)
    }

    const clearValidate = (fieldOrItem?: VxeFormItemPropTypes.Field | VxeFormItemPropTypes.Field[] | VxeFormDefines.ItemInfo | VxeFormDefines.ItemInfo[]) => {
      if (fieldOrItem) {
        let fields: any = fieldOrItem
        if (!XEUtils.isArray(fieldOrItem)) {
          fields = [fieldOrItem]
        }
        fields.forEach((field: any) => {
          if (field) {
            const item = handleFieldOrItem($xeform, field)
            if (item) {
              item.showError = false
            }
          }
        })
      } else {
        getItems().forEach((item) => {
          item.showError = false
        })
      }
      return nextTick()
    }

    const reset = () => {
      const { data } = props
      const itemList = getItems()
      if (data) {
        itemList.forEach((item) => {
          const { field, resetValue, itemRender } = item
          if (isEnableConf(itemRender)) {
            const compConf = VXETable.renderer.get(itemRender.name)
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({ data, field, property: field, item, $form: $xeform, $grid: $xeform.xegrid })
            } else if (field) {
              XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : XEUtils.clone(resetValue, true))
            }
          }
        })
      }
      return clearValidate()
    }

    const resetEvent = (evnt: Event) => {
      evnt.preventDefault()
      reset()
      formMethods.dispatchEvent('reset', { data: props.data }, evnt)
    }

    const handleFocus = (fields: string[]) => {
      const el = refElem.value
      for (let i = 0; i < fields.length; i++) {
        const property = fields[i]
        const item = getItemByField(property)
        if (item && isEnableConf(item.itemRender)) {
          const { itemRender } = item
          const compConf = VXETable.renderer.get(itemRender.name)
          let inputElem: HTMLInputElement | null = null
          // 定位到第一个
          if (!i) {
            scrollToView(el.querySelector(`.${item.id}`))
          }
          // 如果指定了聚焦 class
          if (itemRender.autofocus) {
            inputElem = el.querySelector(`.${item.id} ${itemRender.autofocus}`) as HTMLInputElement
          }
          // 渲染器的聚焦处理
          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = el.querySelector(`.${item.id} ${compConf.autofocus}`) as HTMLInputElement
          }
          if (inputElem) {
            inputElem.focus()
            break
          }
        }
      }
    }

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    const validItemRules = (validType: string, fields: string | string[], val?: any): Promise<VxeFormDefines.ValidateErrorMapParams | undefined> => {
      const { data, rules: formRules } = props
      const errorMaps: VxeFormDefines.ValidateErrorMapParams = {}
      if (!XEUtils.isArray(fields)) {
        fields = [fields]
      }
      return Promise.all(
        fields.map((property) => {
          const errorRules: Rule[] = []
          const syncVailds: Promise<any>[] = []
          if (property && formRules) {
            const rules = XEUtils.get(formRules, property)
            if (rules) {
              const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
              rules.forEach((rule) => {
                const { type, trigger, required, validator } = rule
                if (validType === 'all' || !trigger || validType === trigger) {
                  if (validator) {
                    const validParams = {
                      itemValue,
                      rule,
                      rules,
                      data,
                      field: property,
                      property,
                      $form: $xeform
                    }
                    let customValid: any
                    if (XEUtils.isString(validator)) {
                      const gvItem = VXETable.validators.get(validator)
                      if (gvItem) {
                        if (gvItem.itemValidatorMethod) {
                          customValid = gvItem.itemValidatorMethod(validParams)
                        } else {
                          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                            warnLog('vxe.error.notValidators', [validator])
                          }
                        }
                      } else {
                        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                          errLog('vxe.error.notValidators', [validator])
                        }
                      }
                    } else {
                      customValid = validator(validParams)
                    }
                    if (customValid) {
                      if (XEUtils.isError(customValid)) {
                        errorRules.push(new Rule({ type: 'custom', trigger, content: customValid.message, rule: new Rule(rule) }))
                      } else if (customValid.catch) {
                        // 如果为异步校验（注：异步校验是并发无序的）
                        syncVailds.push(
                          customValid.catch((e: any) => {
                            errorRules.push(new Rule({ type: 'custom', trigger, content: e ? e.message : (rule.content || rule.message), rule: new Rule(rule) }))
                          })
                        )
                      }
                    }
                  } else {
                    const isArrType = type === 'array'
                    const isArrVal = XEUtils.isArray(itemValue)
                    let hasEmpty = true
                    if (isArrType || isArrVal) {
                      hasEmpty = !isArrVal || !itemValue.length
                    } else if (XEUtils.isString(itemValue)) {
                      hasEmpty = eqEmptyValue(itemValue.trim())
                    } else {
                      hasEmpty = eqEmptyValue(itemValue)
                    }
                    if (required ? (hasEmpty || validErrorRuleValue(rule, itemValue)) : (!hasEmpty && validErrorRuleValue(rule, itemValue))) {
                      errorRules.push(new Rule(rule))
                    }
                  }
                }
              })
            }
          }
          return Promise.all(syncVailds).then(() => {
            if (errorRules.length) {
              errorMaps[property] = errorRules.map(rule => {
                return {
                  $form: $xeform,
                  rule,
                  data,
                  field: property,
                  property
                }
              })
            }
          })
        })
      ).then(() => {
        if (!XEUtils.isEmpty(errorMaps)) {
          return Promise.reject(errorMaps)
        }
      })
    }

    let showErrTime: number

    const beginValidate = (itemList: VxeFormDefines.ItemInfo[], type?: string, callback?: any): Promise<any> => {
      const { data, rules: formRules } = props
      const validOpts = computeValidOpts.value
      const validRest: any = {}
      const validFields: string[] = []
      const itemValids: any[] = []
      clearTimeout(showErrTime)
      if (data && formRules) {
        itemList.forEach((item) => {
          const { field } = item
          if (field && !isHiddenItem($xeform, item) && isActivetem($xeform, item)) {
            itemValids.push(
              validItemRules(type || 'all', field).then(() => {
                item.errRule = null
              }).catch((errorMaps: VxeFormDefines.ValidateErrorMapParams) => {
                const rest = errorMaps[field]
                if (!validRest[field]) {
                  validRest[field] = []
                }
                validRest[field].push(rest)
                validFields.push(field)
                item.errRule = rest[0].rule
                return Promise.reject(rest)
              })
            )
          }
        })
        return Promise.all(itemValids).then(() => {
          if (callback) {
            callback()
          }
        }).catch(() => {
          return new Promise<void>((resolve) => {
            showErrTime = window.setTimeout(() => {
              itemList.forEach((item) => {
                if (item.errRule) {
                  item.showError = true
                }
              })
            }, 20)
            if (validOpts.autoPos !== false) {
              nextTick(() => {
                handleFocus(validFields)
              })
            }
            if (callback) {
              callback(validRest)
              resolve()
            } else {
              resolve(validRest)
            }
          })
        })
      }
      if (callback) {
        callback()
      }
      return Promise.resolve()
    }

    const validate = (callback: any) => {
      clearValidate()
      return beginValidate(getItems(), '', callback)
    }

    const validateField = (fieldOrItem: VxeFormItemPropTypes.Field | VxeFormItemPropTypes.Field[] | VxeFormDefines.ItemInfo | VxeFormDefines.ItemInfo[], callback: any) => {
      let fields: any[] = []
      if (XEUtils.isArray(fieldOrItem)) {
        fields = fieldOrItem
      } else {
        fields = [fieldOrItem]
      }
      return beginValidate(fields.map(field => handleFieldOrItem($xeform, field) as VxeFormDefines.ItemInfo), '', callback)
    }

    const submitEvent = (evnt: Event) => {
      evnt.preventDefault()
      if (!props.preventSubmit) {
        clearValidate()
        beginValidate(getItems()).then((errMap) => {
          if (errMap) {
            formMethods.dispatchEvent('submit-invalid', { data: props.data, errMap }, evnt)
          } else {
            formMethods.dispatchEvent('submit', { data: props.data }, evnt)
          }
        })
      }
    }

    const closeTooltip = () => {
      const { tooltipStore } = internalData
      const $tooltip = refTooltip.value
      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        })
        if ($tooltip) {
          $tooltip.close()
        }
      }
      return nextTick()
    }

    const triggerTitleTipEvent = (evnt: MouseEvent, params: {
      item: VxeFormDefines.ItemInfo;
    }) => {
      const { item } = params
      const { tooltipStore } = internalData
      const $tooltip = refTooltip.value
      const overflowElem = (evnt.currentTarget as HTMLDivElement).children[0]
      const content = (overflowElem.textContent || '').trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      clearTimeout(internalData.tooltipTimeout)
      if (tooltipStore.item !== item) {
        closeTooltip()
      }
      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item,
          visible: true
        })
        if ($tooltip) {
          $tooltip.open(overflowElem, content)
        }
      }
    }

    const handleTitleTipLeaveEvent = () => {
      const tooltipOpts = computeTooltipOpts.value
      let $tooltip = refTooltip.value
      if ($tooltip) {
        $tooltip.setActived(false)
      }
      if (tooltipOpts.enterable) {
        internalData.tooltipTimeout = setTimeout(() => {
          $tooltip = refTooltip.value
          if ($tooltip && !$tooltip.isActived()) {
            closeTooltip()
          }
        }, tooltipOpts.leaveDelay)
      } else {
        closeTooltip()
      }
    }

    const triggerItemEvent = (evnt: Event, field: string, itemValue?: any) => {
      if (field) {
        return validItemRules(evnt ? (['blur'].includes(evnt.type) ? 'blur' : 'change') : 'all', field, itemValue)
          .then(() => {
            clearValidate(field)
          })
          .catch((errorMaps: VxeFormDefines.ValidateErrorMapParams) => {
            const rest = errorMaps[field]
            const item = getItemByField(field)
            if (rest && item) {
              item.showError = true
              item.errRule = rest[0].rule
            }
          })
      }
      return nextTick()
    }

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    const updateStatus = (scope: any, itemValue?: any) => {
      const { field } = scope
      return triggerItemEvent(new Event('change'), field, itemValue)
    }

    formMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $form: $xeform, $grid: $xegrid, $event: evnt }, params))
      },
      reset,
      validate,
      validateField,
      clearValidate,
      updateStatus,
      toggleCollapse,
      getItems,
      getItemByField,
      closeTooltip
    }

    const formPrivateMethods: VxeFormPrivateMethods = {
      callSlot,
      triggerItemEvent,
      toggleCollapseEvent,
      triggerTitleTipEvent,
      handleTitleTipLeaveEvent
    }

    Object.assign($xeform, formMethods, formPrivateMethods)

    const staticItemFlag = ref(0)
    watch(() => reactData.staticItems.length, () => {
      staticItemFlag.value++
    })
    watch(() => reactData.staticItems, () => {
      staticItemFlag.value++
    })
    watch(staticItemFlag, () => {
      reactData.formItems = reactData.staticItems
    })

    const itemFlag = ref(0)
    watch(() => props.items ? props.items.length : -1, () => {
      itemFlag.value++
    })
    watch(() => props.items, () => {
      itemFlag.value++
    })
    watch(itemFlag, () => {
      loadItem(props.items || [])
    })

    watch(() => props.collapseStatus, (value) => {
      reactData.collapseAll = !!value
    })

    const renderVN = () => {
      const { loading, className, data, customLayout } = props
      const { formItems } = reactData
      // const formItems: any[] = []
      const vSize = computeSize.value
      const tooltipOpts = computeTooltipOpts.value
      const defaultSlot = slots.default
      return h('form', {
        ref: refElem,
        class: ['vxe-form', className ? (XEUtils.isFunction(className) ? className({ items: formItems, data, $form: $xeform }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--loading': loading
        }],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, [
        h('div', {
          class: 'vxe-form--wrapper vxe-form--item-row'
        }, customLayout ? (defaultSlot ? defaultSlot({}) : []) : formItems.map((item, index) => {
          return h(VxeFormConfigItem, {
            key: index,
            itemConfig: item
          })
        })),
        h('div', {
          class: 'vxe-form-slots',
          ref: 'hideItem'
        }, customLayout ? [] : (defaultSlot ? defaultSlot({}) : [])),
        /**
         * 加载中
         */
        h(VxeLoading, {
          class: 'vxe-form--loading',
          modelValue: loading
        }),
        /**
         * 工具提示
         */
        hasUseTooltip ? h(VxeTooltipComponent, {
          ref: refTooltip,
          ...tooltipOpts
        }) : createCommentVNode()
      ])
    }

    $xeform.renderVN = renderVN

    if (props.items) {
      loadItem(props.items)
    }

    provide('$xeform', $xeform)
    provide('$xeformgather', null)
    provide('$xeformitem', null)
    provide('$xeformiteminfo', null)

    return $xeform
  },
  render () {
    return this.renderVN()
  }
})
