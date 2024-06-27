import { VxeUI } from '@vxe-ui/core'
import { getFuncText } from './src/utils'

import type { VxeUploadDefines, VxePrintDefines, VxeGlobalConfig } from 'vxe-pc-ui'

export const version = process.env.VUE_APP_VXE_VERSION as string

VxeUI.version = version
VxeUI.tableVersion = process.env.VUE_APP_VXE_VERSION as string

VxeUI.setConfig({
  emptyCell: '　',

  table: {
    fit: true,
    showHeader: true,
    animat: true,
    delayHover: 250,
    autoResize: true,
    minHeight: 144,
    // keepSource: false,
    // showOverflow: null,
    // showHeaderOverflow: null,
    // showFooterOverflow: null,
    // resizeInterval: 500,
    // size: null,
    // zIndex: null,
    // stripe: false,
    // border: false,
    // round: false,
    // emptyText: '暂无数据',
    // emptyRender: {
    //   name: ''
    // },
    // rowConfig: {
    //   keyField: '_X_ROW_KEY' // 行数据的唯一主键字段名
    // },
    resizeConfig: {
      refreshDelay: 250
    },
    radioConfig: {
      // trigger: 'default'
      strict: true
    },
    checkboxConfig: {
      // trigger: 'default',
      strict: true
    },
    tooltipConfig: {
      enterable: true
    },
    validConfig: {
      showMessage: true,
      autoClear: true,
      autoPos: true,
      message: 'inline',
      msgMode: 'single'
    },
    columnConfig: {
      maxFixedSize: 4
    },
    // menuConfig: {
    //   visibleMethod () {}
    // },
    customConfig: {
      allowVisible: true,
      allowResizable: true,
      allowFixed: true,
      allowSort: true,
      showFooter: true,
      placement: 'top-right'
      //  storage: false,
      //  checkMethod () {}
    },
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true,
      iconLayout: 'vertical'
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      showIcon: true
    },
    treeConfig: {
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children',
      hasChildField: 'hasChild',
      mapChildrenField: '_X_ROW_CHILD',
      indent: 20,
      showIcon: true
    },
    expandConfig: {
      // trigger: 'default',
      showIcon: true
    },
    editConfig: {
      // mode: 'cell',
      showIcon: true,
      showAsterisk: true
    },
    importConfig: {
      _typeMaps: {
        csv: 1,
        html: 1,
        xml: 1,
        txt: 1
      }
    },
    exportConfig: {
      _typeMaps: {
        csv: 1,
        html: 1,
        xml: 1,
        txt: 1
      }
    },
    printConfig: {
    },
    mouseConfig: {
      extension: true
    },
    keyboardConfig: {
      isEsc: true
    },
    areaConfig: {
      autoClear: true,
      selectCellByHeader: true
    },
    clipConfig: {
      isCopy: true,
      isCut: true,
      isPaste: true
    },
    fnrConfig: {
      isFind: true,
      isReplace: true
    },
    scrollX: {
      // enabled: false,
      gt: 60
      // oSize: 0
    },
    scrollY: {
      // enabled: false,
      gt: 100
      // oSize: 0
    }
  },
  // export: {
  //   types: {}
  // },
  grid: {
    // size: null,
    // zoomConfig: {
    //   escRestore: true
    // },
    formConfig: {
      enabled: true
    },
    pagerConfig: {
      enabled: true
      // perfect: false
    },
    toolbarConfig: {
      enabled: true
      // perfect: false
    },
    proxyConfig: {
      enabled: true,
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: 'result',
        total: 'page.total',
        message: 'message'
      }
      // beforeItem: null,
      // beforeColumn: null,
      // beforeQuery: null,
      // afterQuery: null,
      // beforeDelete: null,
      // afterDelete: null,
      // beforeSave: null,
      // afterSave: null
    }
  },
  toolbar: {
    // size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // buttons: []
  }
})

const iconPrefix = 'vxe-table-icon-'

