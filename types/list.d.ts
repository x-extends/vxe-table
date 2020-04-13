import { VXETableModule } from './component'

/**
 * 列表
 */
export declare class List extends VXETableModule {
  /**
   * 绑定值
   */
  data?: any[];
  /**
   * 列表高度
   */
  height?: number | string;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 纵向虚拟滚动配置
   */
  scrollY?: {
    gt?: number;
    oSize?: number;
    rSize?: number;
    vSize?: number;
    sItem?: string;
  };
}
