import { VXETableModule } from './module';

/**
 * 动态表格
 */
export declare class Grid extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}