import { SetupContext } from 'vue'
import { VXEComponent, VxeComponentBase } from './component'

/**
 * 组件 - 图标
 * @example import { VxeIcon } from 'vxe-table'
 */
export const VxeIcon: VXEComponent<{}>
/**
 * 组件 - 图标
 */
export const Icon: VXEComponent<{}>

export interface VxeIconConstructor extends VxeComponentBase, VxeIconMethods {
  props: VxeIconProps
  context: SetupContext<VxeIconEmits>
}

export interface IconMethods {}

export interface VxeIconMethods extends IconMethods { }

export type VxeIconProps<D = any> = {
  name?: VxeIconPropTypes.Name
}

export namespace VxeIconPropTypes {
  export type Name = string
}


export type VxeIconEmits = [
  'click'
]

export namespace VxeIconDefines {
  interface IconKeyboardEventParams {
    $event: KeyboardEvent
  }
  export interface ClickParams {}
  export interface ClickEventParams extends IconKeyboardEventParams, ClickParams { }
}

export type VxeIconEventProps = {
  onClick?: VxeIconEvents.Click
}

export interface VxeIconListeners {
  click?: VxeIconEvents.Click
}

export namespace VxeIconEvents {
  export type Click = (params: VxeIconDefines.ClickEventParams) => void
}
