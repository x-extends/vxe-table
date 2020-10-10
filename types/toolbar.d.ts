import { CreateElement, VNode } from 'vue'
import { VXETableModule } from './component'
import { ColumnInfo } from './column'
import { GridRenderParams, RenderOptions } from './extends/renderer'

/**
 * 工具栏
 */
export declare class Toolbar extends VXETableModule {
  /**
   * 唯一 ID 标识
   */
  id?: string;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 列宽拖动配置
   */
  resizable?: boolean | {
    storage?: boolean;
  };
  /**
   * 刷新按钮配置
   */
  refresh?: boolean | {
    query?(params: { page: any, sort: any, filters: any, form: any }): Promise<any>;
    icon?: string;
    iconLoading?: string;
  };
  /**
   * 导入按钮配置
   */
  import?: boolean | {
    icon?: string;
    [key: string]: any;
  };
  /**
   * 导出按钮配置
   */
  export?: boolean | {
    icon?: string;
    [key: string]: any;
  };
  /**
   * 自定义列配置
   */
  custom?: boolean | {
    trigger?: string,
    immediate?: boolean;
    storage?: boolean;
    checkMethod?(params: { column: ColumnInfo }): boolean;
    isFooter?: Boolean;
    icon?: string;
    [key: string]: any;
  };
  /**
   * 按钮列表
   */
  buttons?: ToolbarButtonConfig[];
  /**
   * 配套的样式
   */
  perfect?: boolean;
}

export interface ToolbarOptions {
  /**
   * 唯一 ID 标识
   */
  id?: string;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 列宽拖动配置
   */
  resizable?: boolean | {
    storage?: boolean;
  };
  /**
   * 刷新按钮配置
   */
  refresh?: boolean | {
    query?(params: { page: any, sort: any, filters: any, form: any }): Promise<any>;
    icon?: string;
    iconLoading?: string;
  };
  /**
   * 导入按钮配置
   */
  import?: boolean | {
    icon?: string;
    [key: string]: any;
  };
  /**
   * 导出按钮配置
   */
  export?: boolean | {
    icon?: string;
    [key: string]: any;
  };
  /**
   * 自定义列配置
   */
  custom?: boolean | {
    trigger?: string,
    immediate?: boolean;
    storage?: boolean;
    checkMethod?(params: { column: ColumnInfo }): boolean;
    isFooter?: Boolean;
    icon?: string;
    [key: string]: any;
  };
  /**
   * 按钮列表
   */
  buttons?: ToolbarButtonConfig[];
  /**
   * 配套的样式
   */
  perfect?: boolean;

  slots?: {
    buttons?(params: ToolbarButtonsSlotParams, h: CreateElement): VNode[] | string[];
    tools?(params: ToolbarToolsSlotParams, h: CreateElement): VNode[] | string[];
  };
  [key: string]: any;
}

export interface ToolbarButtonsSlotParams extends GridRenderParams {}
export interface ToolbarToolsSlotParams extends ToolbarButtonsSlotParams {}

/**
 * 按钮渲染配置项
 */
export interface ToolbarButtonRenderOptions extends RenderOptions {}

/**
 * 按钮渲染渲染参数
 */
export interface ToolbarButtonRenderParams extends GridRenderParams {
  /**
   * 按钮对象
   */
  button: ToolbarButtonConfig;
}

export class ToolbarButtonConfig {
  name?: string;
  type?: string;
  status?: string;
  code?: string;
  visible?: boolean;
  disabled?: boolean;
  icon?: string;
  dropdowns?: string;
  buttonRender?: ToolbarButtonRenderOptions;
}
