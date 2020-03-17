import { VXETableModule } from './component';

/**
 * 工具提示
 */
export declare class Tooltip extends VXETableModule {
  value?: boolean;
  trigger?: string;
  theme?: string;
  content?: string | Function;
  zIndex?: string | number;
  isArrow?: boolean;
  enterable?: boolean;
  leaveDelay?: number;
}