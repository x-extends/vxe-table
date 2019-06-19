import { VXETableModule } from './module';

/**
 * 消息提示框
 */
export declare class Message extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}