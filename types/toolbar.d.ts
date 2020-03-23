import { VXETableModule } from './component'
import { TableRenderParams } from './table'
import { ColumnConfig } from './column'
import { RenderOptions } from './extends/renderer'

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
    checkMethod?(params: { column: ColumnConfig }): boolean;
    isFooter?: Boolean;
    icon?: string;
    [key: string]: any;
  };
  /**
   * 按钮列表
   */
  buttons?: ButtonConfig[];
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
    checkMethod?(params: { column: ColumnConfig }): boolean;
    isFooter?: Boolean;
    icon?: string;
    [key: string]: any;
  };
  /**
   * 按钮列表
   */
  buttons?: ButtonConfig[];
  /**
   * 配套的样式
   */
  perfect?: boolean;
}

/**
 * 按钮渲染配置项
 */
export interface buttonRenderOptions extends RenderOptions {}

/**
 * 按钮渲染渲染参数
 */
export interface buttonRenderParams extends TableRenderParams {
  /**
   * 按钮对象
   */
  button: ButtonConfig;
}

export class ButtonConfig {
  name?: string;
  type?: string;
  status?: string;
  code?: string;
  visible?: boolean;
  disabled?: boolean;
  icon?: string;
  dropdowns?: string;
  buttonRender?: buttonRenderOptions;
}
