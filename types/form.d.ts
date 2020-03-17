import { VXETableModule } from './component';

/**
 * 表单
 */
export declare class Form extends VXETableModule {
  loading?: boolean;
  data?: any;
  span?: string | number;
  align?: string;
  titleAlign?: string;
  titleWidth?: string | number;
  titleColon?: boolean;
  items?: any[];
  rules?: Object;

  validate(callback?: Function): Promise<any>;
  clearValidate(field?: string): Promise<any>;
  updateStatus(scope: any): Promise<any>;
  toggleCollapse(): Promise<any>;
}