import { SetupContext, RenderFunction, Ref, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 分页
 */
export interface Pager extends VXETableComponent { }

export type VxePagerInstance = ComponentPublicInstance<VxePagerProps, VxePagerConstructor>;

export interface VxePagerConstructor extends VxeComponentInstance, VxePagerMethods {
  props: VxePagerProps;
  context: SetupContext<VxePagerEmits>;
  refMaps: PagerPrivateRef;
  renderVN: RenderFunction;
}

export interface PagerPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxePagerPrivateRef extends PagerPrivateRef { }

export interface VxePagerOptions extends VxePagerProps, VxePagerListeners { }

export interface VxePagerProps {
  size?: SizeType;
  /**
   * 自定义布局
   */
  layouts?: Array<'PrevJump' | 'PrevPage' | 'Number' | 'JumpNumber' | 'NextPage' | 'NextJump' | 'Sizes' | 'Jump' | 'FullJump' | 'PageCount' | 'Total'>;
  /**
   * 当前页
   */
  currentPage?: number;
  /**
   * 加载中
   */
  loading?: boolean;
  /**
   * 每页大小
   */
  pageSize?: number;
  /**
   * 总条数
   */
  total?: number;
  /**
   * 显示页码按钮的数量
   */
  pagerCount?: number;
  /**
   * 每页大小选项列表
   */
  pageSizes?: number[];
  /**
   * 列对其方式
   */
  align?: string;
  /**
   * 带边框
   */
  border?: boolean;
  /**
   * 带背景颜色
   */
  background?: boolean;
  /**
   * 配套的样式
   */
  perfect?: boolean;
  /**
   * 当只有一页时隐藏
   */
  autoHidden?: boolean;
  /**
   * 自定义图标
   */
  iconPrevPage?: string;
  iconJumpPrev?: string;
  iconJumpNext?: string;
  iconNextPage?: string;
  iconJumpMore?: string;
}

export type PageSizeItemType = number | {
  label?: number | string;
  value?: number | string;
}

export interface PagerMethods {
  dispatchEvent(type: ValueOf<VxePagerEmits>, params: any, evnt?: Event): void;
  /**
   * 上一页
   */
  prevPage(): Promise<any>;
  /**
   * 下一页
   */
  nextPage(): Promise<any>;
  /**
   * 向上翻页
   */
  prevJump(): Promise<any>;
  /**
   * 向下翻页
   */
  nextJump(): Promise<any>;
}
export interface VxePagerMethods extends PagerMethods { }

export interface PagerPrivateMethods {
  handlePrevPage(evnt: Event): void,
  handleNextPage(evnt: Event): void,
  handlePrevJump(evnt: Event): void,
  handleNextJump(evnt: Event): void,
}
export interface VxePagerPrivateMethods extends PagerPrivateMethods { }

export type VxePagerEmits = [
  'update:pageSize',
  'update:currentPage',
  'page-change'
]

export namespace VxePagerDefines {
  interface PagerEventParams extends VxeEvent {
    $pager: VxePagerConstructor;
  }

  export type PageChangeParams = {
    type: 'current' | 'size';
    pageSize: number;
    currentPage: number;
  }
  export interface PageChangeEventParams extends PagerEventParams, PageChangeParams { }
}

export interface VxePagerListeners { }

export namespace VxePagerEvents {
  export type PageChange = (params: VxePagerDefines.PageChangeEventParams) => void;
}
