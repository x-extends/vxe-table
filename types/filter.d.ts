import { VXETableModule } from './module';

/**
 * 筛选模块
 */
export declare class Filter extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}