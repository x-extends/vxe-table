import { App } from 'vue'
import { VXETableSetupOptions, VXETableCore } from './v-x-e-table'

export function install(app: App, options?: VXETableSetupOptions): void;

declare global {
  interface Window {
    VXETable: VXETableCore;
  }
}

// Constructor
export * from './v-x-e-table'
export * from './component'

// Module
export * from './header'
export * from './footer'
export * from './icon'
export * from './filter'
export * from './menu'
export * from './edit'
export * from './export'
export * from './keyboard'
export * from './validator'

// Component
export * from './table'
export * from './column'
export * from './colgroup'
export * from './grid'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './checkbox-group'
export * from './radio'
export * from './radio-group'
export * from './radio-button'
export * from './input'
export * from './textarea'
export * from './button'
export * from './select'
export * from './optgroup'
export * from './option'
export * from './modal'
export * from './tooltip'
export * from './form'
export * from './form-gather'
export * from './form-item'
export * from './switch'
export * from './list'
export * from './pulldown'

// Plugins
export * from './plugins'
