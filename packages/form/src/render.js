import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, isEnableConf } from '../../tools'

function renderPrefixIcon (h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [
    h('i', {
      class: titlePrefix.icon || GlobalConfig.icon.FORM_PREFIX
    })
  ])
}

function renderSuffixIcon (h, titleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [
    h('i', {
      class: titleSuffix.icon || GlobalConfig.icon.FORM_SUFFIX
    })
  ])
}

export function renderTitle (h, _vm, item) {
  const { data } = _vm
  const { slots, field, itemRender, titlePrefix, titleSuffix } = item
  const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
  const params = { data, property: field, item, $form: _vm }
  const contVNs = []
  const titVNs = []
  if (titlePrefix) {
    titVNs.push(
      titlePrefix.message
        ? h('vxe-tooltip', {
          props: {
            content: UtilTools.getFuncText(titlePrefix.message),
            enterable: titlePrefix.enterable,
            theme: titlePrefix.theme
          }
        }, [
          renderPrefixIcon(h, titlePrefix)
        ])
        : renderPrefixIcon(h, titlePrefix)
    )
  }
  titVNs.push(
    h('span', {
      class: 'vxe-form--item-title-label'
    }, compConf && compConf.renderItemTitle ? compConf.renderItemTitle(itemRender, params) : (slots && slots.title ? _vm.callSlot(slots.title, params, h) : UtilTools.getFuncText(item.title)))
  )
  contVNs.push(
    h('div', {
      class: 'vxe-form--item-title-content'
    }, titVNs)
  )
  const fixVNs = []
  if (titleSuffix) {
    fixVNs.push(
      titleSuffix.message
        ? h('vxe-tooltip', {
          props: {
            content: UtilTools.getFuncText(titleSuffix.message),
            enterable: titleSuffix.enterable,
            theme: titleSuffix.theme
          }
        }, [
          renderSuffixIcon(h, titleSuffix)
        ])
        : renderSuffixIcon(h, titleSuffix)
    )
  }
  contVNs.push(
    h('div', {
      class: 'vxe-form--item-title-postfix'
    }, fixVNs)
  )
  return contVNs
}
