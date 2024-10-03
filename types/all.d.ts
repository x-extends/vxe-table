import { VueConstructor } from 'vue'
import { VxeUIExport, VxeGlobalConfig } from 'vxe-pc-ui'

declare global {
  interface Window {
    /**
     * @deprecated
     */
    VXETable: VxeUIExport;
    VxeUITable: VxeUIExport;
  }
}

/**
 * 已废弃，请使用 VxeUI
 * @deprecated
 */
export const VXETable: VxeUIExport

/**
 * 已废弃，请使用 VxeUIExport
 * @deprecated
 */
export type VXETableCore = VxeUIExport

export function install (app: VueConstructor, options?: VxeGlobalConfig): void

// Vxe core
export * from 'vxe-pc-ui/types/ui'

// Vxe Table
export * from 'vxe-pc-ui/types/components/column'
export * from 'vxe-pc-ui/types/components/colgroup'
export * from 'vxe-pc-ui/types/components/table'
export * from 'vxe-pc-ui/types/components/grid'
export * from 'vxe-pc-ui/types/components/toolbar'

// 已废弃，兼容老版本类型
export * from 'vxe-pc-ui/types/components/textarea'
export * from 'vxe-pc-ui/types/components/select'
export * from 'vxe-pc-ui/types/components/switch'
export * from 'vxe-pc-ui/types/components/optgroup'
export * from 'vxe-pc-ui/types/components/option'
export * from 'vxe-pc-ui/types/components/pager'
export * from 'vxe-pc-ui/types/components/form'
export * from 'vxe-pc-ui/types/components/form-item'
export * from 'vxe-pc-ui/types/components/modal'
export * from 'vxe-pc-ui/types/components/button'
export * from 'vxe-pc-ui/types/components/button-group'
export * from 'vxe-pc-ui/types/components/input'
export * from 'vxe-pc-ui/types/components/pulldown'
export * from 'vxe-pc-ui/types/components/tooltip'
