import { VxeUI } from '@vxe-ui/core'

export const version = process.env.VUE_APP_VXE_VERSION as string

VxeUI.tableVersion = version

/**
 * 已废弃，兼容老版本
 * @deprecated
 */
VxeUI.version = version

VxeUI.setConfig({
  emptyCell: '　',

  table: {
    fit: true,
    showHeader: true,
    animat: true,
    delayHover: 250,
    autoResize: true,
    padding: true,
    // minHeight: null,
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
      // refreshDelay: 20
    },
    resizableConfig: {
      dragMode: 'auto',
      showDragTip: true,
      isSyncAutoHeight: true,
      isSyncAutoWidth: true,
      minHeight: 18
    },
    currentRowConfig: {
      strict: true
    },
    currentColumnConfig: {
      strict: true
    },
    radioConfig: {
      // trigger: 'default'
      strict: true
    },
    rowDragConfig: {
      showIcon: true,
      animation: true,
      showGuidesStatus: true,
      showDragTip: true
    },
    columnDragConfig: {
      showIcon: true,
      animation: true,
      showGuidesStatus: true,
      showDragTip: true
    },
    checkboxConfig: {
      // trigger: 'default',
      strict: true
    },
    tooltipConfig: {
      mode: 'tooltip',
      enterable: true,
      defaultPlacement: 'top'
    },
    headerTooltipConfig: {
      mode: 'tooltip',
      enterable: true
    },
    footerTooltipConfig: {
      mode: 'tooltip',
      enterable: true
    },
    validConfig: {
      showErrorMessage: true,
      autoClear: true,
      autoPos: true,
      message: 'inline',
      msgMode: 'single',
      theme: 'beautify'
    },
    columnConfig: {
      autoOptions: {
        isCalcHeader: true,
        isCalcBody: true,
        isCalcFooter: true
      },
      maxFixedSize: 4
    },
    cellConfig: {
      padding: true
    },
    headerCellConfig: {
      height: 'unset'
    },
    footerCellConfig: {
      height: 'unset'
    },
    menuConfig: {
      // visibleMethod () {},
      // transfer: false,
      destroyOnClose: true
    },
    customConfig: {
      // enabled: false,
      storeDriver: 'localStorage',
      allowVisible: true,
      allowResizable: true,
      allowFixed: true,
      allowSort: true,
      allowAlign: true,
      showSortDragButton: true,
      showFooter: true,
      placement: 'top-right',
      //  storage: false,
      storeOptions: {
        visible: true,
        resizable: true,
        sort: true,
        fixed: true,
        align: true,
        headerAlign: true,
        footerAlign: true,
        aggFunc: true
      },
      // autoAggGroupValues: false,
      //  checkMethod () {},
      modalOptions: {
        showMaximize: true,
        mask: true,
        lockView: true,
        resize: true,
        escClosable: true
      },
      drawerOptions: {
        mask: true,
        lockView: true,
        escClosable: true,
        resize: true
      }
    },
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true,
      allowClear: true,
      allowBtn: true,
      iconLayout: 'vertical'
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      // isEvery: false,
      // transfer: false,
      destroyOnClose: true,
      multiple: true,
      showIcon: true,
      maxHeight: 320
    },
    floatingFilterConfig: {
      // enabled: false
    },
    aggregateConfig: {
      padding: true,
      placement: 'left',
      rowField: 'id',
      parentField: '_X_ROW_PARENT_KEY',
      childrenField: '_X_ROW_CHILDREN',
      mapChildrenField: '_X_ROW_CHILD_LIST',
      indent: 28,
      showIcon: true,
      maxGroupSize: 4,
      showAggFuncTitle: true
    },
    treeConfig: {
      padding: true,
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children',
      hasChildField: 'hasChild',
      mapChildrenField: '_X_ROW_CHILD',
      indent: 28,
      showIcon: true,
      // lineType: 'dashed',
      showRootLine: true
    },
    expandConfig: {
      // trigger: 'default',
      showIcon: true,
      mode: 'fixed'
    },
    editConfig: {
      // mode: 'cell',
      // cache: true,
      showIcon: true,
      showAsterisk: true,
      autoFocus: true,
      isReuseKeep: true
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
    printConfig: {},
    mouseConfig: {
      extension: true
    },
    keyboardConfig: {
      isAll: true,
      isEsc: true
    },
    areaConfig: {
      autoClear: true,
      selectCellByHeader: true,
      selectCellByBody: true,
      extendDirection: {
        top: true,
        left: true,
        bottom: true,
        right: true
      }
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
    virtualXConfig: {
      // enabled: false,
      gt: 24,
      preSize: 0,
      oSize: 0
    },
    virtualYConfig: {
      // enabled: false,
      // mode: 'wheel',
      gt: 100,
      preSize: 1,
      oSize: 0
    },
    scrollbarConfig: {
      // xConfig: {
      //   // position: 'bottom',
      //   // visible: true
      // },
      // yConfig: {
      //   // position: 'right',
      //   // visible: true
      // }
    },
    undoRedoHistoryConfig: {
      stackSize: 50
    }
  },
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
      showLoading: true,
      showResponseMsg: true,
      showActionMsg: true,
      response: {
        list: 'list',
        result: 'result',
        total: 'page.total',
        footerData: 'footerData',
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
  },

  gantt: {}
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
  TABLE_CHECKBOX_DISABLED_UNCHECKED: iconPrefix + 'checkbox-unchecked-fill',
  TABLE_RADIO_CHECKED: iconPrefix + 'radio-checked-fill',
  TABLE_RADIO_UNCHECKED: iconPrefix + 'radio-unchecked',
  TABLE_RADIO_DISABLED_UNCHECKED: iconPrefix + 'radio-unchecked-fill',
  TABLE_CUSTOM_SORT: iconPrefix + 'drag-handle',
  TABLE_CUSTOM_FIXED_LEFT: iconPrefix + 'fixed-left',
  TABLE_CUSTOM_FIXED_RIGHT: iconPrefix + 'fixed-right',
  TABLE_CUSTOM_ALIGN_LEFT: iconPrefix + 'align-left',
  TABLE_CUSTOM_ALIGN_CENTER: iconPrefix + 'align-center',
  TABLE_CUSTOM_ALIGN_RIGHT: iconPrefix + 'align-right',
  TABLE_CUSTOM_MOVE_UP: iconPrefix + 'arrows-up',
  TABLE_CUSTOM_MOVE_DN: iconPrefix + 'arrows-down',
  TABLE_CUSTOM_PUT_TOP: iconPrefix + 'top',
  TABLE_CUSTOM_PUT_BOTTOM: iconPrefix + 'bottom',
  TABLE_MENU_OPTIONS: iconPrefix + 'arrow-right',
  TABLE_MENU_OPTION_LOADING: iconPrefix + 'repeat roll',
  TABLE_DRAG_ROW: iconPrefix + 'drag-handle',
  TABLE_DRAG_COLUMN: iconPrefix + 'drag-handle',
  TABLE_DRAG_STATUS_ROW: iconPrefix + 'sort',
  TABLE_DRAG_STATUS_SUB_ROW: iconPrefix + 'add-sub',
  TABLE_DRAG_STATUS_AGG_GROUP: iconPrefix + 'grouping',
  TABLE_DRAG_STATUS_AGG_VALUES: iconPrefix + 'values',
  TABLE_DRAG_STATUS_COLUMN: iconPrefix + 'swap',
  TABLE_DRAG_DISABLED: iconPrefix + 'no-drop',
  TABLE_ROW_GROUP_OPEN: iconPrefix + 'arrow-right rotate90',
  TABLE_ROW_GROUP_CLOSE: iconPrefix + 'arrow-right',
  TABLE_AGGREGATE_GROUPING: iconPrefix + 'grouping',
  TABLE_AGGREGATE_VALUES: iconPrefix + 'values',
  TABLE_AGGREGATE_SORT: iconPrefix + 'drag-handle',
  TABLE_AGGREGATE_DELETE: iconPrefix + 'close',

  // toolbar
  TOOLBAR_TOOLS_REFRESH: iconPrefix + 'repeat',
  TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + 'repeat roll',
  TOOLBAR_TOOLS_IMPORT: iconPrefix + 'upload',
  TOOLBAR_TOOLS_EXPORT: iconPrefix + 'download',
  TOOLBAR_TOOLS_PRINT: iconPrefix + 'print',
  TOOLBAR_TOOLS_FULLSCREEN: iconPrefix + 'fullscreen',
  TOOLBAR_TOOLS_MINIMIZE: iconPrefix + 'minimize',
  TOOLBAR_TOOLS_CUSTOM: iconPrefix + 'setting',
  TOOLBAR_TOOLS_FIXED_LEFT: iconPrefix + 'fixed-left',
  TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE: iconPrefix + 'fixed-left-fill',
  TOOLBAR_TOOLS_FIXED_RIGHT: iconPrefix + 'fixed-right',
  TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE: iconPrefix + 'fixed-right-fill'
})

export {
  VxeUI
}

// 兼容老版本
export * from './abandon'

export default VxeUI
