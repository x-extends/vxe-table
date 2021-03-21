import { defineComponent, h, createApp, resolveComponent, reactive, ComponentOptions } from 'vue'

import { VxeModalDefines } from '../../types/all'

let dynamicContainerElem: HTMLElement

export const dynamicStore = reactive({
  modals: [] as VxeModalDefines.ModalOptions[]
})

/**
 * 动态组件
 */
const VxeDynamics = defineComponent({
  setup () {
    return () => {
      const { modals } = dynamicStore
      return h('div', {
        class: 'vxe-dynamics--modal'
      }, modals.map((item) => h(resolveComponent('vxe-modal') as ComponentOptions, item)))
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