VxeUI.setIcon({
  // table
  TABLE_SORT_ASC: iconPrefix + 'caret-up',
  TABLE_SORT_DESC: iconPrefix + 'caret-down',
  TABLE_FILTER_NONE: iconPrefix + 'funnel',
  TABLE_FILTER_MATCH: iconPrefix + 'funnel',
  TABLE_EDIT: iconPrefix + 'edit',
  TABLE_TITLE_PREFIX: iconPrefix + 'question-circle-fill',
  TABLE_TITLE_SUFFIX: iconPrefix + 'question-circle-fill',
  TABLE_TREE_LOADED: iconPrefix + 'spinner roll',
  TABLE_TREE_OPEN: iconPrefix + 'caret-right rotate90',
  TABLE_TREE_CLOSE: iconPrefix + 'caret-right',
  TABLE_EXPAND_LOADED: iconPrefix + 'spinner roll',
  TABLE_EXPAND_OPEN: iconPrefix + 'arrow-right rotate90',
  TABLE_EXPAND_CLOSE: iconPrefix + 'arrow-right',
  TABLE_CHECKBOX_CHECKED: iconPrefix + 'checkbox-checked-fill',
  TABLE_CHECKBOX_UNCHECKED: iconPrefix + 'checkbox-unchecked',
  TABLE_CHECKBOX_INDETERMINATE: iconPrefix + 'checkbox-indeterminate-fill',
  TABLE_RADIO_CHECKED: iconPrefix + 'radio-checked-fill',
  TABLE_RADIO_UNCHECKED: iconPrefix + 'radio-unchecked',
  TABLE_CUSTOM_SORT: iconPrefix + 'drag-handle',

  // toolbar
  TOOLBAR_TOOLS_REFRESH: iconPrefix + 'repeat',
  TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + 'repeat roll',
  TOOLBAR_TOOLS_IMPORT: iconPrefix + 'upload',
  TOOLBAR_TOOLS_EXPORT: iconPrefix + 'download',
  TOOLBAR_TOOLS_PRINT: iconPrefix + 'print',
  TOOLBAR_TOOLS_FULLSCREEN: iconPrefix + 'fullscreen',
  TOOLBAR_TOOLS_MINIMIZE: iconPrefix + 'minimize',
  TOOLBAR_TOOLS_CUSTOM: iconPrefix + 'custom-column',
  TOOLBAR_TOOLS_FIXED_LEFT: iconPrefix + 'fixed-left',
  TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE: iconPrefix + 'fixed-left-fill',
  TOOLBAR_TOOLS_FIXED_RIGHT: iconPrefix + 'fixed-right',
  TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE: iconPrefix + 'fixed-right-fill'
})

export const setTheme = VxeUI.setTheme
export const getTheme = VxeUI.getTheme
export const setConfig = VxeUI.setConfig
export const getConfig = VxeUI.getConfig
export const setIcon = VxeUI.setIcon
export const getIcon = VxeUI.getIcon
export const setLanguage = VxeUI.setLanguage
export const setI18n = VxeUI.setI18n
export const getI18n = VxeUI.getI18n

export const globalEvents = VxeUI.globalEvents
export const globalResize = VxeUI.globalResize
export const renderer = VxeUI.renderer
export const validators = VxeUI.validators
export const menus = VxeUI.menus
export const formats = VxeUI.formats
export const commands = VxeUI.commands
export const interceptor = VxeUI.interceptor
export const clipboard = VxeUI.clipboard
export const log = VxeUI.log

export const hooks = VxeUI.hooks
export const use = VxeUI.use

/**
 * 已废弃
 * @deprecated
 */
export const setup = (options?: VxeGlobalConfig) => {
  return VxeUI.setConfig(options)
}
/**
 * 已废弃
 * @deprecated
 */
export const config = (options?: VxeGlobalConfig) => {
  return VxeUI.setConfig(options)
}
/**
 * 已废弃
 * @deprecated
 */
export const t = (key: string, args?: any) => {
  return VxeUI.getI18n(key, args)
}
/**
 * 已废弃
 * @deprecated
 */
export const _t = (content: string | number | boolean | null | undefined, args?: any) => {
  return getFuncText(content, args)
}

/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const VXETable = VxeUI

VXETable.setup = config
VXETable.config = config

/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const saveFile: VxeUploadDefines.SaveFileFunction = (options) => {
  return VxeUI.saveFile(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const readFile: VxeUploadDefines.ReadFileFunction = (options) => {
  return VxeUI.readFile(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const print: VxePrintDefines.PrintFunction = (options) => {
  return VxeUI.print(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const modal = {
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  get (id: any) {
    return VxeUI.modal.get(id)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  close (id: any) {
    return VxeUI.modal.close(id)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  open (options: any) {
    return VxeUI.modal.open(options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  alert (content: any, title: any, options: any) {
    return VxeUI.modal.alert(content, title, options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  confirm (content: any, title: any, options: any) {
    return VxeUI.modal.confirm(content, title, options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  message (content: any, options: any) {
    return VxeUI.modal.message(content, options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  notification (content: any, title: any, options: any) {
    return VxeUI.modal.notification(content, title, options)
  }
}

export {
  VxeUI
}

export default VxeUI
