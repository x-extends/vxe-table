import VxeFormGatherComponent from '../form/src/form-gather'
import VxeUI from '../v-x-e-table'

export const VxeFormGather = Object.assign(VxeFormGatherComponent, {
  install (Vue) {
    Vue.component(VxeFormGatherComponent.name, VxeFormGatherComponent)
  }
})
VxeUI.component(VxeFormGatherComponent)

export const FormGather = VxeFormGather

export default VxeFormGather
