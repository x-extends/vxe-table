import { VxeUI, setConfig, setIcon, VxeGlobalConfig, log } from '@vxe-ui/core'

VxeUI.tableVersion = process.env.VUE_APP_VXE_TABLE_VERSION as string

setConfig({
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
      allowFixed: true,
      showFooter: true
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
      _typeMaps: {},
      modes: ['insert', 'covering']
    },
    exportConfig: {
      _typeMaps: {
        csv: 1,
        html: 1,
        xml: 1,
        txt: 1
      },
      modes: ['current', 'selected']
    },
    printConfig: {
      modes: ['current', 'selected']
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

const iconPrefix = 'vxe-icon-'

setIcon({
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
  TABLE_CHECKBOX_CHECKED: iconPrefix + 'checkbox-checked',
  TABLE_CHECKBOX_UNCHECKED: iconPrefix + 'checkbox-unchecked',
  TABLE_CHECKBOX_INDETERMINATE: iconPrefix + 'checkbox-indeterminate',
  TABLE_RADIO_CHECKED: iconPrefix + 'radio-checked',
  TABLE_RADIO_UNCHECKED: iconPrefix + 'radio-unchecked',

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

export function config (options?: VxeGlobalConfig) {
  log.warn('vxe.error.delFunc', ['config', 'setConfig'])
  return setConfig(options)
}

export function setup (options?: VxeGlobalConfig) {
  log.warn('vxe.error.delFunc', ['setup', 'setConfig'])
  return setConfig(options)
}

// 兼容老版本
export const VXETable = VxeUI

export * from '@vxe-ui/core'
export default VxeUI
