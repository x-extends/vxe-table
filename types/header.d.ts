import { VXETableModule } from './module';

/**
 * 表头模块
 */
export declare class Header extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}