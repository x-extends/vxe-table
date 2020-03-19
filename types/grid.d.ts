import { Table } from './table';

/**
 * 高级表格
 */
export declare class Grid extends Table {
  columns?: any[];
  pagerConfig?: boolean | any;
  proxyConfig?: any;
  toolbar?: boolean | any;
  formConfig?: boolean | any;

  /**
   * 给数据代理提交指令
   * @param code 指令编码
   */
  commitProxy(code: string): Promise<any>;
  /**
   * 获取已标记删除的数据
   */
  getPendingRecords(): any[];
  /**
   * 切换表格最大化/还原
   */
  zoom(): Promise<boolean>;
  /**
   * 判断是否最大化显示
   */
  isMaximized(): boolean;
  /**
   * 获取数据代理信息
   */
  getProxyInfo(): { data: any, filter: any, form: any, sort: any, pager: any, pendingRecords: any[] };
}