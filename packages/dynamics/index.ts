import { defineComponent, h, createApp, resolveComponent, reactive, ComponentOptions } from 'vue'

import { VxeModalOptions } from '../../types/vxe-table'

let dynamicContainerElem: HTMLElement

export const dynamicStore = reactive({
  modals: [] as VxeModalOptions[]
})

/**
 * 动态组件
 */
const VxeDynamics = defineComponent({
  setup () {
    return () => {
      const ModalComponent = resolveComponent('vxe-modal') as ComponentOptions
      const { modals } = dynamicStore
      return h('div', {
        class: 'vxe-dynamics--modal'
      }, modals.map((item) => h(ModalComponent, item)))
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
