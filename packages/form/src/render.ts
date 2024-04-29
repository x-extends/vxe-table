import { h } from 'vue'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeTooltipComponent from '../../tooltip'
import { VXETable } from '../../v-x-e-table'
import { getFuncText, isEnableConf } from '../../tools/utils'
import { getSlotVNs } from '../../tools/vn'

import { VxeFormConstructor, VxeFormDefines, VxeFormItemPropTypes, VxeFormPrivateMethods } from '../../../types/all'

function renderPrefixIcon (titlePrefix: VxeFormItemPropTypes.TitlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [
    h('i', {
      class: titlePrefix.icon || GlobalConfig.icon.FORM_PREFIX
    })
  ])
}

function renderSuffixIcon (titleSuffix: VxeFormItemPropTypes.TitleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [
    h('i', {
      class: titleSuffix.icon || GlobalConfig.icon.FORM_SUFFIX
    })
  ])
}

export function renderTitle ($xeform: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo) {
  const { data } = $xeform.props
  const { computeTooltipOpts } = $xeform.getComputeMaps()
  const { slots, field, itemRender, titlePrefix, titleSuffix } = item
  const tooltipOpts = computeTooltipOpts.value
  const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
  const params = { data, field, property: field, item, $form: $xeform, $grid: $xeform.xegrid }
  const titleSlot = slots ? slots.title : null
  const contVNs = []
  const titVNs = []
  if (titlePrefix) {
    titVNs.push(
      (titlePrefix.content || titlePrefix.message)
        ? h(VxeTooltipComponent, {
          ...tooltipOpts,
          ...titlePrefix,
          content: getFuncText(titlePrefix.content || titlePrefix.message)
        }, {
          default: () => renderPrefixIcon(titlePrefix)
        })
        : renderPrefixIcon(titlePrefix)
    )
  }
  titVNs.push(
    h('span', {
      class: 'vxe-form--item-title-label'
    }, compConf && compConf.renderItemTitle ? getSlotVNs(compConf.renderItemTitle(itemRender, params)) : (titleSlot ? $xeform.callSlot(titleSlot, params) : getFuncText(item.title)))
  )
  contVNs.push(
    h('div', {
      class: 'vxe-form--item-title-content'
    }, titVNs)
  )
  const fixVNs = []
  if (titleSuffix) {
    fixVNs.push(
      (titleSuffix.content || titleSuffix.message)
        ? h(VxeTooltipComponent, {
          ...tooltipOpts,
          ...titleSuffix,
          content: getFuncText(titleSuffix.content || titleSuffix.message)
        }, {
          default: () => renderSuffixIcon(titleSuffix)
        })
        : renderSuffixIcon(titleSuffix)
    )
  }
  contVNs.push(
    h('div', {
      class: 'vxe-form--item-title-postfix'
    }, fixVNs)
  )
  return contVNs
}
