import { defineComponent, h, ref, Ref, resolveComponent, ComponentOptions, createCommentVNode, provide, computed, reactive, watch, nextTick, PropType } from 'vue'
import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'
import { createItem } from './util'
import { useSize } from '../../hooks/size'

import { VxeFormConstructor, VxeFormPropTypes, VxeFormEmits, FormReactData, FormMethods, FormPrivateRef, VxeFormPrivateMethods } from '../../../types/vxe-table'

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
    return UtilTools.getFuncText(this.$options.message)
  }

  [key: string]: any
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
    align: String as PropType<VxeFormPropTypes.Align>,
    titleAlign: String as PropType<VxeFormPropTypes.TitleAlign>,
    titleWidth: [String, Number] as PropType<VxeFormPropTypes.TitleWidth>,
    titleColon: { type: Boolean as PropType<VxeFormPropTypes.TitleColon>, default: () => GlobalConfig.form.titleColon },
    titleAsterisk: { type: Boolean as PropType<VxeFormPropTypes.TitleAsterisk>, default: () => GlobalConfig.form.titleAsterisk },
    items: Array as PropType<VxeFormPropTypes.Items>,
    rules: Object as PropType<VxeFormPropTypes.Rules>,
    preventSubmit: { type: Boolean as PropType<VxeFormPropTypes.PreventSubmit>, default: () => GlobalConfig.form.preventSubmit },
    validConfig: Object as PropType<VxeFormPropTypes.ValidConfig>
  },
  emits: [
    'toggle-collapse',
    'submit',
    'submit-invalid',
    'reset'
  ] as VxeFormEmits,
  setup (props, context) {
    const TooltipComponent = resolveComponent('vxe-tooltip') as ComponentOptions

    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      collapseAll: true,
      staticItems: [],
      formItems: []
    } as FormReactData)

    const refElem = ref() as Ref<HTMLFormElement>

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

    const loadItem = (list: any[]) => {
      if (list.length) {
        list.forEach((item) => {
          if (item.slots) {
            XEUtils.each(item.slots, (func, name, slots) => {
              if (!XEUtils.isFunction(func)) {
                if (slots[func]) {
                  slots[name] = slots[func]
                } else {
                  slots[name] = null
                  UtilTools.error('vxe.error.notSlot', [func])
                }
              }
            })
          }
        })
        reactData.staticItems = list.map((item) => createItem($xeform, item))
      }
      return nextTick()
    }

    const getItems = () => {
      return reactData.formItems.slice(0)
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
      const { formItems } = reactData
      if (field) {
        const item = formItems.find((item) => item.field === field)
        if (item) {
          item.showError = false
        }
      } else {
        formItems.forEach((item) => {
          item.showError = false
        })
      }
      return nextTick()
    }

    const reset = () => {
      const { data } = props
      const { formItems } = reactData
      if (data) {
        formItems.forEach((item) => {
          const { field, resetValue, itemRender } = item
          if (field) {
            XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : resetValue)
            const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({ data, property: field, item, $form: $xeform })
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

    const handleFocus = (fields: any) => {
      const { formItems } = reactData
      const el = refElem.value
      fields.some((property: any) => {
        const item = formItems.find((item: any) => item.field === property)
        if (item && item.itemRender) {
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
    const validItemRules = (type: any, property: any, val?: any) => {
      const { data, rules: formRules } = props
      const errorRules: any[] = []
      const syncVailds: any[] = []
      if (property && formRules) {
        const rules = XEUtils.get(formRules, property)
        if (rules) {
          const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
          rules.forEach((rule: any) => {
            if (type === 'all' || !rule.trigger || type === rule.trigger) {
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
                    errorRules.push(new Rule({ type: 'custom', trigger: rule.trigger, message: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(
                      customValid.catch((e: any) => {
                        errorRules.push(new Rule({ type: 'custom', trigger: rule.trigger, message: e ? e.message : rule.message, rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                const isNumber = rule.type === 'number'
                const numVal = isNumber ? XEUtils.toNumber(itemValue) : XEUtils.getSize(itemValue)
                if (itemValue === null || itemValue === undefined || itemValue === '') {
                  if (rule.required) {
                    errorRules.push(new Rule(rule))
                  }
                } else if (
                  (isNumber && isNaN(itemValue)) ||
                  (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
                  (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
                  (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(itemValue))
                ) {
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
      const { formItems } = reactData
      const validOpts = computeValidOpts.value
      const validRest: any = {}
      const validFields: any[] = []
      const itemValids: any[] = []
      clearValidate()
      clearTimeout(showErrTime)
      if (data && formRules) {
        formItems.forEach((item: any) => {
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
          showErrTime = window.setTimeout(() => {
            formItems.forEach((item: any) => {
              if (item.errRule) {
                item.showError = true
              }
            })
          }, 20)
          if (callback) {
            callback(validRest)
          }
          if (validOpts.autoPos !== false) {
            nextTick(() => {
              handleFocus(validFields)
            })
          }
          return Promise.reject(validRest)
        })
      }
      if (callback) {
        callback()
      }
      return Promise.resolve()
    }

    const validate = (callback: any) => {
      return beginValidate(callback)
    }

    const submitEvent = (evnt: any) => {
      evnt.preventDefault()
      if (!props.preventSubmit) {
        beginValidate().then(() => {
          formMethods.dispatchEvent('submit', { data: props.data }, evnt)
        }).catch(errMap => {
          formMethods.dispatchEvent('submit-invalid', { data: props.data, errMap }, evnt)
        })
      }
    }

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    const updateStatus = (scope: any, itemValue?: any) => {
      const { property } = scope
      const { formItems } = reactData
      if (property) {
        validItemRules('change', property, itemValue)
          .then(() => {
            clearValidate(property)
          })
          .catch(({ rule }) => {
            const item = formItems.find((item: any) => item.field === property)
            if (item) {
              item.showError = true
              item.errRule = rule
            }
          })
      }
    }

    const renderPrefixIcon = (titlePrefix: any) => {
      return h('span', {
        class: 'vxe-form--item-title-prefix'
      }, [
        h('i', {
          class: titlePrefix.icon || GlobalConfig.icon.FORM_PREFIX
        })
      ])
    }

    const renderSuffixIcon = (titleSuffix: any) => {
      return h('span', {
        class: 'vxe-form--item-title-suffix'
      }, [
        h('i', {
          class: titleSuffix.icon || GlobalConfig.icon.FORM_SUFFIX
        })
      ])
    }

    const renderTitle = (item: any) => {
      const { data } = props
      const { slots, field, itemRender, titlePrefix, titleSuffix } = item
      const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
      const params = { data, property: field, item, $form: $xeform }
      const tss = []
      if (titlePrefix) {
        tss.push(
          titlePrefix.message
            ? h(TooltipComponent, {
              content: UtilTools.getFuncText(titlePrefix.message),
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
        }, compConf && compConf.renderItemTitle ? compConf.renderItemTitle(itemRender, params) : (slots && slots.title ? slots.title(params) : UtilTools.getFuncText(item.title)))
      )
      if (titleSuffix) {
        tss.push(
          titleSuffix.message
            ? h(TooltipComponent, {
              content: UtilTools.getFuncText(titleSuffix.message),
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

    const renderItems = () => {
      const { rules, data } = props
      const { formItems, collapseAll } = reactData
      const validOpts = computeValidOpts.value
      return formItems.map((item: any, index: any) => {
        const { slots, title, visible, folding, visibleMethod, field, collapseNode, itemRender, showError, errRule } = item
        const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
        const span = item.span || props.span
        const align = item.align || props.align
        const titleAlign = item.titleAlign || props.titleAlign
        const titleWidth = item.titleWidth || props.titleWidth
        let itemVisibleMethod = visibleMethod
        const params = { data, property: field, item, $form: $xeform }
        let isRequired
        if (visible === false) {
          return createCommentVNode()
        }
        if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
          itemVisibleMethod = compConf.itemVisibleMethod
        }
        if (rules) {
          const itemRules = rules[field]
          if (itemRules) {
            isRequired = itemRules.some((rule: any) => rule.required)
          }
        }
        let contentVNs = []
        if (compConf && compConf.renderItemContent) {
          contentVNs = compConf.renderItemContent(itemRender, params)
        } else if (slots && slots.default) {
          contentVNs = slots.default(params)
        }
        return h('div', {
          class: ['vxe-form--item', item.id, span ? `vxe-col--${span} is--span` : null, {
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
            title ? h('div', {
              class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : null],
              style: titleWidth ? {
                width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
              } : null
            }, renderTitle(item)) : null,
            h('div', {
              class: ['vxe-form--item-content', align ? `align--${align}` : null]
            }, contentVNs.concat(
              [
                collapseNode ? h('div', {
                  class: 'vxe-form--item-trigger-node',
                  onClick: toggleCollapseEvent
                }, [
                  h('span', {
                    class: 'vxe-form--item-trigger-text'
                  }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
                  h('i', {
                    class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
                  })
                ]) : null,
                errRule && validOpts.showMessage ? h('div', {
                  class: 'vxe-form--item-valid',
                  style: errRule.maxWidth ? {
                    width: `${errRule.maxWidth}px`
                  } : null
                }, errRule.message) : null
              ])
            )
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
      getItems
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
      const { loading } = props
      const vSize = computeSize.value
      return h('form', {
        ref: refElem,
        class: ['vxe-form', 'vxe-row', {
          [`size--${vSize}`]: vSize,
          'is--colon': props.titleColon,
          'is--asterisk': props.titleAsterisk,
          'is--loading': loading
        }],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, renderItems().concat([
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
        ])
      ]))
    }

    $xeform.renderVN = renderVN

    provide('$xeform', $xeform)

    return $xeform
  },
  render () {
    return this.renderVN()
  }
})
