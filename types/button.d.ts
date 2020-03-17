import { VXETableModule } from './component';

/**
 * 按钮
 */
export declare class Button extends VXETableModule {
  type?: string;
  name?: string | number;
  content?: string;
  status?: string;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}