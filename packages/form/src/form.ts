import { defineComponent, h, ref, Ref, resolveComponent, ComponentOptions, ComputedRef, createCommentVNode, provide, computed, reactive, watch, nextTick, PropType, VNode } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import { errLog, getFuncText, isEnableConf, eqEmptyValue } from '../../tools/utils'
import { createItem } from './util'
import { useSize } from '../../hooks/size'

import { VxeFormConstructor, VxeFormPropTypes, VxeFormEmits, FormReactData, FormMethods, FormPrivateRef, VxeFormPrivateMethods, VxeFormDefines, VxeFormItemPropTypes, VxeTooltipInstance, FormInternalData } from '../../../types/all'

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

  get message () {
    return getFuncText(this.$options.message)
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
    loading: Boolean as PropType<VxeFormPropTypes.Loading>,
    data: Object as PropType<VxeFormPropTypes.Data>,
    size: { type: String as PropType<VxeFormPropTypes.Size>, default: () => GlobalConfig.form.size || GlobalConfig.size },
    span: [String, Number] as PropType<VxeFormPropTypes.Span>,
    align: { type: String as PropType<VxeFormPropTypes.Align>, default: () => GlobalConfig.form.align },
    titleAlign: { type: String as PropType<VxeFormPropTypes.TitleAlign>, default: () => GlobalConfig.form.titleAlign },
    titleWidth: [String, Number] as PropType<VxeFormPropTypes.TitleWidth>,
    titleColon: { type: Boolean as PropType<VxeFormPropTypes.TitleColon>, default: () => GlobalConfig.form.titleColon },
    titleAsterisk: { type: Boolean as PropType<VxeFormPropTypes.TitleAsterisk>, default: () => GlobalConfig.form.titleAsterisk },
    titleOverflow: { type: [Boolean, String] as PropType<VxeFormPropTypes.TitleOverflow>, default: null },
    className: [String, Function] as PropType<VxeFormPropTypes.ClassName>,
    items: Array as PropType<VxeFormPropTypes.Items>,
    rules: Object as PropType<VxeFormPropTypes.Rules>,
    preventSubmit: { type: Boolean as PropType<VxeFormPropTypes.PreventSubmit>, default: () => GlobalConfig.form.preventSubmit },
    validConfig: Object as PropType<VxeFormPropTypes.ValidConfig>,
    tooltipConfig: Object as PropType<VxeFormPropTypes.TooltipConfig>
  },
  emits: [
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

    const reactData = reactive({
      collapseAll: true,
      staticItems: [],
      formItems: []
    } as FormReactData)

    const internalData = reactive({
      tooltipTimeout: null,
      tooltipActive: false,
      tooltipStore: {
        item: null,
        visible: false
      }
    } as FormInternalData)

    const refElem = ref() as Ref<HTMLFormElement>
    const refTooltip = ref() as Ref<VxeTooltipInstance>

    const refMaps: FormPrivateRef = {
      refElem
    }

    const $xeform = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    } as VxeFormConstructor & VxeFormPrivateMethods

    let formMethods = {} as FormMethods

    const computeValidOpts = computed(() => {
      return Object.assign({}, GlobalConfig.form.validConfig, props.validConfig)
    })

    let computeTooltipOpts = ref() as ComputedRef<VxeFormPropTypes.TooltipOpts>

    const handleTooltipLeaveMethod = () => {
      const tooltipOpts = computeTooltipOpts.value
      setTimeout(() => {
        if (!internalData.tooltipActive) {
          formMethods.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
      return false
    }

    computeTooltipOpts = computed(() => {
      const opts: VxeFormPropTypes.TooltipOpts = Object.assign({ leaveDelay: 300 }, GlobalConfig.form.tooltipConfig, props.tooltipConfig)
      if (opts.enterable) {
        opts.leaveMethod = handleTooltipLeaveMethod
      }
      return opts
    })

    const callSlot = (slotFunc: ((params: any) => any) | string | null, params: any): VNode[] => {
      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return slotFunc(params)
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
        reactData.staticItems = XEUtils.mapTree(list, item => createItem($xeform, item), { children: 'children' })
      }
      return nextTick()
    }

    const getItems = () => {
      const itemList: VxeFormDefines.ItemInfo[] = []
      XEUtils.eachTree(reactData.formItems, item => {
        itemList.push(item)
      }, { children: 'children' })
      return itemList
    }

    const toggleCollapse = () => {
      reactData.collapseAll = !reactData.collapseAll
      return nextTick()
    }

    const toggleCollapseEvent = (evnt: Event) => {
      toggleCollapse()
      formMethods.dispatchEvent('toggle-collapse', { collapse: !reactData.collapseAll, data: props.data }, evnt)
    }

    const clearValidate = (field?: string) => {
      const itemList = getItems()
      if (field) {
        const item = itemList.find((item) => item.field === field)
        if (item) {
          item.showError = false
        }
      } else {
        itemList.forEach((item) => {
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
              compConf.itemResetMethod({ data, property: field, item, $form: $xeform })
            } else if (field) {
              XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : resetValue)
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
      const itemList = getItems()
      const el = refElem.value
      fields.some((property) => {
        const item = itemList.find((item) => item.field === property)
        if (item && isEnableConf(item.itemRender)) {
          const { itemRender } = item
          const compConf = VXETable.renderer.get(itemRender.name)
          let inputElem: HTMLInputElement | null = null
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
            return true
          }
        }
      })
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
    const validItemRules = (validType: string, property: string, val?: any) => {
      const { data, rules: formRules } = props
      const errorRules: Rule[] = []
      const syncVailds: Promise<any>[] = []
      if (property && formRules) {
        const rules = XEUtils.get(formRules, property)
        if (rules) {
          const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
          rules.forEach((rule) => {
            const { type, trigger, required } = rule
            if (validType === 'all' || !trigger || validType === trigger) {
              if (XEUtils.isFunction(rule.validator)) {
                const customValid = rule.validator({
                  itemValue,
                  rule,
                  rules,
                  data,
                  property,
                  $form: $xeform
                })
                if (customValid) {
                  if (XEUtils.isError(customValid)) {
                    errorRules.push(new Rule({ type: 'custom', trigger, message: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(
                      customValid.catch((e: any) => {
                        errorRules.push(new Rule({ type: 'custom', trigger, message: e ? e.message : rule.message, rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                const isArrType = type === 'array'
                const hasEmpty = isArrType ? (!XEUtils.isArray(itemValue) || !itemValue.length) : eqEmptyValue(itemValue)
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
          const rest = { rules: errorRules, rule: errorRules[0] }
          return Promise.reject(rest)
        }
      })
    }

    let showErrTime: number

    const beginValidate = (type?: string, callback?: any) => {
      const { data, rules: formRules } = props
      const validOpts = computeValidOpts.value
      const validRest: any = {}
      const validFields: string[] = []
      const itemValids: any[] = []
      const itemList = getItems()
      clearValidate()
      clearTimeout(showErrTime)
      if (data && formRules) {
        itemList.forEach((item) => {
          const { field } = item
          if (field) {
            itemValids.push(
              validItemRules(type || 'all', field).then(() => {
                item.errRule = null
              }).catch(({ rule, rules }) => {
                const rest = { rule, rules, data, property: field, $form: $xeform }
                if (!validRest[field]) {
                  validRest[field] = []
                }
                validRest[field].push(rest)
                validFields.push(field)
                item.errRule = rule
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
          return new Promise<void>((resolve, reject) => {
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
              reject(validRest)
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
      return beginValidate('', callback)
    }

    const submitEvent = (evnt: Event) => {
      evnt.preventDefault()
      if (!props.preventSubmit) {
        beginValidate().then(() => {
          formMethods.dispatchEvent('submit', { data: props.data }, evnt)
        }).catch(errMap => {
          formMethods.dispatchEvent('submit-invalid', { data: props.data, errMap }, evnt)
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

    const triggerHeaderHelpEvent = (evnt: MouseEvent, params: {
      item: VxeFormDefines.ItemInfo;
    }) => {
      const { item } = params
      const { tooltipStore } = internalData
      const $tooltip = refTooltip.value
      const overflowElem = evnt.currentTarget as HTMLDivElement
      const content = (overflowElem.textContent || '').trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      clearTimeout(internalData.tooltipTimeout)
      internalData.tooltipActive = true
      closeTooltip()
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

    const handleTargetLeaveEvent = () => {
      const tooltipOpts = computeTooltipOpts.value
      internalData.tooltipActive = false
      if (tooltipOpts.enterable) {
        internalData.tooltipTimeout = setTimeout(() => {
          const $tooltip = refTooltip.value
          if ($tooltip && !$tooltip.reactData.isHover) {
            closeTooltip()
          }
        }, tooltipOpts.leaveDelay)
      } else {
        closeTooltip()
      }
    }

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    const updateStatus = (scope: any, itemValue?: any) => {
      const { property } = scope
      if (property) {
        validItemRules('change', property, itemValue)
          .then(() => {
            clearValidate(property)
          })
          .catch(({ rule }) => {
            const itemList = getItems()
            const item = itemList.find((item) => item.field === property)
            if (item) {
              item.showError = true
              item.errRule = rule
            }
          })
      }
    }

    const renderPrefixIcon = (titlePrefix: VxeFormItemPropTypes.TitlePrefix) => {
      return h('span', {
        class: 'vxe-form--item-title-prefix'
      }, [
        h('i', {
          class: titlePrefix.icon || GlobalConfig.icon.FORM_PREFIX
        })
      ])
    }

    const renderSuffixIcon = (titleSuffix: VxeFormItemPropTypes.TitleSuffix) => {
      return h('span', {
        class: 'vxe-form--item-title-suffix'
      }, [
        h('i', {
          class: titleSuffix.icon || GlobalConfig.icon.FORM_SUFFIX
        })
      ])
    }

    const renderTitle = (item: VxeFormDefines.ItemInfo) => {
      const { data } = props
      const { slots, field, itemRender, titlePrefix, titleSuffix } = item
      const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
      const params = { data, property: field, item, $form: $xeform }
      const titleSlot = slots ? slots.title : null
      const tss = []
      if (titlePrefix) {
        tss.push(
          titlePrefix.message
            ? h(resolveComponent('vxe-tooltip') as ComponentOptions, {
              content: getFuncText(titlePrefix.message),
              enterable: titlePrefix.enterable,
              theme: titlePrefix.theme
            }, {
              default: () => renderPrefixIcon(titlePrefix)
            })
            : renderPrefixIcon(titlePrefix)
        )
      }
      tss.push(
        h('span', {
          class: 'vxe-form--item-title-label'
        }, compConf && compConf.renderItemTitle ? compConf.renderItemTitle(itemRender, params) : (titleSlot ? callSlot(titleSlot, params) : getFuncText(item.title)))
      )
      if (titleSuffix) {
        tss.push(
          titleSuffix.message
            ? h(resolveComponent('vxe-tooltip') as ComponentOptions, {
              content: getFuncText(titleSuffix.message),
              enterable: titleSuffix.enterable,
              theme: titleSuffix.theme
            }, {
              default: () => renderSuffixIcon(titleSuffix)
            })
            : renderSuffixIcon(titleSuffix)
        )
      }
      return tss
    }

    const renderItems = (itemList: VxeFormDefines.ItemInfo[]): VNode[] => {
      const { rules, data, titleOverflow: allTitleOverflow } = props
      const { collapseAll } = reactData
      const validOpts = computeValidOpts.value
      return itemList.map((item, index) => {
        const { slots, title, visible, folding, visibleMethod, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, children } = item
        const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
        const defaultSlot = slots ? slots.default : null
        const titleSlot = slots ? slots.title : null
        const span = item.span || props.span
        const align = item.align || props.align
        const titleAlign = item.titleAlign || props.titleAlign
        const titleWidth = item.titleWidth || props.titleWidth
        const itemOverflow = (XEUtils.isUndefined(titleOverflow) || XEUtils.isNull(titleOverflow)) ? allTitleOverflow : titleOverflow
        const showEllipsis = itemOverflow === 'ellipsis'
        const showTitle = itemOverflow === 'title'
        const showTooltip = itemOverflow === true || itemOverflow === 'tooltip'
        const hasEllipsis = showTitle || showTooltip || showEllipsis
        let itemVisibleMethod = visibleMethod
        const params = { data, property: field, item, $form: $xeform }
        let isRequired
        if (visible === false) {
          return createCommentVNode()
        }
        // 如果为项集合
        const isGather = children && children.length > 0
        if (isGather) {
          const childVNs = renderItems(item.children)
          return childVNs.length ? h('div', {
            class: ['vxe-form--gather vxe-row', item.id, span ? `vxe-col--${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className(params) : className) : '']
          }, childVNs) : createCommentVNode()
        }
        if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
          itemVisibleMethod = compConf.itemVisibleMethod
        }
        if (rules) {
          const itemRules = rules[field]
          if (itemRules) {
            isRequired = itemRules.some((rule) => rule.required)
          }
        }
        let contentVNs: any[] = []
        if (defaultSlot) {
          contentVNs = callSlot(defaultSlot, params)
        } else if (compConf && compConf.renderItemContent) {
          contentVNs = compConf.renderItemContent(itemRender, params)
        } else if (field) {
          contentVNs = [`${XEUtils.get(data, field)}`]
        }
        if (collapseNode) {
          contentVNs.push(
            h('div', {
              class: 'vxe-form--item-trigger-node',
              onClick: toggleCollapseEvent
            }, [
              h('span', {
                class: 'vxe-form--item-trigger-text'
              }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
              h('i', {
                class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
              })
            ])
          )
        }
        if (errRule && validOpts.showMessage) {
          contentVNs.push(
            h('div', {
              class: 'vxe-form--item-valid',
              style: errRule.maxWidth ? {
                width: `${errRule.maxWidth}px`
              } : null
            }, errRule.message)
          )
        }
        const ons = showTooltip ? {
          onMouseenter (evnt: MouseEvent) {
            triggerHeaderHelpEvent(evnt, params)
          },
          onMouseleave: handleTargetLeaveEvent
        } : {}
        return h('div', {
          class: ['vxe-form--item', item.id, span ? `vxe-col--${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className(params) : className) : '', {
            'is--title': title,
            'is--required': isRequired,
            'is--hidden': folding && collapseAll,
            'is--active': !itemVisibleMethod || itemVisibleMethod(params),
            'is--error': showError
          }],
          key: index
        }, [
          h('div', {
            class: 'vxe-form--item-inner'
          }, [
            title || titleSlot ? h('div', {
              class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : null, {
                'is--ellipsis': hasEllipsis
              }],
              style: titleWidth ? {
                width: isNaN(titleWidth as number) ? titleWidth : `${titleWidth}px`
              } : null,
              title: showTitle ? getFuncText(title) : null,
              ...ons
            }, renderTitle(item)) : null,
            h('div', {
              class: ['vxe-form--item-content', align ? `align--${align}` : null]
            }, contentVNs)
          ])
        ])
      })
    }

    formMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $form: $xeform, $event: evnt }, params))
      },
      reset,
      validate,
      clearValidate,
      updateStatus,
      toggleCollapse,
      getItems,
      closeTooltip
    }

    Object.assign($xeform, formMethods)

    watch(() => reactData.staticItems, (value) => {
      reactData.formItems = value
    })

    watch(() => props.items, (value) => {
      loadItem(value || [])
    })

    nextTick(() => {
      loadItem(props.items || [])
    })

    const renderVN = () => {
      const { loading, className, data } = props
      const { formItems } = reactData
      const vSize = computeSize.value
      const tooltipOpts = computeTooltipOpts.value
      return h('form', {
        ref: refElem,
        class: ['vxe-form', className ? (XEUtils.isFunction(className) ? className({ items: formItems, data, $form: $xeform }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--colon': props.titleColon,
          'is--asterisk': props.titleAsterisk,
          'is--loading': loading
        }],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, [
        h('div', {
          class: 'vxe-form--wrapper vxe-row'
        }, renderItems(formItems)),
        h('div', {
          class: 'vxe-form-slots',
          ref: 'hideItem'
        }, slots.default ? slots.default({}) : []),
        h('div', {
          class: ['vxe-loading', {
            'is--visible': loading
          }]
        }, [
          h('div', {
            class: 'vxe-loading--spinner'
          })
        ]),
        /**
         * 工具提示
         */
        hasUseTooltip ? h(resolveComponent('vxe-tooltip') as ComponentOptions, {
          ref: refTooltip,
          ...tooltipOpts
        }) : createCommentVNode()
      ])
    }

    $xeform.renderVN = renderVN

    provide('$xeform', $xeform)

    return $xeform
  },
  render () {
    return this.renderVN()
  }
})
