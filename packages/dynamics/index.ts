import { defineComponent, h, createApp, reactive } from 'vue'
import VxeModalComponent from '../modal'

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
      }, modals.map((item) => h(VxeModalComponent, item)))
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
