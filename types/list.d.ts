import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 虚拟列表
 * @example import { List as VxeList } from 'vxe-table'
 */
export const List: VXEComponent<VxeListProps, VxeListEventProps>;

export type VxeListInstance = ComponentPublicInstance<VxeListProps, VxeListConstructor>;

export interface VxeListConstructor extends VxeComponentBase, VxeListMethods {
  props: VxeListProps;
  context: SetupContext<VxeListEmits>;
  reactData: ListReactData;
  internalData: ListInternalData;
  getRefMaps(): ListPrivateRef;
  renderVN: RenderFunction;
}

export interface ListPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeListPrivateRef extends ListPrivateRef { }

export interface ListReactData {
  scrollYLoad: boolean;
  bodyHeight: number;
  rowHeight: number;
  topSpaceHeight: number;
  items: any[];
}

export interface ListInternalData {
  fullData: any[];
  lastScrollLeft: number;
  lastScrollTop: number;
  scrollYStore: {
    startIndex: number;
    endIndex: number;
    visibleIndex: number;
    visibleSize: number;
    offsetSize: number;
    rowHeight: number;
  }
}

export interface ListMethods {
  dispatchEvent(type: ValueOf<VxeListEmits>, params: any, evnt: Event): void;
  /**
   * 加载数据
   * @param data 列表数据
   */
  loadData(data: any[]): Promise<any>;

  /**
   * 加载数据
   * @param data 列表数据
   */
  reloadData(data: any[]): Promise<any>;

  /**
   * 重新计算列表
   */
  recalculate(): Promise<any>;

  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param scrollLeft 左边距离
   * @param scrollTop 顶部距离
   */
  scrollTo(scrollLeft: number | null, scrollTop?: number | null): Promise<any>;

  /**
   * 刷新滚动操作，手动同步滚动相关位置
   */
  refreshScroll(): Promise<any>;

  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll(): Promise<any>;
}
export interface VxeListMethods extends ListMethods { }

export interface ListPrivateMethods { }
export interface VxeListPrivateMethods extends ListPrivateMethods { }

export namespace VxeListPropTypes {
  export type Size = SizeType;
  export type Data = any[];
  export type Height = number | string;
  export type MaxHeight = number | string;
  export type Loading = boolean;
  export type AutoResize = boolean;
  export type ClassName = string | ((params: { $list: VxeListConstructor }) => string);
  export type SyncResize = boolean | string | number;
  export interface ScrollY {
    /**
     * 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number;
    /**
     * 指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number;
    /**
     * 指定列表项的 className
     */
    sItem?: string;
  }
}

export type VxeListProps<D = any> = {
  size?: VxeListPropTypes.Size;
  data?: D[];
  height?: VxeListPropTypes.Height;
  maxHeight?: VxeListPropTypes.MaxHeight;
  loading?: VxeListPropTypes.Loading;
  autoResize?: VxeListPropTypes.AutoResize;
  syncResize?: VxeListPropTypes.SyncResize;
  className?: VxeListPropTypes.ClassName;
  scrollY?: VxeListPropTypes.ScrollY;
}

export type VxeListEmits = [
  'scroll'
]

export namespace VxeListDefines {
  interface ListEventParams extends VxeEvent {
    $list: VxeListConstructor;
  }

  export interface ScrollParams { }
  export interface ScrollEventParams extends ListEventParams, ScrollParams { }
}

export type VxeListEventProps = {
  onScroll?: VxeListEvents.Scroll;
}

export interface VxeListListeners {
  scroll?: VxeListEvents.Scroll;
}

export namespace VxeListEvents {
  export type Scroll = (params: VxeListDefines.ScrollEventParams) => void;
}
