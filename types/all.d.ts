import { VueConstructor } from 'vue'
import { VxeUIExport, VxeGlobalConfig, VxeComponentKebabCaseKeys } from 'vxe-pc-ui'

// Vxe Table
import VxeColumn from 'vxe-pc-ui/types/components/column'
import VxeColgroup from 'vxe-pc-ui/types/components/colgroup'
import VxeTable from 'vxe-pc-ui/types/components/table'
import VxeGrid from 'vxe-pc-ui/types/components/grid'
import VxeToolbar from 'vxe-pc-ui/types/components/toolbar'

declare global {
  interface Window {
    VxeUITable: VxeUIExport

    /**
     * @deprecated
     */
    VXETable: VxeUIExport
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

interface AllComponents {
  // Vxe Table
  /**
   * Column 基础表格 - 列
   */
  VxeColumn: typeof VxeColumn
  /**
   * Colgroup 基础表格 - 分组列
   */
  VxeColgroup: typeof VxeColgroup
  /**
   * Table 基础表格
   */
  VxeTable: typeof VxeTable
  /**
   * Grid 高级表格
   */
  VxeGrid: typeof VxeGrid
  /**
   * Toolbar 基础表格 - 工具栏
   */
  VxeToolbar: typeof VxeToolbar
}

declare module '@vxe-ui/core' {
  export interface VxeGlobalComponents extends AllComponents, VxeComponentKebabCaseKeys<AllComponents> {}
}

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
