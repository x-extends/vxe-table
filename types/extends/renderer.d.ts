import { CreateElement, VNode } from 'vue'
import { EmptyRender, EmptyRenderParams } from '../table'
import { FilterRenderOptions, FilterRenderParams, FilterMethodParams, CellRenderOptions, ContentRenderOptions, CellRenderParams, EditRenderOptions, EditRenderParams, FooterRenderParams, FilterResetParams } from '../column'
import { CellExportParams, FooterCellExportParams } from './export'
import { buttonRenderOptions, buttonRenderParams } from '../toolbar'
import { ItemRenderOptions, ItemRenderParams, ItemVisibleParams, ItemResetParams } from '../form-item'

/**
 * 渲染器
 */
export interface renderer {
  mixin(map: { [name: string]: RendererMapOptions }): renderer;
  get(name: string): RendererMapOptions;
  add(name: string, options: RendererMapOptions): renderer;
  delete(name: string): renderer;
}

export interface RendererMapOptions {
  // 筛选渲染
  className?: string;
  isFooter?: boolean;
  renderFilter?(h: CreateElement, renderOpts: FilterRenderOptions, params: FilterRenderParams): VNode[] | string[];
  filterMethod?(params: FilterMethodParams): boolean;
  filterResetMethod?(params: FilterResetParams): void;

  // 单元格渲染
  renderHeader?(h: CreateElement, renderOpts: CellRenderOptions | EditRenderOptions, params: CellRenderParams | EditRenderParams): VNode[] | string[];
  renderDefault?(h: CreateElement, renderOpts: CellRenderOptions | EditRenderOptions, params: CellRenderParams | EditRenderParams): VNode[] | string[];
  renderFooter?(h: CreateElement, renderOpts: CellRenderOptions | EditRenderOptions, params: FooterRenderParams): VNode[] | string[];
  cellExportMethod?(params: CellExportParams): string;
  footerCellExportMethod?(params: FooterCellExportParams): string;

  // 编辑渲染
  autofocus?: string;
  renderEdit?(h: CreateElement, renderOpts: CellRenderOptions | EditRenderOptions, params: CellRenderParams | EditRenderParams): VNode[] | string[];
  renderCell?(h: CreateElement, renderOpts: CellRenderOptions | EditRenderOptions, params: CellRenderParams | EditRenderParams): VNode[] | string[];
  editCellExportMethod?(params: CellExportParams): string;

  // 内容渲染
  renderExpand?(h: CreateElement, renderOpts: ContentRenderOptions, params: CellRenderParams | EditRenderParams): VNode[] | string[];

  // 工具栏-按钮渲染
  renderButton?(h: CreateElement, renderOpts: buttonRenderOptions, params: buttonRenderParams): VNode[] | string[];

  // 表单-项渲染
  renderItem?(h: CreateElement, renderOpts: ItemRenderOptions, params: ItemRenderParams): VNode[] | string[];
  itemVisibleMethod?(params: ItemVisibleParams): boolean;
  itemResetMethod?(params: ItemResetParams): void;

  // 空内容渲染
  renderEmpty?(h: CreateElement, renderOpts: EmptyRender, params: EmptyRenderParams): VNode[] | string[];

  [key: string]: any;
}

/**
 * 渲染选项
 */
export class RenderOptions {
  /**
   * 渲染器名称
   */
  name: string;
  /**
   * 目标组件渲染的参数
   */
  props?: { [key: string]: any };
  /**
   * 目标组件渲染的属性
   */
  attrs?: { [key: string]: any };
  /**
   * 目标组件渲染的事件
   */
  events?: { [key: string]: Function };
  [key: string]: any;
}

/**
 * 渲染参数
 */
export class RenderParams {}

/**
 * 选项参数
 */
export interface OptionProps extends RenderParams {
  value?: string;
  label?: string;
  disabled?: string;
}

/**
 * 分组选项参数
 */
export interface OptionGroupProps extends RenderParams {
  options?: string;
  label?: string;
}
