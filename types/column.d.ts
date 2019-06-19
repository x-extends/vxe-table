import { VXETableModule } from './module';

/**
 * 列模块
 */
export declare class Column extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}