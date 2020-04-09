const GlobalConfig = {
  // size: null, // 全局尺寸
  zIndex: 100, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // resizeInterval: 500,
  emptyCell: '　',
  table: {
    fit: true,
    showHeader: true,
    // keepSource: false,
    // showOverflow: null,
    // showHeaderOverflow: null,
    // showFooterOverflow: null,
    // resizeInterval: 500,
    // size: null,
    // zIndex: null,
    // resizable: false,
    // stripe: false,
    // border: false,
    // radioConfig: {
    //   trigger: 'default'
    // },
    // checkboxConfig: {
    //   trigger: 'default'
    // },
    // sortConfig: {
    //   remote: false,
    //   trigger: 'default',
    //   orders: ['asc', 'desc', null]
    // },
    // filterConfig: {
    //   remote: false
    // },
    // expandConfig: {
    //   trigger: 'default'
    // },
    // treeConfig: {
    //   children: 'children',
    //   hasChild: 'hasChild',
    //   indent: 20
    // },
    // tooltipConfig: {
    //   theme: 'dark',
    //   enterable: false
    // },
    // validConfig: {
    //   message: 'default'
    // },
    // editConfig: {
    //   mode: 'cell'
    // },
    // contextMenu: {
    //   visibleMethod () {}
    // },
    // rowId: '_XID', // 行数据的唯一主键字段名
    importConfig: {
      modes: ['insert', 'covering']
    },
    exportConfig: {
      isPrint: true,
      modes: ['current', 'selected']
    },
    optimization: {
      animat: true,
      // cloak: false,
      delayHover: 250,
      // rHeights: {
      //   default: 48,
      //   medium: 44,
      //   small: 40,
      //   mini: 36
      // },
      scrollX: {
        gt: 60
        // oSize: 0,
        // rSize: 0
        // vSize: 0
      },
      scrollY: {
        gt: 100
        // oSize: 0,
        // rSize: 0
        // vSize: 0,
        // rHeight: 0
      }
    }
  },
  icon: {
    // table
    TABLE_SORT_ASC: 'vxe-icon--caret-top',
    TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
    TABLE_FILTER_NONE: 'vxe-icon--funnel',
    TABLE_FILTER_MATCH: 'vxe-icon--funnel',
    TABLE_EDIT: 'vxe-icon--edit-outline',
    TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
    TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
    TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
    TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
    TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
    TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

    // button
    BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
    BUTTON_LOADING: 'vxe-icon--refresh roll',

    // select
    SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
    SELECT_CLOSE: 'vxe-icon--caret-bottom',

    // pager
    PAGER_JUMP_PREV: 'vxe-icon--d-arrow-left',
    PAGER_JUMP_NEXT: 'vxe-icon--d-arrow-right',
    PAGER_PREV_PAGE: 'vxe-icon--arrow-left',
    PAGER_NEXT_PAGE: 'vxe-icon--arrow-right',
    PAGER_JUMP_MORE: 'vxe-icon--more',

    // input
    INPUT_CLEAR: 'vxe-icon--close',
    INPUT_PWD: 'vxe-icon--eye-slash',
    INPUT_SHOW_PWD: 'vxe-icon--eye',
    INPUT_PREV_NUM: 'vxe-icon--caret-top',
    INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
    INPUT_DATE: 'vxe-icon--calendar',

    // modal
    MODAL_ZOOM_IN: 'vxe-icon--square',
    MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
    MODAL_CLOSE: 'vxe-icon--close',
    MODAL_INFO: 'vxe-icon--info',
    MODAL_SUCCESS: 'vxe-icon--success',
    MODAL_WARNING: 'vxe-icon--warning',
    MODAL_ERROR: 'vxe-icon--error',
    MODAL_QUESTION: 'vxe-icon--question',
    MODAL_LOADING: 'vxe-icon--refresh roll',

    // toolbar
    TOOLBAR_TOOLS_REFRESH: 'vxe-icon--refresh',
    TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
    TOOLBAR_TOOLS_IMPORT: 'vxe-icon--upload',
    TOOLBAR_TOOLS_EXPORT: 'vxe-icon--download',
    TOOLBAR_TOOLS_ZOOM_IN: 'vxe-icon--zoomin',
    TOOLBAR_TOOLS_ZOOM_OUT: 'vxe-icon--zoomout',
    TOOLBAR_TOOLS_CUSTOM: 'vxe-icon--menu',

    // form
    FORM_PREFIX: 'vxe-icon--info',
    FORM_SUFFIX: 'vxe-icon--info',
    FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
    FORM_UNFOLDING: 'vxe-icon--arrow-top'
  },
  grid: {
    // size: null,
    proxyConfig: {
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: 'result',
        total: 'page.total'
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
  tooltip: {
    // size: null,
    trigger: 'hover',
    theme: 'dark',
    leaveDelay: 300
  },
  pager: {
    // size: null,
    // autoHidden: false,
    // perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {
    // size: null,
    // colon: false
  },
  input: {
    // size: null,
    // transfer: false
    // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    // labelFormat: '',
    // valueFormat: '',
    startWeek: 1,
    digits: 2
  },
  textarea: {
    // size: null,
    // autosize: {
    //   minRows: 1,
    //   maxRows: 10
    // }
  },
  select: {
    // size: null,
    // transfer: false
  },
  toolbar: {
    // size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // resizable: {
    //   storage: false
    // },
    // custom: {
    //   storage: false,
    //   isFooter: true
    // },
    // buttons: []
  },
  button: {
    // size: null,
    // transfer: false
  },
  radio: {
    // size: null
  },
  checkbox: {
    // size: null
  },
  switch: {
    // size: null
  },
  modal: {
    // size: null,
    minWidth: 340,
    minHeight: 200,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 8,
    dblclickZoom: true,
    showTitleOverflow: true,
    animat: true,
    // storage: false,
    storageKey: 'VXE_MODAL_POSITION'
  },
  i18n: key => key
}

export default GlobalConfig
