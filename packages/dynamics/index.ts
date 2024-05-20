import { defineComponent, h, createApp, resolveComponent, reactive, ComponentOptions, createCommentVNode } from 'vue'

import { VxeModalDefines, VxeDrawerDefines } from '../../types/all'

let dynamicContainerElem: HTMLElement

export const dynamicStore = reactive({
  modals: [] as VxeModalDefines.ModalOptions[],
  drawers: [] as VxeDrawerDefines.DrawerOptions[]
})

/**
 * 动态组件
 */
const VxeDynamics = defineComponent({
  setup () {
    return () => {
      const { modals, drawers } = dynamicStore
      return [
        modals.length
          ? h('div', {
            class: 'vxe-dynamics--modal'
          }, modals.map((item) => h(resolveComponent('vxe-modal') as ComponentOptions, item)))
          : createCommentVNode(),
        drawers.length
          ? h('div', {
            class: 'vxe-dynamics--drawer'
          }, drawers.map((item) => h(resolveComponent('vxe-drawer') as ComponentOptions, item)))
          : createCommentVNode()
      ]
    }
  }
})

export const dynamicApp = createApp(VxeDynamics)

export function checkDynamic () {
  if (!dynamicContainerElem) {
    dynamicContainerElem = document.createElement('div')
    dynamicContainerElem.className = 'vxe-dynamics'
    document.body.appendChild(dynamicContainerElem)
    dynamicApp.mount(dynamicContainerElem)
  }
}
