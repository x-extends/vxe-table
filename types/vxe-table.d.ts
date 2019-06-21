import Vue from 'vue';
import { Table } from './table';
import { Column } from './column';
import { Header } from './header';
import { Body } from './body';
import { Footer } from './footer';
import { Filter } from './filter';
import { Loading } from './loading';
import { Grid } from './grid';
import { Excel } from './excel';
import { Menu } from './menu';
import { Toolbar } from './toolbar';
import { Pager } from './pager';
import { Checkbox } from './checkbox';
import { Radio } from './radio';
import { Input } from './input';
import { Button } from './button';
import { Message } from './message';
import { Export } from './export';
import { Resize } from './resize';

export function install(vue: typeof Vue): void;

export interface GlobalOptions<T> {
  showOverflow: boolean;
  showHeaderOverflow: boolean;
  contextMenu: Array<object>;
  resizeInterval: number;
  size: string;
  resizable: boolean;
  stripe: boolean;
  border: boolean;
  fit: boolean;
  showHeader: boolean;
  version: string | number;
  optimization: object;
  tooltipConfig: object;
  iconMap: object;
  pager: object;
  toolbar: object;
  message: object;
  i18n(key: string, value: any): any;
}

export interface Interceptor {
  get(type: string): any;
  add(type: string, callback: Function): Renderer;
  delete(type: object): Renderer;
}

export interface Renderer {
  mixin(map: object): Renderer;
  get(name: string): any;
  add(name: string, options: object): Renderer;
  delete(name: object): Renderer;
}

export interface VXETableStatic {
  /**
   * 国际化
   */
  t(obj: object, key: string): string | number;
  /**
   * 设置全局参数
   * @param options 参数
   */
  setup(options: GlobalOptions<any>): any;
  /**
   * 安装插件
   * @param Plugin 插件 
   * @param options 参数
   */
  use(Plugin: object, options: object): any;
  /**
   * 事件拦截器
   */
  interceptor: Interceptor;
  /**
   * 单元格渲染器
   */
  renderer: Renderer;
}

declare const VXETable: VXETableStatic;

export {
  VXETable,
  Table,
  Column,
  Header,
  Body,
  Footer,
  Filter,
  Loading,
  Grid,
  Excel,
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Message,
  Export,
  Resize
}