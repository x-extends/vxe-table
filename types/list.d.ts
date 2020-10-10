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
  };

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
  scrollTo(scrollLeft: number, scrollTop?: number): Promise<any>;

  /**
   * 刷新滚动操作，手动同步滚动相关位置
   */
  refreshScroll(): Promise<any>;
  
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll(): Promise<any>;
}
