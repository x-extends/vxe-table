import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VNodeStyle, VxeEvent, ValueOf } from './component'

/**
 * 组件 - 下拉容器
 * @example import { Pulldown as VxePulldown } from 'vxe-table'
 */
export const Pulldown: VXEComponent<VxePulldownProps, VxePulldownEventProps>;

export type VxePulldownInstance = ComponentPublicInstance<VxePulldownProps, VxePulldownConstructor>;

export interface VxePulldownConstructor extends VxeComponentBase, VxePulldownMethods {
  props: VxePulldownProps;
  context: SetupContext<VxePulldownEmits>;
  reactData: PulldownReactData;
  getRefMaps(): PulldownPrivateRef;
  renderVN: RenderFunction;
}

export interface PulldownPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxePulldownPrivateRef extends PulldownPrivateRef { }

export interface PulldownReactData {
  inited: boolean;
  panelIndex: number;
  panelStyle: VNodeStyle | null;
  panelPlacement: string | null;
  currentValue: null;
  visiblePanel: boolean;
  animatVisible: boolean;
  isActivated: boolean;
}

export interface PulldownMethods {
  dispatchEvent(type: ValueOf<VxePulldownEmits>, params: any, evnt: Event): void;
  /**
   * 判断下拉面板是否可视
   */
  isPanelVisible(): boolean;

  /**
   * 切换下拉面板
   */
  togglePanel(): Promise<any>;

  /**
   * 显示下拉面板
   */
  showPanel(): Promise<any>;

  /**
   * 隐藏下拉面板
   */
  hidePanel(): Promise<any>;
}
export interface VxePulldownMethods extends PulldownMethods { }

export interface PulldownPrivateMethods { }
export interface VxePulldownPrivateMethods extends PulldownPrivateMethods { }

export type VxePulldownEmits = [
  'hide-panel'
]

export namespace VxePulldownPropTypes {
  export type Size = SizeType;
  export type Disabled = boolean;
  export type Placement = string;
  export type DestroyOnClose = boolean;
  export type Transfer = boolean;
}

export type VxePulldownProps = {
  size?: VxePulldownPropTypes.Size;
  /**
   * 是否禁用
   */
  disabled?: VxePulldownPropTypes.Disabled;
  /**
   * 固定显示下拉面板的方向
   */
  placement?: VxePulldownPropTypes.Placement;
  /**
   * 在下拉容器关闭时销毁内容
   */
  destroyOnClose?: VxePulldownPropTypes.DestroyOnClose;
  /**
   * 是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）
   */
  transfer?: VxePulldownPropTypes.Transfer;
}

export namespace VxePulldownDefines {
  interface PulldownEventParams extends VxeEvent {
    $pulldown: VxePulldownConstructor;
  }

  export interface HidePanelParams { }
  export interface HidePanelEventParams extends HidePanelParams { }
}

export type VxePulldownEventProps = {
  onHidePanel?: VxePulldownEvents.HidePanel;
}

export interface VxePulldownListeners {
  hidePanel?: VxePulldownEvents.HidePanel;
}

export namespace VxePulldownEvents {
  export type HidePanel = (params: VxePulldownDefines.HidePanelEventParams) => void;
}
