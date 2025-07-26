export default {
  vxe: {
    base: {
      pleaseInput: 'Please enter',
      pleaseSelect: 'Please select',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'loading...'
    },
    error: {
      downErr: 'Download failed',
      errLargeData: 'When the amount of bound data is too large, please use {0}, otherwise it may cause lag',
      groupFixed: 'If using grouped headers, the frozen column must be set by group',
      groupMouseRange: 'The grouping header cannot be used at the same time as "{0}" and this may cause an error',
      groupTag: 'Grouping column headers should use "{0}" instead of "{1}", which may cause errors',
      scrollErrProp: 'This parameter "{0}" is not supported after virtual scrolling is enabled',
      errConflicts: 'Parameter "{0}" conflicts with "{1}"',
      modelConflicts: 'The bound field values "{0}" and "{1}" conflict, an error will occur.',
      notSupportProp: '"{1}" is not supported when the parameter "{0}" is enabled, it should be "{2}", otherwise an error will occur',
      notConflictProp: 'When using "{0}", "{1}" should be set, otherwise there may be functional conflicts',
      unableInsert: 'Cannot be inserted into the specified location, please check whether the parameters are correct',
      useErr: 'An error occurred while installing the "{0}" module. The order may be incorrect. The dependent module needs to be installed before Table',
      barUnableLink: 'The toolbar cannot associate tables',
      expandContent: 'The slot for the expanded line should be "content", please check if it is correct',
      reqComp: 'The "{0}" component is missing, please check if it is installed correctly. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Missing "{0}" module',
      reqProp: 'The necessary "{0}" parameter is missing, which may cause an error',
      emptyProp: 'Parameter "{0}" is not allowed to be empty',
      errProp: 'Unsupported parameter "{0}", possibly "{1}"',
      colRepet: 'column.{0}="{1}" is repeated, which may cause some functions to become unusable',
      notFunc: 'Method "{0}" does not exist',
      errFunc: 'Parameter "{0}" is not a method',
      notValidators: 'Global verification "{0}" does not exist',
      notFormats: 'Global formatting "{0}" does not exist',
      notCommands: 'The global directive "{0}" does not exist',
      notSlot: 'Slot "{0}" does not exist',
      noTree: '"{0}" is not supported in the tree structure',
      noGroup: '"{0}" is not supported in the aggregation grouping',
      notProp: 'Unsupported parameter "{0}"',
      checkProp: 'When the data volume is too large, the check box may be stuttered. It is recommended to set the parameter "{0}" to improve rendering speed',
      coverProp: 'The parameter "{1}" of "{0}" is repeatedly defined, which may cause an error',
      uniField: 'The field name "{0}" is repeatedly defined, which may cause an error',
      repeatKey: 'Repeat the primary key {0}="{1}", which may cause an error',
      delFunc: 'Method "{0}" is deprecated, please use "{1}"',
      delProp: 'Parameter "{0}" is deprecated, please use "{1}"',
      delEvent: 'Event "{0}" is deprecated, please use "{1}"',
      removeProp: 'Parameter "{0}" is deprecated and is not recommended, which may cause an error',
      errFormat: 'Global formatted content should be defined using "VXETable.formats" and the method of mounting "formatter={0}" is no longer recommended.',
      notType: 'Unsupported file type "{0}"',
      notExp: 'This browser does not support import/export function',
      impFields: 'The import failed. Please check whether the field name and data format are correct.',
      treeNotImp: 'Tree tables do not support import',
      treeCrossDrag: 'Only drag the first level',
      treeDragChild: 'Parents cannot drag to their own children',
      reqPlugin: '"{1}" is not installed at https://vxeui.com/other{0}/#/{1}/install',
      errMaxRow: 'Exceeding the maximum supported data volume {0} rows, this may cause an error',
      useNew: 'It is not recommended to use {0}. Please use {1} instead.'
    },
    table: {
      emptyText: 'No data yet',
      allTitle: 'Select all/cancel',
      seqTitle: 'Number',
      actionTitle: 'operate',
      confirmFilter: 'filter',
      resetFilter: 'Reset',
      allFilter: 'all',
      sortAsc: 'Ascending order: lowest to highest',
      sortDesc: 'Descending order: highest to lowest',
      filter: 'Enable filtering for selected columns',
      impSuccess: 'Successfully imported {0} records',
      expLoading: 'Exporting',
      expSuccess: 'Export successfully',
      expError: 'Export failed',
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_source_{0}',
      customTitle: 'Column settings',
      customAll: 'all',
      customConfirm: 'confirm',
      customClose: 'closure',
      customCancel: 'Cancel',
      customRestore: 'Restore default',
      maxFixedCol: 'The maximum number of frozen columns cannot exceed {0}',
      maxGroupCol: 'The maximum number of grouping fields cannot exceed {0}',
      dragTip: 'Move: {0}',
      resizeColTip: 'Width: {0} pixels',
      resizeRowTip: 'Height: {0} pixels',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Please select at least one record!',
      deleteSelectRecord: 'Are you sure you want to delete the selected record?',
      removeSelectRecord: 'Are you sure you want to remove the selected record?',
      dataUnchanged: 'Data not changed!',
      delSuccess: 'The selected record was successfully deleted!',
      saveSuccess: 'Save successfully!',
      operError: 'An error occurred and the operation failed!'
    },
    select: {
      clear: 'Clear',
      allChecked: 'All',
      total: '{0} / {1}',
      search: 'Search',
      loadingText: 'Loading',
      emptyText: 'No data yet',
      maxOpt: 'The maximum number that can be selected cannot exceed {0}.',
      overSizeErr: 'The maximum selectable quantity of {0} has been exceeded. The excess part will be ignored!',
      searchEmpty: 'No matching data found!'
    },
    tree: {
      searchEmpty: '未匹配到数据！'
    },
    treeSelect: {
      clearChecked: 'Clear',
      allChecked: 'Check all',
      allExpand: 'Expand all',
      clearExpand: 'Collapse all',
      total: 'Selected {0}',
      search: 'Search',
      emptyText: 'No data yet'
    },
    pager: {
      goto: 'Go',
      gotoTitle: 'Number of pages',
      pagesize: '{0} items/page',
      total: 'Total {0} records',
      pageClassifier: 'Page',
      homePage: 'front page',
      homePageTitle: 'front page',
      prevPage: 'Previous page',
      prevPageTitle: 'Previous page',
      nextPage: 'Next page',
      nextPageTitle: 'Next page',
      prevJump: 'Jump up page',
      prevJumpTitle: 'Jump up page',
      nextJump: 'Jump down page',
      nextJumpTitle: 'Jump down page',
      endPage: 'Last page',
      endPageTitle: 'Last page'
    },
    alert: {
      title: 'System prompts'
    },
    button: {
      confirm: 'confirm',
      cancel: 'Cancel',
      clear: 'Clear'
    },
    filter: {
      search: 'search'
    },
    custom: {
      cstmTitle: 'Column settings',
      cstmRestore: 'Restore default',
      cstmCancel: 'Cancel',
      cstmConfirm: 'Sure',
      cstmConfirmRestore: 'Please confirm whether it is restored to the default column configuration?',
      cstmDragTarget: 'Move: {0}',
      setting: {
        colSort: 'Sort',
        sortHelpTip: 'Click and drag the icons to adjust the order.',
        colTitle: 'Column title',
        colResizable: 'Column width (pixels)',
        colVisible: 'Whether to display',
        colFixed: 'Freeze column',
        colFixedMax: 'Freeze columns (up to {0} columns)',
        fixedLeft: 'Left side',
        fixedUnset: 'Not set',
        fixedRight: 'Right side'
      }
    },
    import: {
      modes: {
        covering: 'Overwrite method (directly overwrite table data)',
        insert: 'Append at the bottom (append new data at the bottom of the table)',
        insertTop: 'Append at the top (append new data at the top of the table)',
        insertBottom: 'Append at the bottom (append new data at the bottom of the table)'
      },
      impTitle: 'Import data',
      impFile: 'file name',
      impSelect: 'Select file',
      impType: 'File type',
      impOpts: 'Parameter settings',
      impMode: 'Import mode',
      impConfirm: 'Import',
      impCancel: 'Cancel'
    },
    export: {
      types: {
        csv: 'CSV (comma separated)(*.csv)',
        html: 'Web page (*.html)',
        xml: 'XML data (*.xml)',
        txt: 'Text file (tab separated)(*.txt)',
        xls: 'Excel 97-2003 Workbook (*.xls)',
        xlsx: 'Excel workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Empty data',
        current: 'Current data (data on the current page)',
        selected: 'Selected data (data selected on the current page)',
        all: 'Full data (including all paged data)'
      },
      printTitle: 'Print data',
      expTitle: 'Export data',
      expName: 'file name',
      expNamePlaceholder: 'Please enter a file name',
      expSheetName: 'title',
      expSheetNamePlaceholder: 'Please enter a title',
      expType: 'Save type',
      expMode: 'Select data',
      expCurrentColumn: 'All fields',
      expColumn: 'Select field',
      expOpts: 'Parameter settings',
      expOptHeader: 'Header',
      expHeaderTitle: 'Is the table header required',
      expOptFooter: 'End of table',
      expFooterTitle: 'Is the end of the table required?',
      expOptColgroup: 'Grouping header',
      expOptTitle: 'Column title',
      expTitleTitle: "Whether it is the column title, otherwise it will be displayed as the column's field name",
      expColgroupTitle: 'If present, a header with a grouping structure is supported',
      expOptMerge: 'merge',
      expMergeTitle: 'If present, cells with merged structures are supported',
      expOptAllExpand: 'Expand the tree',
      expAllExpandTitle: 'If it exists, it is supported to expand all data with hierarchical structures',
      expOptUseStyle: 'style',
      expUseStyleTitle: 'If present, cells with style are supported',
      expOptOriginal: 'Source data',
      expOriginalTitle: 'If it is source data, import into tables is supported',
      expPrint: 'Print',
      expConfirm: 'Export',
      expCancel: 'Cancel'
    },
    modal: {
      errTitle: 'Error message',
      zoomMin: 'Minimize',
      zoomIn: 'maximize',
      zoomOut: 'reduction',
      close: 'closure',
      miniMaxSize: 'The number of minimized windows cannot exceed {0}',
      footPropErr: 'show-footer is only used to enable the table tail, and must be used with show-confirm-button | show-cancel-button | slots'
    },
    drawer: {
      close: 'closure'
    },
    form: {
      folding: 'Close',
      unfolding: 'Expand'
    },
    toolbar: {
      import: 'Import',
      export: 'Export',
      print: 'Print',
      refresh: 'refresh',
      zoomIn: 'full screen',
      zoomOut: 'reduction',
      custom: 'Column settings',
      customAll: 'all',
      customConfirm: 'confirm',
      customRestore: 'Reset',
      fixedLeft: 'Freeze left',
      fixedRight: 'Freeze right',
      cancelFixed: 'Unfreeze'
    },
    datePicker: {
      yearTitle: '{0} years'
    },
    dateRangePicker: {
      pleaseRange: 'Please select the date time and the end date'
    },
    input: {
      date: {
        m1: 'January',
        m2: 'February',
        m3: 'March',
        m4: 'April',
        m5: 'May',
        m6: 'June',
        m7: 'July',
        m8: 'August',
        m9: 'September',
        m10: 'October',
        m11: 'November',
        m12: 'December',
        quarterLabel: '{0} years',
        monthLabel: '{0} years',
        dayLabel: '{0} year {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Week WW of year yyyy',
          month: 'yyyy-MM',
          quarter: 'quarter q of year yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Sun',
          w1: 'Mon',
          w2: 'Tue',
          w3: 'Wed',
          w4: 'Thu',
          w5: 'Fri',
          w6: 'Sat'
        },
        months: {
          m0: 'January',
          m1: 'February',
          m2: 'March',
          m3: 'April',
          m4: 'May',
          m5: 'June',
          m6: 'July',
          m7: 'August',
          m8: 'September',
          m9: 'October',
          m10: 'November',
          m11: 'December'
        },
        quarters: {
          q1: 'First quarter',
          q2: 'Second quarter',
          q3: 'Third quarter',
          q4: 'Fourth quarter'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Preview',
      operBtn: {
        zoomOut: 'Shrink',
        zoomIn: 'enlarge',
        pctFull: 'Scaling equally',
        pct11: 'Show original size',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate to the right',
        print: 'Click to print the picture',
        download: 'Click to download the picture'
      }
    },
    upload: {
      fileBtnText: 'Click or drag to upload',
      imgBtnText: 'Click or drag to upload',
      dragPlaceholder: 'Please drag and drop the file to this area to upload',
      imgSizeHint: 'Leaflet {0}',
      imgCountHint: 'Maximum {0} pictures',
      fileTypeHint: 'Support {0} file types',
      fileSizeHint: 'A single file size does not exceed {0}',
      fileCountHint: 'Up to {0} files can be uploaded',
      uploadTypeErr: 'File type mismatch!',
      overCountErr: 'Only {0} files can be selected at most!',
      overCountExtraErr: 'The maximum number of {0} has been exceeded, and the excess {1} files will be ignored!',
      overSizeErr: 'The maximum file size cannot exceed {0}!',
      manualUpload: '点击上传',
      reUpload: 'Re-upload',
      uploadProgress: 'Uploading {0}%',
      uploadErr: 'Upload failed',
      uploadSuccess: 'Upload successfully',
      moreBtnText: 'More ({0})',
      viewItemTitle: 'Click to view',
      morePopup: {
        readTitle: 'View list',
        imageTitle: 'Upload pictures',
        fileTitle: 'Upload file'
      }
    },
    empty: {
      defText: 'No data yet'
    },
    colorPicker: {
      clear: 'Clear',
      confirm: 'confirm',
      copySuccess: 'Copyed to clipboard: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Form name',
      defFormTitle: 'Unnamed form',
      widgetPropTab: 'Control Properties',
      widgetFormTab: 'Form Properties',
      error: {
        wdFormUni: 'This type of control is allowed to add only one in the form',
        wdSubUni: 'This type of control is allowed to add only one in the subtable'
      },
      styleSetting: {
        btn: 'Style settings',
        title: 'Form style settings',
        layoutTitle: 'Control layout',
        verticalLayout: 'Top and bottom layout',
        horizontalLayout: 'Horizontal layout',
        styleTitle: 'Title style',
        boldTitle: 'Title bold',
        fontBold: 'Bold',
        fontNormal: 'conventional',
        colonTitle: 'Show colon',
        colonVisible: 'show',
        colonHidden: 'hide',
        alignTitle: 'Alignment',
        widthTitle: 'Title Width',
        alignLeft: 'On the left',
        alignRight: 'On the right',
        unitPx: 'Pixels',
        unitPct: 'percentage'
      },
      widget: {
        group: {
          base: 'Basic controls',
          layout: 'Layout Controls',
          system: 'System Controls',
          module: 'Module controls',
          chart: 'Chart control',
          advanced: 'Advanced Controls'
        },
        copyTitle: 'Copy_{0}',
        component: {
          input: 'Input box',
          textarea: 'Text field',
          select: 'Pull down to select',
          row: 'One row and multiple columns',
          title: 'title',
          text: 'text',
          subtable: 'Sub-table',
          VxeSwitch: 'whether',
          VxeInput: 'Input box',
          VxeNumberInput: 'number',
          VxeDatePicker: 'date',
          VxeTextarea: 'Text field',
          VxeSelect: 'Pull down to select',
          VxeTreeSelect: 'Tree selection',
          VxeRadioGroup: 'Radio button',
          VxeCheckboxGroup: 'Checkbox',
          VxeUploadFile: 'document',
          VxeUploadImage: 'picture',
          VxeRate: 'score',
          VxeSlider: 'slider'
        }
      },
      widgetProp: {
        name: 'Control name',
        placeholder: 'Prompt',
        required: 'Required verification',
        multiple: 'Multiple choices are allowed',
        displaySetting: {
          name: 'Display settings',
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'show',
          hidden: 'hide'
        },
        dataSource: {
          name: 'Data Source',
          defValue: 'Option {0}',
          addOption: 'Add options',
          batchEditOption: 'Batch editing',
          batchEditTip: 'Each row corresponds to an option, which supports direct copy and paste from tables, Excel, and WPS.',
          batchEditSubTip: 'Each row corresponds to an option. If it is a group, the child items can start with a space or a tab key, and it supports direct copy and paste from tables, Excel, and WPS.',
          buildOption: 'Build options'
        },
        rowProp: {
          colSize: 'Number of columns',
          col2: 'Two columns',
          col3: 'Three columns',
          col4: 'Four columns',
          col6: 'Six columns',
          layout: 'layout'
        },
        textProp: {
          name: 'content',
          alignTitle: 'Alignment',
          alignLeft: 'On the left',
          alignCenter: 'Center',
          alignRight: 'On the right',
          colorTitle: 'Font color',
          sizeTitle: 'Font size',
          boldTitle: 'Bold font',
          fontNormal: 'conventional',
          fontBold: 'Bold'
        },
        subtableProp: {
          seqTitle: 'Number',
          showSeq: 'Show serial number',
          showCheckbox: 'Multiple choices are allowed',
          errSubDrag: 'The subtable does not support this control, please use other controls',
          colPlace: 'Drag the control in'
        },
        uploadProp: {
          limitFileCount: 'File quantity limit',
          limitFileSize: 'File size limit',
          multiFile: 'Allow multiple files to be uploaded',
          limitImgCount: 'Limit number of pictures',
          limitImgSize: 'Image size limit',
          multiImg: 'Allow multiple pictures to upload'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Field settings',
      listSettingTab: 'Parameter settings',
      searchTitle: 'Query criteria',
      listTitle: 'List field',
      searchField: 'Query fields',
      listField: 'List field',
      activeBtn: {
        ActionButtonUpdate: 'edit',
        ActionButtonDelete: 'delete'
      },
      search: {
        addBtn: 'edit',
        emptyText: 'Query conditions not configured',
        editPopupTitle: 'Edit query fields'
      },
      searchPopup: {
        colTitle: 'title',
        saveBtn: 'save'
      }
    },
    text: {
      copySuccess: 'Copyed to clipboard',
      copyError: 'The current environment does not support this operation'
    },
    countdown: {
      formats: {
        yyyy: 'Year',
        MM: 'moon',
        dd: 'sky',
        HH: 'hour',
        mm: 'point',
        ss: 'Second'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'This operation cannot be performed on merged cells',
          multiErr: 'This operation cannot be performed on multiple selection areas',
          selectErr: 'Unable to operate on cells in the specified range',
          extendErr: 'If the extended range contains merged cells, all merged cells must be the same size',
          pasteMultiErr: 'Unable to paste, the copied and pasted areas need to be of the same size to perform this operation',
          cpInvalidErr: 'The operation cannot be performed. There are prohibited columns ({0}) in the range you selected.'
        },
        fnr: {
          title: 'Find and replace',
          findLabel: 'Find',
          replaceLabel: 'replace',
          findTitle: 'Find what:',
          replaceTitle: 'Replace with:',
          tabs: {
            find: 'Find',
            replace: 'replace'
          },
          filter: {
            re: 'Regular expressions',
            whole: 'Full word matching',
            sensitive: 'case sensitive'
          },
          btns: {
            findNext: 'Find next',
            findAll: 'Find all',
            replace: 'replace',
            replaceAll: 'Replace all',
            cancel: 'Cancel'
          },
          header: {
            seq: '#',
            cell: 'Cell',
            value: 'value'
          },
          body: {
            row: 'Row: {0}',
            col: 'Column: {0}'
          },
          empty: '(Null value)',
          reError: 'Invalid regular expression',
          recordCount: '{0} cells found',
          notCell: 'The matching cell cannot be found',
          replaceSuccess: 'Successfully replaced {0} cells'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Group',
          values: 'Values',
          groupPlaceholder: 'Drag here to set row groups',
          valuesPlaceholder: 'Drag here to aggregate',
          dragExistCol: 'The column already exists',
          sortHelpTip: 'Click and drag the icons to adjust the order.'
        },
        aggFuncs: {
          sum: 'Sum',
          count: 'Count',
          avg: 'Avg',
          min: 'Min',
          max: 'Max',
          first: 'First',
          last: 'Last'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Freeze left',
          fixedRight: 'Freeze right'
        },
        cases: {
          equal: 'equal',
          gt: 'Greater than',
          lt: 'Less than',
          begin: 'The beginning is',
          endin: 'The end is',
          include: 'Include',
          isSensitive: 'case sensitive'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sort',
          clearSort: 'Clear sort',
          sortAsc: 'Ascending order',
          sortDesc: 'descending order',
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Freeze left',
          fixedRight: 'Freeze right',
          clearFilter: 'Clear Filter',
          textOption: 'Text filter',
          numberOption: 'Numerical filter'
        },
        popup: {
          title: 'Custom filtering methods',
          currColumnTitle: 'Current column:',
          and: 'and',
          or: 'or',
          describeHtml: 'Available? Represents a single character<br/>Use * Represents any multiple characters'
        },
        cases: {
          equal: 'equal',
          unequal: 'Not equal to',
          gt: 'Greater than',
          ge: 'Greater than or equal to',
          lt: 'Less than',
          le: 'Less than or equal to',
          begin: 'The beginning is',
          notbegin: "It's not at the beginning",
          endin: 'The end is',
          notendin: 'The ending is not',
          include: 'Include',
          exclude: 'Not included',
          between: 'Between',
          custom: 'Custom filter',
          insensitive: 'Case insensitive',
          isSensitive: 'case sensitive'
        },
        empty: '(blank)',
        notData: 'No match'
      }
    },
    pro: {
      area: {
        mergeErr: 'This operation cannot be performed on merged cells',
        multiErr: 'This operation cannot be performed on multiple selection areas',
        extendErr: 'If the extended range contains merged cells, all merged cells must be the same size',
        pasteMultiErr: 'Unable to paste, the copied and pasted areas need to be of the same size to perform this operation'
      },
      fnr: {
        title: 'Find and replace',
        findLabel: 'Find',
        replaceLabel: 'replace',
        findTitle: 'Find content:',
        replaceTitle: 'Replace with:',
        tabs: {
          find: 'Find',
          replace: 'replace'
        },
        filter: {
          re: 'Regular expressions',
          whole: 'Full word matching',
          sensitive: 'case sensitive'
        },
        btns: {
          findNext: 'Find next',
          findAll: 'Find all',
          replace: 'replace',
          replaceAll: 'Replace all',
          cancel: 'Cancel'
        },
        header: {
          seq: '#',
          cell: 'Cell',
          value: 'value'
        },
        empty: '(Null value)',
        reError: 'Invalid regular expression',
        recordCount: '{0} cells found',
        notCell: 'No matching cell found',
        replaceSuccess: 'Successfully replaced {0} cells'
      }
    },
    renderer: {
      search: 'search',
      cases: {
        equal: 'equal',
        unequal: 'Not equal to',
        gt: 'Greater than',
        ge: 'Greater than or equal to',
        lt: 'Less than',
        le: 'Less than or equal to',
        begin: 'The beginning is',
        notbegin: "It's not at the beginning",
        endin: 'The end is',
        notendin: 'The ending is not',
        include: 'Include',
        exclude: 'Not included',
        between: 'Between',
        custom: 'Custom filter',
        insensitive: 'Case insensitive',
        isSensitive: 'case sensitive'
      },
      combination: {
        menus: {
          sort: 'Sort',
          clearSort: 'Clear sort',
          sortAsc: 'Ascending order',
          sortDesc: 'descending order',
          fixedColumn: 'Freeze column',
          fixedGroup: 'Freeze group',
          cancelFixed: 'Unfreeze',
          fixedLeft: 'Freeze left',
          fixedRight: 'Freeze right',
          clearFilter: 'Clear Filter',
          textOption: 'Text filtering',
          numberOption: 'Numerical filtering'
        },
        popup: {
          title: 'Custom filtering methods',
          currColumnTitle: 'Current column:',
          and: 'and',
          or: 'or',
          describeHtml: 'Available? Represents a single character<br/>Use * Represents any multiple characters'
        },
        empty: '(blank)',
        notData: 'No match'
      }
    }
  }
}
