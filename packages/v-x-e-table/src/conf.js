const iconPrefix = 'vxe-icon-'

export default {
  size: null, // 全局尺寸
  zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // resizeInterval: 500,
  emptyCell: '　',
  // loadingText: null, // 自定义loading提示内容，如果为null则不显示文本
  table: {
    fit: true,
    showHeader: true,
    animat: true,
    delayHover: 250,
    autoResize: true,
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
      message: 'default'
    },
    // menuConfig: {
    //   visibleMethod () {}
    // },
    // customConfig: {
    //  storage: false,
    //  checkMethod () {}
    // },
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      showIcon: true
    },
    treeConfig: {
      rowField: 'id',
      parentField: 'parentId',
      children: 'children',
      hasChild: 'hasChild',
      mapChildren: '_X_ROW_CHILD',
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
      modes: ['insert', 'covering']
    },
    exportConfig: {
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
      enabled: true,
      gt: 60
      // oSize: 0
    },
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  export: {
    types: {}
  },
  icon: {
    // loading
    LOADING: iconPrefix + 'spinner roll vxe-loading--default-icon',

    // table
    TABLE_SORT_ASC: iconPrefix + 'caret-up',
    TABLE_SORT_DESC: iconPrefix + 'caret-down',
    TABLE_FILTER_NONE: iconPrefix + 'funnel',
    TABLE_FILTER_MATCH: iconPrefix + 'funnel',
    TABLE_EDIT: iconPrefix + 'edit',
    TABLE_HELP: iconPrefix + 'question-circle-fill',
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

    // button
    BUTTON_DROPDOWN: iconPrefix + 'arrow-down',
    BUTTON_LOADING: iconPrefix + 'spinner roll',

    // select
    SELECT_LOADED: iconPrefix + 'spinner roll',
    SELECT_OPEN: iconPrefix + 'caret-down rotate180',
    SELECT_CLOSE: iconPrefix + 'caret-down',

    // pager
    PAGER_JUMP_PREV: iconPrefix + 'arrow-double-left',
    PAGER_JUMP_NEXT: iconPrefix + 'arrow-double-right',
    PAGER_PREV_PAGE: iconPrefix + 'arrow-left',
    PAGER_NEXT_PAGE: iconPrefix + 'arrow-right',
    PAGER_JUMP_MORE: iconPrefix + 'ellipsis-h',

    // input
    INPUT_CLEAR: iconPrefix + 'error-circle-fill',
    INPUT_PWD: iconPrefix + 'eye-fill',
    INPUT_SHOW_PWD: iconPrefix + 'eye-fill-close',
    INPUT_PREV_NUM: iconPrefix + 'caret-up',
    INPUT_NEXT_NUM: iconPrefix + 'caret-down',
    INPUT_DATE: iconPrefix + 'calendar',
    INPUT_SEARCH: iconPrefix + 'search',

    // modal
    MODAL_ZOOM_IN: iconPrefix + 'square',
    MODAL_ZOOM_OUT: iconPrefix + 'maximize',
    MODAL_CLOSE: iconPrefix + 'close',
    MODAL_INFO: iconPrefix + 'info-circle-fill',
    MODAL_SUCCESS: iconPrefix + 'success-circle-fill',
    MODAL_WARNING: iconPrefix + 'warnion-circle-fill',
    MODAL_ERROR: iconPrefix + 'error-circle-fill',
    MODAL_QUESTION: iconPrefix + 'question-circle-fill',
    MODAL_LOADING: iconPrefix + 'spinner roll',

    // toolbar
    TOOLBAR_TOOLS_REFRESH: iconPrefix + 'repeat',
    TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + 'repeat roll',
    TOOLBAR_TOOLS_IMPORT: iconPrefix + 'upload',
    TOOLBAR_TOOLS_EXPORT: iconPrefix + 'download',
    TOOLBAR_TOOLS_PRINT: iconPrefix + 'print',
    TOOLBAR_TOOLS_FULLSCREEN: iconPrefix + 'fullscreen',
    TOOLBAR_TOOLS_MINIMIZE: iconPrefix + 'minimize',
    TOOLBAR_TOOLS_CUSTOM: iconPrefix + 'custom-column',

    // form
    FORM_PREFIX: iconPrefix + 'question-circle-fill',
    FORM_SUFFIX: iconPrefix + 'question-circle-fill',
    FORM_FOLDING: iconPrefix + 'arrow-up rotate180',
    FORM_UNFOLDING: iconPrefix + 'arrow-up'
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
  tooltip: {
    // size: null,
    trigger: 'hover',
    theme: 'dark',
    enterDelay: 500,
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
    // preventSubmit: false,
    // size: null,
    // colon: false,
    validConfig: {
      showMessage: true,
      autoPos: true
    },
    tooltipConfig: {
      enterable: true
    },
    titleAsterisk: true
  },
  input: {
    // size: null,
    // transfer: false
    // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    // labelFormat: '',
    // valueFormat: '',
    startDate: new Date(1900, 0, 1),
    endDate: new Date(2100, 0, 1),
    startDay: 1,
    selectDay: 1,
    digits: 2,
    controls: true
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
    // transfer: false,
    // optionConfig: {
    //   keyField: '_X_OPTION_KEY'
    // },
    multiCharOverflow: 8
  },
  toolbar: {
    // size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // custom: {
    //   isFooter: true
    // },
    // buttons: []
  },
  button: {
    // size: null,
    // transfer: false
  },
  radio: {
    // size: null,
    strict: true
  },
  radioButton: {
    // size: null,
    strict: true
  },
  radioGroup: {
    // size: null,
    strict: true
  },
  checkbox: {
    // size: null
  },
  switch: {
    // size: null
  },
  modal: {
    // size: null,
    top: 15,
    showHeader: true,
    minWidth: 340,
    minHeight: 140,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 0,
    dblclickZoom: true,
    showTitleOverflow: true,
    animat: true,
    showClose: true,
    draggable: true,
    // storage: false,
    storageKey: 'VXE_MODAL_POSITION'
  },
  list: {
    // size: null,
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  i18n: key => key
}
