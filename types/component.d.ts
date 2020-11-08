import { App, ComponentPublicInstance } from 'vue'

export type SizeType = null | 'medium' | 'small' | 'mini';
export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];

export interface VXETableComponent extends ComponentPublicInstance {
  install(app: App): void;
}

export interface VxeComponentInstance {
  xID: string;
}

export interface RecordInfo {
  [key: string]: any;
}

export interface RowInfo {
  [key: string]: any;
}

export interface VxeEvent {
  $event: Event;
  [key: string]: any;
}

export interface VNodeStyle {
  [key: string]: string | number
}

export function EmitEvent<T>(type: ValueOf<T>, params: any, evnt: Event): void;
export function EmitEvent2(type: any, params: any, evnt: Event): void;
