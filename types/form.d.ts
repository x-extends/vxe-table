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
}