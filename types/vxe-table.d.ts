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

export interface VXETableOptions {
  showOverflow?: boolean;
  showHeaderOverflow?: boolean;
  resizeInterval?: number;
  size?: string;
  validConfig?: object;
  resizable?: boolean;
  stripe?: boolean;
  border?: boolean;
  fit?: boolean;
  emptyCell?: string;
  showHeader?: boolean;
  rowId?: string;
  version?: string | number;
  optimization?: object;
  icon?: object;
  grid?: object;
  menu?: object;
  tooltip?: object;
  pager?: object;
  toolbar?: object;
  message?: object;
  i18n?(key: string, value: any): any;
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

export interface PluginObject<T> {
  install(xTable: typeof VXETable): any;
}

export function install(vue: typeof Vue): void;
export function t(obj: object, key: string): string | number;
export function setup(options: VXETableOptions): any;
export function use(plugin: PluginObject<any>, ...options: any[]): VXETableStatic;

export const interceptor: Interceptor;
export const renderer: Renderer;

export interface VXETableStatic {
  install(vue: typeof Vue): void;
  /**
   * International translation
   */
  t(obj: object, key: string): string | number;
  /**
   * Set global parameters
   * @param options
   */
  setup(options: VXETableOptions): any;
  /**
   * Installing a plug-in
   * @param plugin 
   * @param options
   */
  use(plugin: PluginObject<any>, ...options: any[]): VXETableStatic;
  /**
   * Event collision interceptor
   */
  interceptor: Interceptor;
  /**
   * Renderer
   */
  renderer: Renderer;
}

/**
 * A fully functional Vue table component.
 */
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