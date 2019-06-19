import { VXETableModule } from './module';

/**
 * 表内容模块
 */
export declare class Body extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}