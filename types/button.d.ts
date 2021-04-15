import { SetupContext, RenderFunction, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'

/**
 * 组件 - 按钮
 * @example import { Button as VxeButton } from 'vxe-table'
 */
export const Button: VXEComponent<VxeButtonProps, VxeButtonEventProps>;

export type VxeButtonInstance = ComponentPublicInstance<VxeButtonProps, VxeButtonConstructor>;

export interface VxeButtonConstructor extends VxeComponentBase, VxeButtonMethods {
  props: VxeButtonProps;
  context: SetupContext<VxeButtonEmits>;
  reactData: ButtonReactData;
  internalData: ButtonInternalData;
  getRefMaps(): ButtonPrivateRef;
  renderVN: RenderFunction;
}

export interface ButtonPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeButtonPrivateRef extends ButtonPrivateRef { }

export interface ButtonReactData {
  inited: boolean;
  showPanel: boolean;
  animatVisible: boolean;
  panelIndex: number;
  panelStyle: VNodeStyle;
  panelPlacement: any;
}

export interface ButtonInternalData {
  showTime: any;
}

export namespace VxeButtonPropTypes {
  export type Size = SizeType;
  export type Type = string;
  export type ClassName = string;
  export type Name = string | number;
  export type Content = string;
  export type Placement = string;
  export type Status = string;
  export type Icon = string;
  export type Round = boolean;
  export type Circle = boolean;
  export type Disabled = boolean;
  export type Loading = boolean;
  export type DestroyOnClose = boolean;
  export type Transfer = boolean;
}

export type VxeButtonProps = {
  size?: VxeButtonPropTypes.Size;
  /**
   * 按钮类型
   */
  type?: VxeButtonPropTypes.Type;
  className?: VxeButtonPropTypes.ClassName;
  /**
   * 用来标识这一项
   */
  name?: VxeButtonPropTypes.Name;
  /**
   * 按钮内容
   */
  content?: VxeButtonPropTypes.Content;
  /**
   * 固定显示下拉面板的方向
   */
  placement?: VxeButtonPropTypes.Placement;
  /**
   * 按钮状态
   */
  status?: VxeButtonPropTypes.Status;
  /**
   * 按钮的图标
   */
  icon?: VxeButtonPropTypes.Icon;
  /**
   * 圆角边框
   */
  round?: VxeButtonPropTypes.Round;
  /**
   * 圆角按钮
   */
  circle?: VxeButtonPropTypes.Circle;
  /**
   * 是否禁用
   */
  disabled?: VxeButtonPropTypes.Disabled;
  /**
   * 是否加载中
   */
  loading?: VxeButtonPropTypes.Loading;
  /**
   * 在下拉面板关闭时销毁内容
   */
  destroyOnClose?: VxeButtonPropTypes.DestroyOnClose;
  /**
   * 是否将弹框容器插入于 body 内
   */
  transfer?: VxeButtonPropTypes.Transfer;
}

export interface ButtonMethods {
  dispatchEvent(type: ValueOf<VxeButtonEmits>, params: any, evnt: Event): void;
  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}
export interface VxeButtonMethods extends ButtonMethods { }

export interface ButtonPrivateMethods { }
export interface VxeButtonPrivateMethods extends ButtonPrivateMethods { }

export type VxeButtonEmits = [
  'click',
  'dropdown-click'
]

export namespace VxeButtonDefines {
  interface ButtonEventParams extends VxeEvent {
    $button: VxeButtonConstructor;
  }

  export interface ClickParams { }
  export interface ClickEventParams extends ButtonEventParams, ClickParams { }

  export interface DropdownClickParams { }
  export interface DropdownClickEventParams extends ButtonEventParams, ClickParams { }
}

export type VxeButtonEventProps = {
  onClick?: VxeButtonEvents.Click;
  onDropdownClick?: VxeButtonEvents.DropdownClick;
}

export interface VxeButtonListeners {
  click?: VxeButtonEvents.Click;
  dropdownClick?: VxeButtonEvents.DropdownClick;
}

export namespace VxeButtonEvents {
  export type Click = (params: VxeButtonDefines.ClickEventParams) => void;
  export type DropdownClick = (params: VxeButtonDefines.DropdownClickParams) => void;
}
