import VxeFormGatherComponent from '../form/src/form-gather'

export const VxeFormGather = Object.assign(VxeFormGatherComponent, {
  install (Vue) {
    Vue.component(VxeFormGatherComponent.name, VxeFormGatherComponent)
  }
})

export const FormGather = VxeFormGather

export default VxeFormGather
