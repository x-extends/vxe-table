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

  commitProxy(): Promise<any>;
  getPendingRecords(): any[];
  zoom(): Promise<boolean>;
  isMaximized(): boolean;
  getProxyInfo(): { data: any, filter: any, form: any, sort: any, pager: any, pendingRecords: any[] };
}